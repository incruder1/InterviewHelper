package handler

import (
	"net/http"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/middleware"
	"github.com/devjohri/interviewhelper/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type QuestionHandler struct {
	svc service.QuestionService
}

func NewQuestionHandler(svc service.QuestionService) *QuestionHandler {
	return &QuestionHandler{svc: svc}
}

// POST /questions
func (h *QuestionHandler) Create(c *gin.Context) {
	var req dto.CreateQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	email := middleware.GetUserEmail(c)

	question, err := h.svc.CreateQuestion(c.Request.Context(), email, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to create question"})
		return
	}

	c.JSON(http.StatusCreated, question)
}

// GET /questions
func (h *QuestionHandler) List(c *gin.Context) {
	email := middleware.GetUserEmail(c)

	questions, err := h.svc.ListQuestions(c.Request.Context(), email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to list questions"})
		return
	}

	c.JSON(http.StatusOK, questions)
}
