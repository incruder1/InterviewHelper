import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const Question = pgTable('question', {
  id: serial('id').primaryKey(),
  MockQuestionJsonResp: text('MockQuestionJsonResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  typeQuestion: varchar('typeQuestion').notNull(),
  company: varchar('company').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull(),
});