import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("/ask (chain-of-thought)", () => {
  it("400 when question is empty", async () => {
    const res = await request(app).post("/ask").send({ question: "" });
    expect(res.status).toBe(400);
  });

  it("returns Final Answer and Explanation when question provided (default mode)", async () => {
    // Note: This hits the live LLM. In CI you may want to mock `generateFromPrompt`.
    const res = await request(app)
      .post("/ask")
      .send({ question: "What is overfitting in machine learning?", mode: "default" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(typeof res.body.finalAnswer).toBe("string");
    expect(typeof res.body.explanation).toBe("string");
  });
  
  it("exam mode returns structured answer", async () => {
    const res = await request(app)
      .post("/ask")
      .send({ question: "Solve: derivative of x^2", mode: "exam" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(typeof res.body.finalAnswer).toBe("string");
    expect(typeof res.body.explanation).toBe("string");
  });

  it("invalid mode falls back to default", async () => {
    const res = await request(app)
      .post("/ask")
      // @ts-expect-error testing invalid mode
      .send({ question: "Explain gravity", mode: "invalid" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(typeof res.body.finalAnswer).toBe("string");
    expect(typeof res.body.explanation).toBe("string");
  });
});


