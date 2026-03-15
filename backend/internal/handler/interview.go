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

type InterviewHandler struct {
	svc service.InterviewService
}

func NewInterviewHandler(svc service.InterviewService) *InterviewHandler {
	return &InterviewHandler{svc: svc}
}

// POST /interviews
func (h *InterviewHandler) Create(c *gin.Context) {
	var req dto.CreateInterviewRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	email := middleware.GetUserEmail(c)

	interview, err := h.svc.CreateInterview(c.Request.Context(), email, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to create interview"})
		return
	}

	c.JSON(http.StatusCreated, interview)
}

// GET /interviews
func (h *InterviewHandler) List(c *gin.Context) {
	email := middleware.GetUserEmail(c)

	interviews, err := h.svc.ListInterviews(c.Request.Context(), email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to list interviews"})
		return
	}

	c.JSON(http.StatusOK, interviews)
}

// GET /interviews/:mockId
func (h *InterviewHandler) Get(c *gin.Context) {
	mockID := c.Param("mockId")
	email := middleware.GetUserEmail(c)

	interview, err := h.svc.GetInterview(c.Request.Context(), email, mockID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, dto.ErrorResponse{Error: "interview not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to get interview"})
		return
	}

	c.JSON(http.StatusOK, interview)
}
