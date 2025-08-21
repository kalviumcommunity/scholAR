export const baseSystem = (persona) => `
You are ScholAR, an AI-powered research assistant.
Persona: ${persona}.
- Maintain academic tone and be precise.
- Prefer concise, structured outputs (bullets/sections).
- If information is missing, ask a clarifying question first.
- When referencing specific works, use (Author, Year).
`.trim();
export const userTemplates = {
    literature: (topic) => `Summarize and critically compare recent research on: ${topic}.
Return 3–5 key findings, limitations/gaps, and recommended next steps.`,
    analyst: (task) => `Plan an analysis for: ${task}.
Return: (1) approach, (2) metrics, (3) risks/assumptions, (4) expected outputs.`,
    citations: (work) => `Produce a correct BibTeX entry for: ${work}.
If multiple candidates exist, pick the most likely and note ambiguity in one line.`
};
