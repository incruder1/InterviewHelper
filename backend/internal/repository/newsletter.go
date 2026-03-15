package repository

import (
	"context"
	"fmt"

	"github.com/devjohri/interviewhelper/backend/internal/models"
	"gorm.io/gorm"
)

type NewsletterRepository interface {
	Create(ctx context.Context, n *models.Newsletter) error
}

type newsletterRepo struct {
	db *gorm.DB
}

func NewNewsletterRepository(db *gorm.DB) NewsletterRepository {
	return &newsletterRepo{db: db}
}

func (r *newsletterRepo) Create(ctx context.Context, n *models.Newsletter) error {
	if err := r.db.WithContext(ctx).Create(n).Error; err != nil {
		return fmt.Errorf("newsletterRepo.Create: %w", err)
	}
	return nil
}
