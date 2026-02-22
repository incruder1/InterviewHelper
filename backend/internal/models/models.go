package models

// MockInterview mirrors the "mockInterview" table created by the Next.js Drizzle schema.
// Column names use camelCase to match the existing schema exactly.
type MockInterview struct {
	ID            uint   `gorm:"column:id;primaryKey;autoIncrement"    json:"id"`
	MockID        string `gorm:"column:mockId;not null;uniqueIndex"    json:"mockId"`
	JSONMockResp  string `gorm:"column:jsonMockResp;not null"          json:"jsonMockResp"`
	JobPosition   string `gorm:"column:jobPosition;not null"          json:"jobPosition"`
	JobDesc       string `gorm:"column:jobDesc;not null"              json:"jobDesc"`
	JobExperience string `gorm:"column:jobExperience;not null"        json:"jobExperience"`
	CreatedBy     string `gorm:"column:createdBy;not null"            json:"createdBy"`
	CreatedAt     string `gorm:"column:createdAt;autoCreateTime:false;autoUpdateTime:false" json:"createdAt"`
}

func (MockInterview) TableName() string { return "mockInterview" }

// Question mirrors the "question" table.
type Question struct {
	ID                   uint   `gorm:"column:id;primaryKey;autoIncrement"              json:"id"`
	MockID               string `gorm:"column:mockId;not null;uniqueIndex"              json:"mockId"`
	MockQuestionJSONResp string `gorm:"column:MockQuestionJsonResp;not null"            json:"MockQuestionJsonResp"`
	JobPosition          string `gorm:"column:jobPosition;not null"                    json:"jobPosition"`
	JobDesc              string `gorm:"column:jobDesc;not null"                        json:"jobDesc"`
	JobExperience        string `gorm:"column:jobExperience;not null"                  json:"jobExperience"`
	TypeQuestion         string `gorm:"column:typeQuestion;not null"                   json:"typeQuestion"`
	Company              string `gorm:"column:company;not null"                        json:"company"`
	CreatedBy            string `gorm:"column:createdBy;not null"                      json:"createdBy"`
	CreatedAt            string `gorm:"column:createdAt;autoCreateTime:false;autoUpdateTime:false" json:"createdAt"`
}

func (Question) TableName() string { return "question" }

// UserAnswer mirrors the "userAnswer" table.
// Note: the DB column is named "mockId" (not "mockIdRef") per the Drizzle schema.
type UserAnswer struct {
	ID           uint   `gorm:"column:id;primaryKey;autoIncrement"              json:"id"`
	MockIDRef    string `gorm:"column:mockId;not null"                         json:"mockIdRef"`
	QuestionText string `gorm:"column:question;not null"                       json:"question"`
	CorrectAns   string `gorm:"column:correctAns"                              json:"correctAns"`
	UserAns      string `gorm:"column:userAns"                                 json:"userAns"`
	Feedback     string `gorm:"column:feedback"                                json:"feedback"`
	Rating       string `gorm:"column:rating"                                  json:"rating"`
	UserEmail    string `gorm:"column:userEmail"                               json:"userEmail"`
	CreatedAt    string `gorm:"column:createdAt;autoCreateTime:false;autoUpdateTime:false" json:"createdAt"`
}

func (UserAnswer) TableName() string { return "userAnswer" }

// Newsletter mirrors the "newsletter" table (contact form submissions).
type Newsletter struct {
	ID        uint   `gorm:"column:id;primaryKey;autoIncrement" json:"id"`
	NewName   string `gorm:"column:newName"                     json:"newName"`
	NewEmail  string `gorm:"column:newEmail"                    json:"newEmail"`
	NewMessage string `gorm:"column:newMessage"                 json:"newMessage"`
	CreatedAt string `gorm:"column:createdAt;autoCreateTime:false;autoUpdateTime:false" json:"createdAt"`
}

func (Newsletter) TableName() string { return "newsletter" }
