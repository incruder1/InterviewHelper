package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/devjohri/interviewhelper/backend/internal/models"
	"gorm.io/gorm"
)

type InterviewRepository interface {
	Create(ctx context.Context, interview *models.MockInterview) error
	FindByUser(ctx context.Context, email string) ([]models.MockInterview, error)
	FindByMockID(ctx context.Context, mockID string) (*models.MockInterview, error)
	Delete(ctx context.Context, email, mockID string) error
}

type interviewRepo struct {
	db *gorm.DB
}

func NewInterviewRepository(db *gorm.DB) InterviewRepository {
	return &interviewRepo{db: db}
}

func (r *interviewRepo) Create(ctx context.Context, interview *models.MockInterview) error {
	result := r.db.WithContext(ctx).Create(interview)
	if result.Error != nil {
		return fmt.Errorf("interviewRepo.Create: %w", result.Error)
	}
	return nil
}

func (r *interviewRepo) FindByUser(ctx context.Context, email string) ([]models.MockInterview, error) {
	var interviews []models.MockInterview
	result := r.db.WithContext(ctx).
		Where("\"createdBy\" = ?", email).
		Order("id DESC").
		Find(&interviews)
	if result.Error != nil {
		return nil, fmt.Errorf("interviewRepo.FindByUser: %w", result.Error)
	}
	return interviews, nil
}

func (r *interviewRepo) FindByMockID(ctx context.Context, mockID string) (*models.MockInterview, error) {
	var interview models.MockInterview
	result := r.db.WithContext(ctx).
		Where("\"mockId\" = ?", mockID).
		First(&interview)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("interviewRepo.FindByMockID: %w", result.Error)
	}
	return &interview, nil
}

func (r *interviewRepo) Delete(ctx context.Context, email, mockID string) error {
	fmt.Printf("[REPO DELETE] mockId=%q email=%q\n", mockID, email)
	result := r.db.WithContext(ctx).
		Where("\"mockId\" = ? AND \"createdBy\" = ?", mockID, email).
		Delete(&models.MockInterview{})
	fmt.Printf("[REPO DELETE] RowsAffected=%d err=%v\n", result.RowsAffected, result.Error)
	if result.Error != nil {
		return fmt.Errorf("interviewRepo.Delete: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return ErrNotFound
	}
	return nil
}
