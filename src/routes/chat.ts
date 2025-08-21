import { Router, Request, Response } from "express";
import { chatWithLLM, chatWithLLMOneShot } from "../llm/client.js";

const router = Router();

interface ChatRequest {
  persona: string;
  prompt: string;
}

router.post("/", async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { persona, prompt } = req.body;

    if (!persona || !prompt) {
      return res.status(400).json({ 
        error: "Both 'persona' and 'prompt' are required" 
      });
    }

    const response = await chatWithLLM(persona, prompt);
    
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
router.post("/one-shot", async (req: Request<{}, {}, { prompt: string }>, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "'prompt' is required"
      });
    }

    const response = await chatWithLLMOneShot(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Error in one-shot endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
