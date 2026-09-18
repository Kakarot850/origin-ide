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