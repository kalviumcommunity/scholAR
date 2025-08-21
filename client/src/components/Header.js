import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const Header = () => {
    const [dark, setDark] = React.useState(false);
    React.useEffect(() => {
        // initial
        const stored = localStorage.getItem('theme');
        if (stored === 'dark')
            setDark(true);
        if (stored === 'light')
            setDark(false);
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
        }
        else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);
    return (_jsx("header", { className: "sticky top-0 z-10 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md", "aria-hidden": true }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: "ScholAR" }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Research AI Assistant" })] })] }), _jsxs("button", { className: "btn", "aria-label": "Toggle theme", title: "Toggle theme", onClick: () => setDark(v => !v), children: [dark ? 'Light' : 'Dark', " mode"] })] }) }));
};
export default Header;
