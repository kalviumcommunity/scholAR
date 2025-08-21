// src/utils/promptBuilder.ts

export type PromptMode = "default" | "exam" | "study" | "explainLike5";

export function buildPrompt(question: string, mode: PromptMode = "default"): string {
  const baseHeader = [
    "System:\nYou are ScholAR, an expert academic assistant.",
    "General rules:",
    "- Be accurate and cite facts only when certain.",
    "- Keep formatting clean and readable.",
  ];

  switch (mode) {
    case "exam":
      return [
        ...baseHeader,
        "Mode: Exam.",
        "Provide a solved answer sheet with clear, step-by-step reasoning.",
        "Output structure:",
        "Final Answer: <succinct final result>",
        "Explanation: <numbered steps showing your reasoning and key derivations>",
        "",
        `Question: ${question}`,
      ].join("\n");

    case "study":
      return [
        ...baseHeader,
        "Mode: Study.",
        "Provide a concise study summary and include 2–3 practice questions.",
        "Output structure:",
        "Final Answer: <concise study summary>",
        "Explanation: <2–3 practice questions as a short list>",
        "",
        `Question: ${question}`,
      ].join("\n");

    case "explainLike5":
      return [
        ...baseHeader,
        "Mode: Explain Like I'm 5.",
        "Use simple, kid-friendly language and analogies.",
        "Output structure:",
        "Final Answer: <very simple explanation>",
        "Explanation: <3–5 sentences expanding simply>",
        "",
        `Question: ${question}`,
      ].join("\n");

    case "default":
    default:
      return [
        ...baseHeader,
        "Mode: Default (Chain-of-thought hidden).",
        "Think step-by-step privately, but only output:",
        "Final Answer: <succinct final answer>",
        "Explanation: <3–5 sentence explanation>",
        "",
        `Question: ${question}`,
      ].join("\n");
  }
}


