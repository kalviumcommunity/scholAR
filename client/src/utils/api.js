export async function ask(question, mode = "default", signal) {
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
export async function askZeroShot(persona, prompt) {
    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, prompt }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export async function askOneShot(prompt) {
    const res = await fetch("/chat/one-shot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export async function askMultiShot(prompt) {
    const res = await fetch("/chat/multi-shot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
