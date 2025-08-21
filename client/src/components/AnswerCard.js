import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const AnswerCard = ({ finalAnswer, explanation, question, timestamp }) => {
    return (_jsxs("article", { className: "card p-5 space-y-3", children: [question && (_jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Q: ", question] })), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: "Final Answer" }), _jsx("p", { className: "text-gray-800 dark:text-gray-200 leading-relaxed", children: finalAnswer }), _jsx("h4", { className: "text-sm font-medium text-gray-900 dark:text-gray-100 mt-3", children: "Explanation" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300 leading-relaxed", children: explanation }), timestamp && (_jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 pt-2", children: timestamp }))] }));
};
export default AnswerCard;
