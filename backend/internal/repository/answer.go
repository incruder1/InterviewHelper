package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/devjohri/interviewhelper/backend/internal/models"
	"gorm.io/gorm"
)

type AnswerRepository interface {
	FindOne(ctx context.Context, mockIDRef, questionText string) (*models.UserAnswer, error)
	Upsert(ctx context.Context, answer *models.UserAnswer) error
	FindByMockID(ctx context.Context, mockID string) ([]models.UserAnswer, error)
}

type answerRepo struct {
	db *gorm.DB
}

func NewAnswerRepository(db *gorm.DB) AnswerRepository {
	return &answerRepo{db: db}
}

func (r *answerRepo) FindOne(ctx context.Context, mockIDRef, questionText string) (*models.UserAnswer, error) {
	var answer models.UserAnswer
	result := r.db.WithContext(ctx).
		Where(`"mockId" = ? AND question = ?`, mockIDRef, questionText).
		First(&answer)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("answerRepo.FindOne: %w", result.Error)
	}
	return &answer, nil
}

// Upsert mirrors the frontend logic: check for an existing row and UPDATE it,
// otherwise INSERT. This works against the existing schema with no migration.
func (r *answerRepo) Upsert(ctx context.Context, answer *models.UserAnswer) error {
	existing, err := r.FindOne(ctx, answer.MockIDRef, answer.QuestionText)
	if err != nil && !errors.Is(err, ErrNotFound) {
		return fmt.Errorf("answerRepo.Upsert lookup: %w", err)
	}

	if existing != nil {
		// Row exists — update mutable fields only.
		updateErr := r.db.WithContext(ctx).
			Model(existing).
			Updates(map[string]interface{}{
				"userAns":  answer.UserAns,
				"feedback": answer.Feedback,
				"rating":   answer.Rating,
			}).Error
		if updateErr != nil {
			return fmt.Errorf("answerRepo.Upsert update: %w", updateErr)
		}
		answer.ID = existing.ID
		return nil
	}

	// Row does not exist — insert.
	if createErr := r.db.WithContext(ctx).Create(answer).Error; createErr != nil {
		return fmt.Errorf("answerRepo.Upsert insert: %w", createErr)
	}
	return nil
}

func (r *answerRepo) FindByMockID(ctx context.Context, mockID string) ([]models.UserAnswer, error) {
	var answers []models.UserAnswer
	result := r.db.WithContext(ctx).
		Where("\"mockId\" = ?", mockID).
		Order("id ASC").
		Find(&answers)
	if result.Error != nil {
		return nil, fmt.Errorf("answerRepo.FindByMockID: %w", result.Error)
	}
	return answers, nil
}
