package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/devjohri/interviewhelper/backend/internal/config"
	"github.com/devjohri/interviewhelper/backend/internal/database"
	"github.com/devjohri/interviewhelper/backend/internal/handler"
	"github.com/devjohri/interviewhelper/backend/internal/repository"
	"github.com/devjohri/interviewhelper/backend/internal/service"
	"github.com/devjohri/interviewhelper/backend/router"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	// Initialise Clerk with the backend secret key.
	clerk.SetKey(cfg.ClerkSecretKey)

	// Connect to the database.
	debug := cfg.AppEnv != "production"
	db, err := database.New(cfg.DatabaseURL, debug)
	if err != nil {
		log.Fatalf("database error: %v", err)
	}

	// Wire up Groq client.
	groqSvc := service.NewGroqService(cfg.GroqAPIKey)

	// Repositories.
	interviewRepo := repository.NewInterviewRepository(db)
	questionRepo := repository.NewQuestionRepository(db)
	answerRepo := repository.NewAnswerRepository(db)
	newsletterRepo := repository.NewNewsletterRepository(db)

	// Services.
	interviewSvc := service.NewInterviewService(interviewRepo, groqSvc)
	questionSvc := service.NewQuestionService(questionRepo, groqSvc)
	answerSvc := service.NewAnswerService(answerRepo, interviewRepo, groqSvc)
	newsletterSvc := service.NewNewsletterService(newsletterRepo)

	// Handlers.
	handlers := router.Handlers{
		Interview:  handler.NewInterviewHandler(interviewSvc),
		Question:  handler.NewQuestionHandler(questionSvc),
		Answer:    handler.NewAnswerHandler(answerSvc),
		Newsletter: handler.NewNewsletterHandler(newsletterSvc),
	}

	ginMode := gin.ReleaseMode
	if debug {
		ginMode = gin.DebugMode
	}

	r := router.New(handlers, cfg.CORSOrigins, ginMode)

	port := os.Getenv("PORT")
if port == "" {
	port = cfg.Port
}

srv := &http.Server{
	Addr:         ":" + port,
	Handler:      r,
	ReadTimeout:  30 * time.Second,
	WriteTimeout: 60 * time.Second,
	IdleTimeout:  90 * time.Second,
}

	// Start server in a goroutine.
	go func() {
		log.Printf("server listening on :%s (env=%s)", cfg.Port, cfg.AppEnv)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	// Graceful shutdown on SIGINT / SIGTERM.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("shutdown signal received")

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("forced shutdown: %v", err)
	}

	sqlDB, _ := db.DB()
	_ = sqlDB.Close()

	log.Println("server exited cleanly")
}
