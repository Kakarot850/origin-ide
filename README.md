# Origin IDE - AI-Powered Cloud Web Development Environment

Origin IDE is a modern, high-performance, browser-based Integrated Development Environment (IDE) built for HTML, CSS, and JavaScript. Designed for developers, educators, and creators, Origin IDE combines real-time code execution with AI-powered assistance, secure cloud project management, and collaborative sharing capabilities in a sleek, developer-focused interface.

---

## ⚡ Core Features

### 1. Monaco-Powered Code Editor
- **VS Code Core Engine**: Integrates Microsoft's Monaco Editor (`@monaco-editor/react`) for desktop-grade editing.
- **Smart Syntax Highlighting & Autocomplete**: Multi-language support for HTML5, CSS3, and JavaScript (ES6+).
- **Custom Dark Theme**: Styled with a calm, premium palette (`#0B0F17` background, `#2DD4BF` teal primary accent, and `#2B3648` subtle slate borders).
- **Customizable Environment**: Auto-saving background worker, word wrapping, line numbers, and font options (`JetBrains Mono` and `Inter`).

### 2. Real-Time Viewport Execution
- **Instant Preview**: Live execution sandbox iframe that automatically updates as code is typed.
- **Isolated Sandbox Execution**: Runs user scripts safely in a sandboxed viewport with script security policies.

### 3. Integrated Origin AI Assistant
- **Gemini 3.6 Flash AI Engine**: Powered by `@google/genai` SDK (`gemini-3-flash-preview` model).
- **Context-Aware Coding Help**: Instant code generation, step-by-step logic explanations, bug fixing, and refactoring assistance.
- **Interactive Chat Panel**: Slide-over AI panel with markdown code block formatting and single-click copy buttons.

### 4. Cloud Project Management & Dashboard
- **Secure Authentication**: Built with `NextAuth.js` supporting credential-based sign-in and encrypted session handling via `bcryptjs` and `jsonwebtoken`.
- **MongoDB Persistence**: Mongoose schema modeling (`User`, `Project`) for cloud document persistence.
- **Project Dashboard**: Quick search/filter bar, project metadata cards, creation timestamp tracking, and CRUD project operations.

### 5. Collaborative Project Sharing
- **Unique Shareable URLs**: Generates unique nanoid routing keys (`/editor/[code]`) for direct view-only or edit link sharing.
- **Role-Based Access**: Distinguishes project owners from guest viewers to prevent unauthorized modifications.

---

## 🛠️ Complete Tech Stack Architecture

| Layer | Technology / Library | Purpose / Details |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (React 19)** | Page-based routing, SSR, static page generation, and optimized client components |
| **Code Editor Engine** | **Monaco Editor** | High-performance code editor core (same engine powering VS Code) |
| **UI Design System** | **Vanilla CSS Modules** | Custom design tokens (`globals.css`), CSS custom properties, and dark mode palette (`#0B0F17`, `#2DD4BF`) |
| **Icons & Typography** | **React Icons**, **Inter**, **JetBrains Mono** | Developer typography & iconography |
| **AI Integration** | **Google Gemini AI SDK (`@google/genai`)** | Intelligent code generation, contextual assistance, and automated debugging |
| **Backend Architecture** | **Next.js Serverless API Routes** | RESTful API endpoints handling auth, project CRUD, and AI requests |
| **Database & ORM** | **MongoDB Atlas**, **Mongoose** | Document-based data store for user accounts and project metadata |
| **Authentication** | **NextAuth.js**, **Bcrypt.js**, **JWT** | Secure password hashing, session tokens, and protected routes |
| **Deployment & Analytics** | **Vercel Cloud Platform**, **Vercel Analytics** | Edge hosting, static asset distribution, and application performance tracking |

---

## 💻 Environment Variables Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/code-editor?retryWrites=true&w=majority

# NextAuth Authentication Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_jwt_key_here

# Google Gemini AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MongoDB**: Local MongoDB server or free MongoDB Atlas cluster
- **Google Gemini API Key**: Free tier API key from [Google AI Studio](https://aistudio.google.com/)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/origin-ide/origin-ide.git
   cd origin-ide
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create `.env.local` using the template provided above.

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
codeEditor/
├── public/                  # Static assets (favicon, logos, robots.txt)
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Editor/          # Main IDE workspace component & CSS modules
│   │   ├── ChatBot.js       # Origin AI Chat Assistant modal & logic
│   │   ├── CodeEditorPreview.js # Landing page interactive editor preview
│   │   ├── ShareButton/     # Project share modal & link generator
│   │   └── LoginModal.js / SignupModal.js / CreateProjectModal.js
│   ├── models/              # Mongoose DB schema definitions (User, Project)
│   ├── pages/               # Next.js page routes & API endpoints
│   │   ├── api/             # Serverless backend endpoints (auth, projects)
│   │   ├── dashboard.js     # User projects dashboard
│   │   ├── editor/[code].js # Dynamic route for shared projects
│   │   ├── index.js         # Landing page
│   │   └── _app.js          # NextAuth provider wrapper & global styles
│   ├── service/             # External SDK services (Google GenAI / Gemini service)
│   ├── styles/              # CSS Modules & global design system tokens
│   └── utils/               # DB connection helper & nanoid code generator
├── package.json             # Dependencies & build scripts
└── README.md                # Documentation
```

---

## 🌟 Resume & Portfolio Section Highlight

If you are showcasing **Origin IDE** on your **Resume / LinkedIn / Portfolio**, you can use the structured sections below:

### Project Title
**Origin IDE – Full-Stack AI-Assisted Cloud Code Editor**

### Short Description (1-2 lines)
> A modern, full-stack browser-based IDE built with Next.js, Monaco Editor, MongoDB, and Google Gemini AI, featuring real-time code preview, cloud project management, and automated AI code generation.

### Key Resume Bullet Points (Ready to Copy)

- **Architected Full-Stack IDE Infrastructure**: Designed and implemented a responsive web-based code editor utilizing **Next.js (React 19)**, **Monaco Editor Engine**, and **MongoDB Atlas**, enabling real-time HTML/CSS/JS editing and execution.
- **AI Integration with Gemini SDK**: Integrated **Google's `@google/genai` API** (`gemini-3-flash-preview`), empowering users with context-aware code generation, automated debugging, and real-time algorithm explanations.
- **Authentication & Secure Cloud Persistence**: Implemented session-based authentication with **NextAuth.js**, **JWT**, and **Bcrypt.js**, ensuring secure user data protection and sub-100ms database document retrieval via **Mongoose ORM**.
- **Developer-Centric Design System**: Designed a custom dark theme design system using **Vanilla CSS Modules**, custom variables, and responsive layout structures (`#0B0F17` slate navy, `#2DD4BF` teal accent, `JetBrains Mono` typography).
- **Collaborative Link Generation**: Developed dynamic routing (`/editor/[code]`) with **Nanoid**, allowing instant project URL sharing with read-only and editable permission scopes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/origin-ide/origin-ide/issues).

---

Made with ❤️ for developers by the Origin IDE Team.
