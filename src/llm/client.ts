import { GoogleGenerativeAI } from "@google/generative-ai";
import { oneShotPrompt } from "./prompts.js";

let genAI: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// Map personas to system prompts
const personas: Record<string, string> = {
  literature: "You are a research literature reviewer. Summarize and analyze academic papers.",
  analyst: "You are a data analyst. Interpret data and provide insights.",
  citation: "You are a citation manager. Format and suggest references.",
  zeroshot: "You are an intelligent assistant. Perform the task requested by the user directly without needing any prior examples.",
};

export async function chatWithLLM(persona: string, userPrompt: string, temperature: number = 1.0) {
  const systemPrompt = personas[persona] || "You are a helpful AI assistant.";

  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: Math.max(0, Math.min(2, temperature))
    }
  });

  // Combine system prompt and user prompt for Gemini
  const combinedPrompt = `${systemPrompt}\n\nUser: ${userPrompt}`;

  const result = await model.generateContent(combinedPrompt);
  const response = await result.response;
  
  return response.text();
}

export async function chatWithLLMOneShot(prompt: string, temperature: number = 1.0): Promise<string> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: Math.max(0, Math.min(2, temperature))
    }
  });

  const builtPrompt = oneShotPrompt(prompt);

  const result = await model.generateContent(builtPrompt);
  const response = await result.response;

  return response.text();
}

// Generic generator for pre-built prompts (used by multi-shot, etc.)
export async function generateFromPrompt(prompt: string, temperature: number = 1.0): Promise<string> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: Math.max(0, Math.min(2, temperature))
    }
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}
