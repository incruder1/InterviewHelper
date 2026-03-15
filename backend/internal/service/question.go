package service

import (
	"context"
	"fmt"
	"time"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/models"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
	"github.com/google/uuid"
)

type QuestionService interface {
	CreateQuestion(ctx context.Context, email string, req dto.CreateQuestionRequest) (*models.Question, error)
	ListQuestions(ctx context.Context, email string) ([]models.Question, error)
}

type questionService struct {
	repo   repository.QuestionRepository
	gemini *GeminiService
}

func NewQuestionService(repo repository.QuestionRepository, gemini *GeminiService) QuestionService {
	return &questionService{repo: repo, gemini: gemini}
}

func (s *questionService) CreateQuestion(
	ctx context.Context,
	email string,
	req dto.CreateQuestionRequest,
) (*models.Question, error) {
	rawJSON, _, err := s.gemini.GenerateQuestionBankQuestions(
		ctx,
		req.JobPosition, req.JobDesc, req.JobExperience,
		req.TypeQuestion, req.Company,
	)
	if err != nil {
		return nil, fmt.Errorf("questionService.CreateQuestion: AI generation failed: %w", err)
	}

	question := &models.Question{
		MockID:               uuid.NewString(),
		MockQuestionJSONResp: rawJSON,
		JobPosition:          req.JobPosition,
		JobDesc:              req.JobDesc,
		JobExperience:        req.JobExperience,
		TypeQuestion:         req.TypeQuestion,
		Company:              req.Company,
		CreatedBy:            email,
		CreatedAt:            time.Now().Format("2006-01-02"),
	}

	if err := s.repo.Create(ctx, question); err != nil {
		return nil, fmt.Errorf("questionService.CreateQuestion: %w", err)
	}
	return question, nil
}

func (s *questionService) ListQuestions(ctx context.Context, email string) ([]models.Question, error) {
	questions, err := s.repo.FindByUser(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("questionService.ListQuestions: %w", err)
	}
	return questions, nil
}
