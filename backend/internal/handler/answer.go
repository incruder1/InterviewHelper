package handler

import (
	"errors"
	"net/http"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/middleware"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
	"github.com/devjohri/interviewhelper/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type AnswerHandler struct {
	svc service.AnswerService
}

func NewAnswerHandler(svc service.AnswerService) *AnswerHandler {
	return &AnswerHandler{svc: svc}
}

// POST /interviews/:mockId/answers
func (h *AnswerHandler) Upsert(c *gin.Context) {
	mockID := c.Param("mockId")
	email := middleware.GetUserEmail(c)

	var req dto.UpsertAnswerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	if req.UserAns == "" && req.AudioBase64 == "" {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: "either userAns or audioBase64 is required"})
		return
	}

	answer, err := h.svc.UpsertAnswer(c.Request.Context(), email, mockID, req)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, dto.ErrorResponse{Error: "interview not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to save answer"})
		return
	}

	c.JSON(http.StatusOK, answer)
}

// GET /interviews/:mockId/answers
func (h *AnswerHandler) List(c *gin.Context) {
	mockID := c.Param("mockId")
	email := middleware.GetUserEmail(c)

	answers, err := h.svc.ListAnswers(c.Request.Context(), email, mockID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, dto.ErrorResponse{Error: "interview not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to list answers"})
		return
	}

	c.JSON(http.StatusOK, answers)
}
