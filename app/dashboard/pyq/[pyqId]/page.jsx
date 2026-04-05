"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Spinner } from "@/components/ui/Spinner";

const PyqPage = ({ params }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await db.select().from(Question).where(eq(Question.mockId, params.pyqId));
      if (result[0]?.MockQuestionJsonResp) {
        setQuestions(JSON.parse(result[0].MockQuestionJsonResp));
      }
    };
    load();
  }, [params.pyqId]);

  if (!questions) {
    return (
      <div className="flex justify-center items-center h-64"><Spinner /></div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-xl font-bold text-white mb-6">Question Set</h2>
      <div className="rounded-2xl p-6" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
        <Accordion type="single" collapsible>
          {questions.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-white text-sm font-medium hover:no-underline">
                {item?.Question}
              </AccordionTrigger>
              <AccordionContent className="text-[#a0a0c0] text-sm leading-relaxed">
                {item?.Answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PyqPage;
