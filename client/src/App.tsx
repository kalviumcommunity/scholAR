import React from "react";
import Header from "./components/Header";
import AnswerCard from "./components/AnswerCard";
import { ask, askZeroShot, askOneShot, askMultiShot, type AskResponse, type PromptMode } from "./utils/api";

type HistoryItem = AskResponse & { id: string; question: string; timestamp: string };

const App: React.FC = () => {
  const [question, setQuestion] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<AskResponse | null>(null);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [mode, setMode] = React.useState<'cot'|'zero'|'one'|'multi'>('cot');
  const [dynamicMode, setDynamicMode] = React.useState<PromptMode>('default');
  const [persona, setPersona] = React.useState<'literature'|'analyst'|'citation'|'zeroshot'>('zeroshot');
  const [temperature, setTemperature] = React.useState<number>(1.0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAnswer(null);
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    setLoading(true);
    try {
      let res: AskResponse;
      if (mode === 'cot') {
        res = await ask(question, dynamicMode, temperature);
      } else if (mode === 'zero') {
        const r = await askZeroShot(persona, question, temperature);
        res = { finalAnswer: r.response, explanation: 'Zero-shot response.' };
      } else if (mode === 'one') {
        const r = await askOneShot(question, temperature);
        res = { finalAnswer: r.response, explanation: 'One-shot primed response.' };
      } else {
        const r = await askMultiShot(question, temperature);
        res = { finalAnswer: r.response, explanation: 'Multi-shot primed response.' };
      }
      setAnswer(res);
      setHistory(h => [{ id: crypto.randomUUID(), question, timestamp: new Date().toISOString(), ...res }, ...h]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Persist history
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('history');
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem('history', JSON.stringify(history));
    } catch {}
  }, [history]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="card p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="segmented" role="tablist" aria-label="Mode">
                {([
                  ['cot','Chain-of-Thought'],
                  ['zero','Zero-shot'],
                  ['one','One-shot'],
                  ['multi','Multi-shot']
                ] as const).map(([key,label]) => (
                  <button key={key} role="tab" aria-selected={mode===key} className={mode===key? 'active':''} onClick={() => setMode(key)}>{label}</button>
                ))}
              </div>
              {mode==='zero' && (
                <select aria-label="Persona" className="input max-w-xs" value={persona} onChange={e=>setPersona(e.target.value as any)}>
                  <option value="zeroshot">General</option>
                  <option value="literature">Literature</option>
                  <option value="analyst">Analyst</option>
                  <option value="citation">Citation</option>
                </select>
              )}
            </div>
            {mode==='cot' && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-300">CoT Mode:</label>
                <select aria-label="Prompt mode" className="input max-w-xs" value={dynamicMode} onChange={e=>setDynamicMode(e.target.value as PromptMode)}>
                  <option value="default">Default</option>
                  <option value="exam">Exam</option>
                  <option value="study">Study</option>
                  <option value="explainLike5">Explain Like 5</option>
                </select>
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your question</label>
                <textarea
                  id="question"
                  className="input min-h-[120px] resize-y"
                  placeholder="Ask anything..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Temperature
                  </label>
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {temperature.toFixed(1)}
                  </span>
                </div>
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0.0</span>
                  <span>1.0</span>
                  <span>2.0</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Lower = more focused, deterministic answers • Higher = more creative, varied answers
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="btn" type="submit" disabled={loading}>Ask ScholAR</button>
                {loading && <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-label="Loading" />}
                {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
              </div>
            </form>
          </div>

          <div className="space-y-4">
            {loading && !answer && (
              <div className="card p-5 animate-pulse">
                <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            )}
            {answer && (
              <AnswerCard
                finalAnswer={answer.finalAnswer}
                explanation={answer.explanation}
                question={question}
                timestamp={new Date().toLocaleString()}
              />
            )}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="card p-5">
            <h2 className="text-base font-semibold mb-3">History</h2>
            <ul className="space-y-3">
              {history.map((h) => (
                <li key={h.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">Q: {h.question}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(h.timestamp).toLocaleString()}</p>
                </li>
              ))}
              {history.length === 0 && <li className="text-sm text-gray-500">No questions yet.</li>}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;


