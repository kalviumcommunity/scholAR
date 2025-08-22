export async function ask(question, mode = "default", temperature = 1.0, signal) {
    const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mode, temperature }),
        signal,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
    }
    return res.json();
}
export async function askZeroShot(persona, prompt, temperature = 1.0) {
    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, prompt, temperature }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export async function askOneShot(prompt, temperature = 1.0) {
    const res = await fetch("/chat/one-shot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, temperature }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export async function askMultiShot(prompt, temperature = 1.0) {
    const res = await fetch("/chat/multi-shot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, temperature }),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
