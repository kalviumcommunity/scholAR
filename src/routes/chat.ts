// src/routes/chat.ts
import express from "express";
import { baseSystem, userTemplates, type Persona } from "../llm/prompts.js";
import { llm } from "../llm/client.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { persona, prompt, params } = req.body as {
      persona: Persona;
      prompt: string;
      params?: { temperature?: number; top_p?: number; stop?: string[] };
    };

    if (!persona || !prompt) {
      return res.status(400).json({ error: "persona and prompt are required" });
    }

    const system = baseSystem(persona);
    const user = userTemplates[persona](prompt);

    const result = await llm.chat({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      ...(params ?? {})
    });

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "LLM request failed" });
  }
});

export default router;
