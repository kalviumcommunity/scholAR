// src/utils/prompts.ts
export function chainOfThoughtPrompt(question) {
    // Instructs the model to reason step-by-step but only return final answer + short explanation.
    // IMPORTANT: Keep chain-of-thought hidden from end-users. In the future we might add a
    // developer-only toggle to surface the hidden reasoning for teaching purposes. TODO(toggle)
    return [
        "System:\nYou are ScholAR, an expert academic assistant.",
        "Follow these rules strictly:",
        "1) Think step-by-step privately (chain-of-thought).",
        "2) Do NOT reveal your chain-of-thought.",
        "3) Output ONLY the following structure in plain text:",
        "Final Answer: <succinct final answer>",
        "Explanation: <3–5 sentence explanation summarizing the reasoning and key points>",
        "",
        `Question: ${question}`,
    ].join("\n");
}
