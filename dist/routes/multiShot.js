import { Router } from "express";
import { generateFromPrompt } from "../llm/client.js";
const router = Router();
function buildMultiShotPrompt(userPrompt) {
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
router.post("/multi-shot", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "'prompt' is required" });
        }
        const combined = buildMultiShotPrompt(prompt);
        const response = await generateFromPrompt(combined);
        return res.json({ response });
    }
    catch (error) {
        console.error("Error in multi-shot endpoint:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
