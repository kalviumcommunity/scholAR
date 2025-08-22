import { Router, Request, Response } from "express";
import { chatWithLLM, chatWithLLMOneShot } from "../llm/client.js";

const router = Router();

interface ChatRequest {
  persona: string;
  prompt: string;
  temperature?: number;
}

router.post("/", async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { persona, prompt, temperature } = req.body;

    if (!persona || !prompt) {
      return res.status(400).json({ 
        error: "Both 'persona' and 'prompt' are required" 
      });
    }

    const selectedTemperature = typeof temperature === "number" ? Math.max(0, Math.min(2, temperature)) : 1.0;
    const response = await chatWithLLM(persona, prompt, selectedTemperature);
    
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
});

export default router;

// One-shot prompting endpoint
router.post("/one-shot", async (req: Request<{}, {}, { prompt: string; temperature?: number }>, res: Response) => {
  try {
    const { prompt, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "'prompt' is required"
      });
    }

    const selectedTemperature = typeof temperature === "number" ? Math.max(0, Math.min(2, temperature)) : 1.0;
    const response = await chatWithLLMOneShot(prompt, selectedTemperature);
    res.json({ response });
  } catch (error) {
    console.error("Error in one-shot endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
