// src/utils/templates.js

export const DEFAULT_TEMPLATES = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <div class="container">
    <h1>Hello, Origin IDE!</h1>
    <p>Start editing to see changes live.</p>
    <button id="action-btn">Click Me</button>
  </div>
</body>
</html>`,

    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0f172a;
  color: #f8fafc;
}

.container {
  text-align: center;
  padding: 2rem;
  background: #1e293b;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

button {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #2563eb;
}`,

    javascript: `// Interactive starter script
const button = document.getElementById('action-btn');

let count = 0;
button.addEventListener('click', () => {
  count++;
  button.textContent = \`Clicked \${count} time\${count === 1 ? '' : 's'}! 🚀\`;
  alert('Button clicked! Origin IDE is running smoothly.');
});`
};

export const REACT_TEMPLATES = {
    html: `<!-- React Root Mount Target -->
<div id="root"></div>`,

    css: `/* Custom CSS (Tailwind classes are supported directly in JSX) */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
}`,

    javascript: `const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-2">
          <svg className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
          React + Tailwind
        </h1>
        
        <p className="text-slate-400 text-sm">
          Interactive single-file React component with instant Tailwind CSS utility styling.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Count is: <span className="font-bold ml-1">{count}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Edit this component to see instant updates live in the preview.
        </p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`
};