package service

import (
	"context"
	"fmt"
	"time"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/models"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
)

type NewsletterService interface {
	Submit(ctx context.Context, req dto.NewsletterRequest) error
}

type newsletterService struct {
	repo repository.NewsletterRepository
}

func NewNewsletterService(repo repository.NewsletterRepository) NewsletterService {
	return &newsletterService{repo: repo}
}

func (s *newsletterService) Submit(ctx context.Context, req dto.NewsletterRequest) error {
	n := &models.Newsletter{
		NewName:    req.NewName,
		NewEmail:   req.NewEmail,
		NewMessage: req.NewMessage,
		CreatedAt:  time.Now().Format("2006-01-02"),
	}
	if err := s.repo.Create(ctx, n); err != nil {
		return fmt.Errorf("newsletterService.Submit: %w", err)
	}
	return nil
}
