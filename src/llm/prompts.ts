// src/llm/prompts.ts
export type Persona = "literature" | "analyst" | "citations";

export const baseSystem = (persona: Persona) => `
You are ScholAR, an AI-powered research assistant.
Persona: ${persona}.
- Maintain academic tone and be precise.
- Prefer concise, structured outputs (bullets/sections).
- If information is missing, ask a clarifying question first.
- When referencing specific works, use (Author, Year).
`.trim();

export const userTemplates = {
  literature: (topic: string) =>
    `Summarize and critically compare recent research on: ${topic}.
Return 3–5 key findings, limitations/gaps, and recommended next steps.`,

  analyst: (task: string) =>
    `Plan an analysis for: ${task}.
Return: (1) approach, (2) metrics, (3) risks/assumptions, (4) expected outputs.`,

  citations: (work: string) =>
    `Produce a correct BibTeX entry for: ${work}.
If multiple candidates exist, pick the most likely and note ambiguity in one line.`
};

// One-shot prompt builder: prepends an example Q&A pair before the actual user prompt
export function oneShotPrompt(userPrompt: string): string {
  const example = [
    "Example:",
    "Q: Summarize the role of AI in education.",
    "A: AI in education personalizes learning, automates grading, and provides adaptive feedback for students.",
  ].join("\n");

  return [
    example,
    "",
    `Q: ${userPrompt}`,
    "A:",
  ].join("\n");
}
