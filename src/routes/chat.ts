import { Router, Request, Response } from "express";
import { chatWithLLM } from "../llm/client.js";

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
