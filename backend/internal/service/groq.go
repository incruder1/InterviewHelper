package service

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	openai "github.com/sashabaranov/go-openai"
)

const (
	groqTextModel  = "llama-3.3-70b-versatile"
	groqAudioModel = "whisper-large-v3"
	groqBaseURL    = "https://api.groq.com/openai/v1"
)

// QAPair is the JSON shape the LLM returns for interview/question generation.
type QAPair struct {
	Question string `json:"Question"`
	Answer   string `json:"Answer"`
}

// FeedbackResult is the JSON shape the LLM returns for answer evaluation.
type FeedbackResult struct {
	Rating   string `json:"rating"`
	Feedback string `json:"feedback"`
}

// GroqService wraps the Groq API client (OpenAI-compatible).
type GroqService struct {
	client *openai.Client
}

func NewGroqService(apiKey string) *GroqService {
	cfg := openai.DefaultConfig(apiKey)
	cfg.BaseURL = groqBaseURL
	return &GroqService{client: openai.NewClientWithConfig(cfg)}
}

// GenerateInterviewQuestions asks the LLM for 5 Q&A pairs for a mock interview.
func (g *GroqService) GenerateInterviewQuestions(
	ctx context.Context,
	jobPosition, jobDesc, jobExperience string,
) (rawJSON string, pairs []QAPair, err error) {
	prompt := fmt.Sprintf(
		"Job Positions: %s, Job Description: %s, Years of Experience: %s. "+
			"Based on this information, please provide 5 interview questions with answers "+
			"in JSON format, ensuring \"Question\" and \"Answer\" are fields in the JSON. "+
			"Return only valid JSON array, no markdown.",
		jobPosition, jobDesc, jobExperience,
	)
	rawJSON, err = g.generateText(ctx, prompt)
	if err != nil {
		return "", nil, err
	}
	if err = json.Unmarshal([]byte(rawJSON), &pairs); err != nil {
		return "", nil, fmt.Errorf("groq: failed to parse Q&A JSON: %w (raw: %s)", err, rawJSON)
	}
	return rawJSON, pairs, nil
}

// GenerateQuestionBankQuestions asks the LLM for 5 Q&A pairs for a question bank entry.
func (g *GroqService) GenerateQuestionBankQuestions(
	ctx context.Context,
	jobPosition, jobDesc, jobExperience, typeQuestion, company string,
) (rawJSON string, pairs []QAPair, err error) {
	prompt := fmt.Sprintf(
		"Job Positions: %s, Job Description: %s, Years of Experience: %s, "+
			"Which type of question: %s, This company previous question: %s, "+
			"Based on this information, please provide 5 interview questions with answers in JSON format. "+
			"Each question and answer should be fields in the JSON. "+
			"Ensure \"Question\" and \"Answer\" are fields. Return only valid JSON array, no markdown.",
		jobPosition, jobDesc, jobExperience, typeQuestion, company,
	)
	rawJSON, err = g.generateText(ctx, prompt)
	if err != nil {
		return "", nil, err
	}
	if err = json.Unmarshal([]byte(rawJSON), &pairs); err != nil {
		return "", nil, fmt.Errorf("groq: failed to parse Q&A JSON: %w (raw: %s)", err, rawJSON)
	}
	return rawJSON, pairs, nil
}

// EvaluateAnswer asks the LLM to rate and provide feedback on a user's answer.
func (g *GroqService) EvaluateAnswer(
	ctx context.Context,
	question, userAnswer string,
) (*FeedbackResult, error) {
	prompt := fmt.Sprintf(
		"Question: %s, User Answer: %s, "+
			"Depends on question and user answer for given interview question "+
			"please give us rating for answer and feedback as area of improvement if any "+
			"in just 3 to 5 lines to improve it in JSON format with rating field and feedback field. "+
			"Return only valid JSON object, no markdown.",
		question, userAnswer,
	)
	raw, err := g.generateText(ctx, prompt)
	if err != nil {
		return nil, err
	}
	var result FeedbackResult
	if err = json.Unmarshal([]byte(raw), &result); err != nil {
		return nil, fmt.Errorf("groq: failed to parse feedback JSON: %w (raw: %s)", err, raw)
	}
	return &result, nil
}

// TranscribeAudio sends base64-encoded audio to Groq Whisper and returns the transcript.
func (g *GroqService) TranscribeAudio(
	ctx context.Context,
	audioBase64, mimeType string,
) (string, error) {
	if mimeType == "" {
		mimeType = "audio/webm"
	}

	audioBytes, err := base64.StdEncoding.DecodeString(audioBase64)
	if err != nil {
		return "", fmt.Errorf("groq: invalid base64 audio: %w", err)
	}

	// Derive a filename extension from the MIME type for the multipart upload.
	ext := "webm"
	if strings.Contains(mimeType, "mp4") {
		ext = "mp4"
	} else if strings.Contains(mimeType, "wav") {
		ext = "wav"
	} else if strings.Contains(mimeType, "mp3") || strings.Contains(mimeType, "mpeg") {
		ext = "mp3"
	} else if strings.Contains(mimeType, "ogg") {
		ext = "ogg"
	}

	resp, err := g.client.CreateTranscription(ctx, openai.AudioRequest{
		Model:    groqAudioModel,
		FilePath: "audio." + ext,
		Reader:   bytes.NewReader(audioBytes),
	})
	if err != nil {
		return "", fmt.Errorf("groq: transcription failed: %w", err)
	}
	return resp.Text, nil
}

// ── helpers ───────────────────────────────────────────────────────────────────

func (g *GroqService) generateText(ctx context.Context, prompt string) (string, error) {
	resp, err := g.client.CreateChatCompletion(ctx, openai.ChatCompletionRequest{
		Model: groqTextModel,
		Messages: []openai.ChatCompletionMessage{
			{Role: openai.ChatMessageRoleUser, Content: prompt},
		},
		Temperature: 1.0,
		MaxTokens:   8192,
	})
	if err != nil {
		return "", fmt.Errorf("groq: chat completion failed: %w", err)
	}
	if len(resp.Choices) == 0 {
		return "", fmt.Errorf("groq: empty response")
	}
	return cleanJSON(resp.Choices[0].Message.Content), nil
}

// cleanJSON strips markdown code fences that LLMs sometimes wrap around JSON.
func cleanJSON(s string) string {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "```json")
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimSuffix(s, "```")
	return strings.TrimSpace(s)
}
