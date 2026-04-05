package router

import (
	"github.com/devjohri/interviewhelper/backend/internal/handler"
	"github.com/devjohri/interviewhelper/backend/internal/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Handlers struct {
	Interview  *handler.InterviewHandler
	Question   *handler.QuestionHandler
	Answer     *handler.AnswerHandler
	Newsletter *handler.NewsletterHandler
}

func New(h Handlers, corsOrigins []string, ginMode string) *gin.Engine {
	gin.SetMode(ginMode)

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	r.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	api := r.Group("/api/v1")
	api.POST("/newsletter", h.Newsletter.Submit) // public contact form
	api.Use(middleware.ClerkAuth())
	{
		interviews := api.Group("/interviews")
		{
			interviews.POST("", h.Interview.Create)
			interviews.GET("", h.Interview.List)
			interviews.GET("/:mockId", h.Interview.Get)
			interviews.POST("/:mockId/answers", h.Answer.Upsert)
			interviews.GET("/:mockId/answers", h.Answer.List)
			interviews.DELETE("/:mockId", h.Interview.Delete)
		}

		questions := api.Group("/questions")
		{
			questions.POST("", h.Question.Create)
			questions.GET("", h.Question.List)
		}
	}

	return r
}
