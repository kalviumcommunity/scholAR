import { Router, Request, Response } from "express";
import { generateFromPrompt } from "../llm/client.js";

const router = Router();

interface MultiShotRequestBody {
  prompt: string;
  temperature?: number;
}

function buildMultiShotPrompt(userPrompt: string): string {
  const examples = [
    "Q: What is AI?",
    "A: AI is the simulation of human intelligence in machines that are programmed to think and learn.",
    "",
    "Q: Define machine learning.",
    "A: Machine learning is a subset of AI that uses algorithms to learn from data and make predictions or decisions.",
    "",
    "Q: Explain deep learning.",
    "A: Deep learning is a specialized form of machine learning using multi-layered neural networks to process complex patterns.",
  ].join("\n");

  return [
    "Examples:",
    examples,
    "",
    `Q: ${userPrompt}`,
    "A:",
  ].join("\n");
}

router.post("/multi-shot", async (req: Request<{}, {}, MultiShotRequestBody>, res: Response) => {
  try {
    const { prompt, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "'prompt' is required" });
    }

    const selectedTemperature = typeof temperature === "number" ? Math.max(0, Math.min(2, temperature)) : 1.0;
    const combined = buildMultiShotPrompt(prompt);
    const response = await generateFromPrompt(combined, selectedTemperature);
    return res.json({ response });
  } catch (error) {
    console.error("Error in multi-shot endpoint:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;


