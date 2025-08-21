import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("/ask (chain-of-thought)", () => {
  it("400 when question is empty", async () => {
    const res = await request(app).post("/ask").send({ question: "" });
    expect(res.status).toBe(400);
  });

  it("returns Final Answer and Explanation when question provided", async () => {
    // Note: This hits the live LLM. In CI you may want to mock `generateFromPrompt`.
    const res = await request(app)
      .post("/ask")
      .send({ question: "What is overfitting in machine learning?" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(typeof res.body.finalAnswer).toBe("string");
    expect(typeof res.body.explanation).toBe("string");
  });
});


