package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/models"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
	"github.com/google/uuid"
)

type InterviewService interface {
	CreateInterview(ctx context.Context, email string, req dto.CreateInterviewRequest) (*models.MockInterview, error)
	ListInterviews(ctx context.Context, email string) ([]models.MockInterview, error)
	GetInterview(ctx context.Context, email, mockID string) (*models.MockInterview, error)
}

type interviewService struct {
	repo   repository.InterviewRepository
	gemini *GeminiService
}

func NewInterviewService(repo repository.InterviewRepository, gemini *GeminiService) InterviewService {
	return &interviewService{repo: repo, gemini: gemini}
}

func (s *interviewService) CreateInterview(
	ctx context.Context,
	email string,
	req dto.CreateInterviewRequest,
) (*models.MockInterview, error) {
	rawJSON, _, err := s.gemini.GenerateInterviewQuestions(ctx, req.JobPosition, req.JobDesc, req.JobExperience)
	if err != nil {
		return nil, fmt.Errorf("interviewService.CreateInterview: AI generation failed: %w", err)
	}

	interview := &models.MockInterview{
		MockID:        uuid.NewString(),
		JSONMockResp:  rawJSON,
		JobPosition:   req.JobPosition,
		JobDesc:       req.JobDesc,
		JobExperience: req.JobExperience,
		CreatedBy:     email,
		CreatedAt:     time.Now().Format("2006-01-02"),
	}

	if err := s.repo.Create(ctx, interview); err != nil {
		return nil, fmt.Errorf("interviewService.CreateInterview: %w", err)
	}
	return interview, nil
}

func (s *interviewService) ListInterviews(ctx context.Context, email string) ([]models.MockInterview, error) {
	interviews, err := s.repo.FindByUser(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("interviewService.ListInterviews: %w", err)
	}
	return interviews, nil
}

func (s *interviewService) GetInterview(ctx context.Context, email, mockID string) (*models.MockInterview, error) {
	interview, err := s.repo.FindByMockID(ctx, mockID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, repository.ErrNotFound
		}
		return nil, fmt.Errorf("interviewService.GetInterview: %w", err)
	}
	if interview.CreatedBy != email {
		return nil, repository.ErrNotFound // do not leak existence to other users
	}
	return interview, nil
}
