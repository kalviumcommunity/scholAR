export type AskResponse = {
  finalAnswer: string;
  explanation: string;
};

export type PromptMode = "default" | "exam" | "study" | "explainLike5";

export async function ask(question: string, mode: PromptMode = "default", signal?: AbortSignal): Promise<AskResponse> {
  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, mode }),
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function askZeroShot(persona: string, prompt: string) {
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona, prompt }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ response: string }>
}

export async function askOneShot(prompt: string) {
  const res = await fetch("/chat/one-shot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ response: string }>
}

export async function askMultiShot(prompt: string) {
  const res = await fetch("/chat/multi-shot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ response: string }>
}


