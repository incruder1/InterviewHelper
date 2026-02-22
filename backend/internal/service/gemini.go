package service

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

// QAPair is the JSON shape Gemini returns for interview/question generation.
type QAPair struct {
	Question string `json:"Question"`
	Answer   string `json:"Answer"`
}

// FeedbackResult is the JSON shape Gemini returns for answer evaluation.
type FeedbackResult struct {
	Rating   string `json:"rating"`
	Feedback string `json:"feedback"`
}

// GeminiService wraps the Gemini generative AI client.
type GeminiService struct {
	client *genai.Client
}

func NewGeminiService(ctx context.Context, apiKey string) (*GeminiService, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("gemini: failed to create client: %w", err)
	}
	return &GeminiService{client: client}, nil
}

func (g *GeminiService) Close() {
	g.client.Close()
}

// GenerateInterviewQuestions asks Gemini for 5 Q&A pairs for a mock interview.
// Returns the raw JSON string (stored verbatim in the DB) and the parsed pairs.
func (g *GeminiService) GenerateInterviewQuestions(
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
		return "", nil, fmt.Errorf("gemini: failed to parse Q&A JSON: %w (raw: %s)", err, rawJSON)
	}
	return rawJSON, pairs, nil
}

// GenerateQuestionBankQuestions asks Gemini for 5 Q&A pairs for a question bank entry.
func (g *GeminiService) GenerateQuestionBankQuestions(
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
		return "", nil, fmt.Errorf("gemini: failed to parse Q&A JSON: %w (raw: %s)", err, rawJSON)
	}
	return rawJSON, pairs, nil
}

// EvaluateAnswer asks Gemini to rate and provide feedback on a user's answer.
func (g *GeminiService) EvaluateAnswer(
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
		return nil, fmt.Errorf("gemini: failed to parse feedback JSON: %w (raw: %s)", err, raw)
	}
	return &result, nil
}

// TranscribeAudio sends base64-encoded audio to Gemini and returns the transcript.
func (g *GeminiService) TranscribeAudio(
	ctx context.Context,
	audioBase64, mimeType string,
) (string, error) {
	if mimeType == "" {
		mimeType = "audio/webm"
	}

	audioBytes, err := base64.StdEncoding.DecodeString(audioBase64)
	if err != nil {
		return "", fmt.Errorf("gemini: invalid base64 audio: %w", err)
	}

	model := g.client.GenerativeModel("gemini-1.5-flash")

	resp, err := model.GenerateContent(ctx,
		genai.Text("Transcribe the following audio, returning only the transcript text:"),
		genai.Blob{MIMEType: mimeType, Data: audioBytes},
	)
	if err != nil {
		return "", fmt.Errorf("gemini: transcription failed: %w", err)
	}
	return extractText(resp), nil
}

// ── helpers ───────────────────────────────────────────────────────────────────

func (g *GeminiService) generateText(ctx context.Context, prompt string) (string, error) {
	model := g.client.GenerativeModel("gemini-1.5-flash")
	model.SetTemperature(1.0)
	model.SetTopP(0.95)
	model.SetTopK(64)
	model.SetMaxOutputTokens(8192)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("gemini: GenerateContent failed: %w", err)
	}

	text := cleanJSON(extractText(resp))
	if text == "" {
		return "", fmt.Errorf("gemini: empty response")
	}
	return text, nil
}

func extractText(resp *genai.GenerateContentResponse) string {
	var sb strings.Builder
	for _, cand := range resp.Candidates {
		if cand.Content == nil {
			continue
		}
		for _, part := range cand.Content.Parts {
			if txt, ok := part.(genai.Text); ok {
				sb.WriteString(string(txt))
			}
		}
	}
	return sb.String()
}

// cleanJSON strips markdown code fences that Gemini sometimes wraps around JSON.
func cleanJSON(s string) string {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "```json")
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimSuffix(s, "```")
	return strings.TrimSpace(s)
}
