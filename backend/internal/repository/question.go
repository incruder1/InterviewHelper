package repository

import (
	"context"
	"fmt"

	"github.com/devjohri/interviewhelper/backend/internal/models"
	"gorm.io/gorm"
)

type QuestionRepository interface {
	Create(ctx context.Context, question *models.Question) error
	FindByUser(ctx context.Context, email string) ([]models.Question, error)
}

type questionRepo struct {
	db *gorm.DB
}

func NewQuestionRepository(db *gorm.DB) QuestionRepository {
	return &questionRepo{db: db}
}

func (r *questionRepo) Create(ctx context.Context, question *models.Question) error {
	result := r.db.WithContext(ctx).Create(question)
	if result.Error != nil {
		return fmt.Errorf("questionRepo.Create: %w", result.Error)
	}
	return nil
}

func (r *questionRepo) FindByUser(ctx context.Context, email string) ([]models.Question, error) {
	var questions []models.Question
	result := r.db.WithContext(ctx).
		Where("\"createdBy\" = ?", email).
		Order("id DESC").
		Find(&questions)
	if result.Error != nil {
		return nil, fmt.Errorf("questionRepo.FindByUser: %w", result.Error)
	}
	return questions, nil
}
