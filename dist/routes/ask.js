import { Router } from "express";
import { chainOfThoughtPrompt } from "../utils/prompts.js";
import { generateFromPrompt } from "../llm/client.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const { question } = req.body || {};
        if (!question || typeof question !== "string" || question.trim().length === 0) {
            return res.status(400).json({ error: "'question' is required" });
        }
        const prompt = chainOfThoughtPrompt(question);
        const raw = await generateFromPrompt(prompt);
        // Parse the model output expecting "Final Answer:" and "Explanation:" sections
        const finalPrefix = "Final Answer:";
        const explPrefix = "Explanation:";
        const finalIdx = raw.indexOf(finalPrefix);
        const explIdx = raw.indexOf(explPrefix);
        let finalAnswer = "";
        let explanation = "";
        if (finalIdx !== -1 && explIdx !== -1) {
            finalAnswer = raw
                .slice(finalIdx + finalPrefix.length, explIdx)
                .trim();
            explanation = raw
                .slice(explIdx + explPrefix.length)
                .trim();
        }
        else {
            // Fallback: whole text as explanation if the structure wasn't followed
            explanation = raw.trim();
            finalAnswer = "";
        }
        const payload = { finalAnswer, explanation };
        return res.json(payload);
    }
    catch (error) {
        console.error("Error in /ask:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
