import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Header from "./components/Header";
import AnswerCard from "./components/AnswerCard";
import { ask, askZeroShot, askOneShot, askMultiShot } from "./utils/api";
const App = () => {
    const [question, setQuestion] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [answer, setAnswer] = React.useState(null);
    const [history, setHistory] = React.useState([]);
    const [mode, setMode] = React.useState('cot');
    const [dynamicMode, setDynamicMode] = React.useState('default');
    const [persona, setPersona] = React.useState('zeroshot');
    const [temperature, setTemperature] = React.useState(1.0);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setAnswer(null);
        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }
        setLoading(true);
        try {
            let res;
            if (mode === 'cot') {
                res = await ask(question, dynamicMode, temperature);
            }
            else if (mode === 'zero') {
                const r = await askZeroShot(persona, question, temperature);
                res = { finalAnswer: r.response, explanation: 'Zero-shot response.' };
            }
            else if (mode === 'one') {
                const r = await askOneShot(question, temperature);
                res = { finalAnswer: r.response, explanation: 'One-shot primed response.' };
            }
            else {
                const r = await askMultiShot(question, temperature);
                res = { finalAnswer: r.response, explanation: 'Multi-shot primed response.' };
            }
            setAnswer(res);
            setHistory(h => [{ id: crypto.randomUUID(), question, timestamp: new Date().toISOString(), ...res }, ...h]);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            setLoading(false);
        }
    };
    // Persist history
    React.useEffect(() => {
        try {
            const raw = localStorage.getItem('history');
            if (raw)
                setHistory(JSON.parse(raw));
        }
        catch { }
    }, []);
    React.useEffect(() => {
        try {
            localStorage.setItem('history', JSON.stringify(history));
        }
        catch { }
    }, [history]);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("section", { className: "lg:col-span-2 space-y-4", children: [_jsxs("div", { className: "card p-5 space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("div", { className: "segmented", role: "tablist", "aria-label": "Mode", children: [
                                                    ['cot', 'Chain-of-Thought'],
                                                    ['zero', 'Zero-shot'],
                                                    ['one', 'One-shot'],
                                                    ['multi', 'Multi-shot']
                                                ].map(([key, label]) => (_jsx("button", { role: "tab", "aria-selected": mode === key, className: mode === key ? 'active' : '', onClick: () => setMode(key), children: label }, key))) }), mode === 'zero' && (_jsxs("select", { "aria-label": "Persona", className: "input max-w-xs", value: persona, onChange: e => setPersona(e.target.value), children: [_jsx("option", { value: "zeroshot", children: "General" }), _jsx("option", { value: "literature", children: "Literature" }), _jsx("option", { value: "analyst", children: "Analyst" }), _jsx("option", { value: "citation", children: "Citation" })] }))] }), mode === 'cot' && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-sm text-gray-600 dark:text-gray-300", children: "CoT Mode:" }), _jsxs("select", { "aria-label": "Prompt mode", className: "input max-w-xs", value: dynamicMode, onChange: e => setDynamicMode(e.target.value), children: [_jsx("option", { value: "default", children: "Default" }), _jsx("option", { value: "exam", children: "Exam" }), _jsx("option", { value: "study", children: "Study" }), _jsx("option", { value: "explainLike5", children: "Explain Like 5" })] })] })), _jsxs("form", { onSubmit: onSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "question", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Your question" }), _jsx("textarea", { id: "question", className: "input min-h-[120px] resize-y", placeholder: "Ask anything...", value: question, onChange: (e) => setQuestion(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "temperature", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Temperature" }), _jsx("span", { className: "text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded", children: temperature.toFixed(1) })] }), _jsx("input", { id: "temperature", type: "range", min: "0", max: "2", step: "0.1", value: temperature, onChange: (e) => setTemperature(parseFloat(e.target.value)), className: "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500 dark:text-gray-400", children: [_jsx("span", { children: "0.0" }), _jsx("span", { children: "1.0" }), _jsx("span", { children: "2.0" })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Lower = more focused, deterministic answers \u2022 Higher = more creative, varied answers" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "btn", type: "submit", disabled: loading, children: "Ask ScholAR" }), loading && _jsx("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent", "aria-label": "Loading" }), error && _jsx("p", { className: "text-sm text-red-600", role: "alert", children: error })] })] })] }), _jsxs("div", { className: "space-y-4", children: [loading && !answer && (_jsxs("div", { className: "card p-5 animate-pulse", children: [_jsx("div", { className: "h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3" }), _jsx("div", { className: "h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" }), _jsx("div", { className: "h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" })] })), answer && (_jsx(AnswerCard, { finalAnswer: answer.finalAnswer, explanation: answer.explanation, question: question, timestamp: new Date().toLocaleString() }))] })] }), _jsx("aside", { className: "lg:col-span-1", children: _jsxs("div", { className: "card p-5", children: [_jsx("h2", { className: "text-base font-semibold mb-3", children: "History" }), _jsxs("ul", { className: "space-y-3", children: [history.map((h) => (_jsxs("li", { className: "p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700", children: [_jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300 line-clamp-2", children: ["Q: ", h.question] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: new Date(h.timestamp).toLocaleString() })] }, h.id))), history.length === 0 && _jsx("li", { className: "text-sm text-gray-500", children: "No questions yet." })] })] }) })] })] }));
};
export default App;
