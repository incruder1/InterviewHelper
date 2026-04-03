package service

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/devjohri/interviewhelper/backend/internal/dto"
	"github.com/devjohri/interviewhelper/backend/internal/models"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
)

type AnswerService interface {
	UpsertAnswer(ctx context.Context, email, mockID string, req dto.UpsertAnswerRequest) (*models.UserAnswer, error)
	ListAnswers(ctx context.Context, email, mockID string) ([]models.UserAnswer, error)
}

type answerService struct {
	repo          repository.AnswerRepository
	interviewRepo repository.InterviewRepository
	groq          *GroqService
}

func NewAnswerService(
	repo repository.AnswerRepository,
	interviewRepo repository.InterviewRepository,
	groq *GroqService,
) AnswerService {
	return &answerService{repo: repo, interviewRepo: interviewRepo, groq: groq}
}

func (s *answerService) UpsertAnswer(
	ctx context.Context,
	email, mockID string,
	req dto.UpsertAnswerRequest,
) (*models.UserAnswer, error) {
	// Verify the interview belongs to this user.
	interview, err := s.interviewRepo.FindByMockID(ctx, mockID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, repository.ErrNotFound
		}
		return nil, fmt.Errorf("answerService.UpsertAnswer: %w", err)
	}
	if interview.CreatedBy != email {
		return nil, repository.ErrNotFound
	}

	userAns := strings.TrimSpace(req.UserAns)

	// If audio is provided, transcribe it first (overrides any userAns in the request).
	if req.AudioBase64 != "" {
		transcript, err := s.groq.TranscribeAudio(ctx, req.AudioBase64, req.AudioMimeType)
		if err != nil {
			return nil, fmt.Errorf("answerService.UpsertAnswer: transcription failed: %w", err)
		}
		userAns = strings.TrimSpace(transcript)
	}

	if userAns == "" {
		return nil, fmt.Errorf("answerService.UpsertAnswer: user answer is empty after transcription")
	}

	// Generate AI feedback.
	feedback, err := s.groq.EvaluateAnswer(ctx, req.Question, userAns)
	if err != nil {
		return nil, fmt.Errorf("answerService.UpsertAnswer: feedback generation failed: %w", err)
	}

	answer := &models.UserAnswer{
		MockIDRef:    mockID,
		QuestionText: req.Question,
		CorrectAns:   req.CorrectAns,
		UserAns:      userAns,
		Feedback:     feedback.Feedback,
		Rating:       feedback.Rating,
		UserEmail:    email,
		CreatedAt:    time.Now().Format("2006-01-02"),
	}

	if err := s.repo.Upsert(ctx, answer); err != nil {
		return nil, fmt.Errorf("answerService.UpsertAnswer: %w", err)
	}

	// Reload the row so the returned struct reflects the actual DB state (e.g. after an UPDATE).
	saved, err := s.repo.FindOne(ctx, mockID, req.Question)
	if err != nil {
		return answer, nil // best-effort: return in-memory copy if reload fails
	}
	return saved, nil
}

func (s *answerService) ListAnswers(ctx context.Context, email, mockID string) ([]models.UserAnswer, error) {
	// Ownership check: only the interview creator may view its answers.
	interview, err := s.interviewRepo.FindByMockID(ctx, mockID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, repository.ErrNotFound
		}
		return nil, fmt.Errorf("answerService.ListAnswers: %w", err)
	}
	if interview.CreatedBy != email {
		return nil, repository.ErrNotFound
	}

	answers, err := s.repo.FindByMockID(ctx, mockID)
	if err != nil {
		return nil, fmt.Errorf("answerService.ListAnswers: %w", err)
	}
	return answers, nil
}
