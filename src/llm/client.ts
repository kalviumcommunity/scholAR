// src/llm/client.ts
import OpenAI from "openai";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
export interface ChatOptions {
  messages: ChatMessage[];
  temperature?: number;
  top_p?: number;
  stop?: string[];
}

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

export const llm = {
  async chat({ messages, temperature = 0.2, top_p = 0.9, stop }: ChatOptions) {
    if (openai) {
      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature,
        top_p,
        stop
      });
      return { text: res.choices[0].message?.content ?? "" };
    }
    // Stub fallback (no API key)
    const echo = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");
    return { text: `🤖 [Stubbed ScholAR]\n${echo}\n\n(Set OPENAI_API_KEY to get real outputs)` };
  }
};
