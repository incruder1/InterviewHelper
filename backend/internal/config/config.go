package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL    string
	ClerkSecretKey string
	GeminiAPIKey   string
	Port           string
	CORSOrigins    []string
	AppEnv         string
}

func Load() (*Config, error) {
	// In development, load from .env file; in production the env vars are injected directly.
	_ = godotenv.Load()

	cfg := &Config{
		DatabaseURL:    os.Getenv("DATABASE_URL"),
		ClerkSecretKey: os.Getenv("CLERK_SECRET_KEY"),
		GeminiAPIKey:   os.Getenv("GEMINI_API_KEY"),
		Port:           os.Getenv("PORT"),
		AppEnv:         os.Getenv("APP_ENV"),
	}

	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}
	if cfg.ClerkSecretKey == "" {
		return nil, fmt.Errorf("CLERK_SECRET_KEY is required")
	}
	if cfg.GeminiAPIKey == "" {
		return nil, fmt.Errorf("GEMINI_API_KEY is required")
	}

	if cfg.Port == "" {
		cfg.Port = "8080"
	}
	if cfg.AppEnv == "" {
		cfg.AppEnv = "development"
	}

	rawOrigins := os.Getenv("CORS_ORIGINS")
	if rawOrigins == "" {
		cfg.CORSOrigins = []string{"http://localhost:3000"}
	} else {
		for _, o := range strings.Split(rawOrigins, ",") {
			trimmed := strings.TrimSpace(o)
			if trimmed != "" {
				cfg.CORSOrigins = append(cfg.CORSOrigins, trimmed)
			}
		}
	}

	return cfg, nil
}
