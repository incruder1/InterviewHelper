package handler

import (
	"net/http"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type NewsletterHandler struct {
	svc service.NewsletterService
}

func NewNewsletterHandler(svc service.NewsletterService) *NewsletterHandler {
	return &NewsletterHandler{svc: svc}
}

// POST /newsletter — public (no auth) contact form
func (h *NewsletterHandler) Submit(c *gin.Context) {
	var req dto.NewsletterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	if err := h.svc.Submit(c.Request.Context(), req); err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "failed to submit message"})
		return
	}

	c.JSON(http.StatusCreated, dto.MessageResponse{Message: "Message sent successfully"})
}
