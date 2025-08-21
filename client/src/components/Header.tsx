import React from "react";

const Header: React.FC = () => {
  const [dark, setDark] = React.useState<boolean>(false);
  React.useEffect(() => {
    // initial
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setDark(true);
    if (stored === 'light') setDark(false);
    if (!stored) {
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(prefers);
    }
  }, []);

  React.useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md" aria-hidden />
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">ScholAR</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Research AI Assistant</div>
          </div>
        </div>
        <button className="btn" aria-label="Toggle theme" title="Toggle theme" onClick={() => setDark(v => !v)}>
          {dark ? 'Light' : 'Dark'} mode
        </button>
      </div>
    </header>
  );
};

export default Header;


