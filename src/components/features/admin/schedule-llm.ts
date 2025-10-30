import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { resShiftData } from "@/types";
import { FestivalShiftPlan, OpenAIOutputSchema } from "./schema";
import { PROMPT_1101, PROMPT_1102, PROMPT_1103, PROMPT_1104 } from "./prompt";

const escapeTemplateBraces = (value: string) =>
  value.replaceAll("{", "{{").replaceAll("}", "}}");

export const getSystemPrompt = (day: 1 | 2 | 3 | 4) => {
  switch (day) {
    case 1:
      return PROMPT_1101;
    case 2:
      return PROMPT_1102;
    case 3:
      return PROMPT_1103;
    case 4:
      return PROMPT_1104;
  }
};

export async function processFestivalShiftsWithLangChain(opts: {
  day: 1 | 2 | 3 | 4;
  data: resShiftData[];
}): Promise<FestivalShiftPlan> {
  const { day, data } = opts;

  const systemPrompt = getSystemPrompt(day);
  if (!systemPrompt) {
    throw new Error(`Unsupported day: ${day}`);
  }

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 1,
  });

  const structured = llm.withStructuredOutput(OpenAIOutputSchema, {
    name: "festival_shift_output",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "{systemPrompt}"],
    ["user", "{inputJson}"],
  ]);

  const chain = prompt.pipe(structured);

  const inputJson = JSON.stringify(data);
  const result = await chain.invoke({
    systemPrompt: escapeTemplateBraces(systemPrompt),
    inputJson: escapeTemplateBraces(inputJson),
  });

  return result;
}
