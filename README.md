# Origin IDE - Full-Stack AI-Assisted Cloud Development Environment

> **Comprehensive Technical Blueprint, Architectural Documentation & System Reference**  
> *Reverse-Engineered directly from active source code, configuration files, and database schemas.*

---

## Table of Contents

1. [Projects Overview](#1-projects-overview)
   - [Project 1: Origin Landing & Marketing Portal](#project-1-origin-landing--marketing-portal)
   - [Project 2: Origin Cloud IDE & Workspace Platform](#project-2-origin-cloud-ide--workspace-platform)
   - [Project 3: Origin AI Assistant & Code Generation Engine](#project-3-origin-ai-assistant--code-generation-engine)
   - [Cross-Project Technical Matrix](#cross-project-technical-matrix)
2. [Repository & Folder Structure](#2-repository--folder-structure)
3. [Architecture of Each Project](#3-architecture-of-each-project)
   - [High-Level System Architecture](#high-level-system-architecture)
   - [Sub-System 1 Architecture](#sub-system-1-architecture-origin-landing--marketing-portal)
   - [Sub-System 2 Architecture](#sub-system-2-architecture-origin-cloud-ide--workspace-platform)
   - [Sub-System 3 Architecture](#sub-system-3-architecture-origin-ai-assistant--code-generation-engine)
4. [Complete Page & Screen Breakdown](#4-complete-page--screen-breakdown)
   - [Page 1: Public Landing Page (`/`)](#page-1-public-landing-page-)
   - [Page 2: Cloud User Dashboard (`/dashboard`)](#page-2-cloud-user-dashboard-dashboard)
   - [Page 3: Interactive Workspace Editor (`/editor/[code]`)](#page-3-interactive-workspace-editor-editorcode)
5. [Complete Page Linking & Routing Map](#5-complete-page-linking--routing-map)
   - [Route Classification Table](#route-classification-table)
   - [Navigation State Matrix](#navigation-state-matrix)
   - [Mermaid Route Flowchart](#mermaid-route-flowchart)
6. [Frontend Data Flow](#6-frontend-data-flow)
7. [Backend Data Flow](#7-backend-data-flow)
   - [API Endpoints Table](#api-endpoints-table)
8. [Database Architecture](#8-database-architecture)
   - [User Collection Schema](#user-collection-schema)
   - [Project Collection Schema](#project-collection-schema)
   - [Entity-Relationship Diagram](#entity-relationship-diagram)
   - [Data Lifecycle Management](#data-lifecycle-management)
9. [Authentication & Authorization System](#9-authentication--authorization-system)
   - [Session Management & Credentials Authentication](#session-management--credentials-authentication)
   - [OAuth Sign-In Flow](#oauth-sign-in-flow)
   - [Dual-Key Nanoid Authorization Engine](#dual-key-nanoid-authorization-engine)
   - [Authentication Sequence Diagram](#authentication-sequence-diagram)
10. [API & External Service Integrations](#10-api--external-service-integrations)
11. [Component Architecture](#11-component-architecture)
    - [Component Hierarchy Tree](#component-hierarchy-tree)
    - [Core Component Specifications](#core-component-specifications)
12. [State Management Architecture](#12-state-management-architecture)
13. [End-to-End Feature Flows](#13-end-to-end-feature-flows)
    - [Flow 1: User Registration & Auto-Login](#flow-1-user-registration--auto-login)
    - [Flow 2: Authenticated Project Creation](#flow-2-authenticated-project-creation)
    - [Flow 3: Code Editing & Auto-Save Pipeline](#flow-3-code-editing--auto-save-pipeline)
    - [Flow 4: Dual-Access Shareable URL Generation & Access Control](#flow-4-dual-access-shareable-url-generation--access-control)
    - [Flow 5: AI Code Generation & IDE State Insertion](#flow-5-ai-code-generation--ide-state-insertion)
14. [Mermaid Sequence Diagrams](#14-mermaid-sequence-diagrams)
15. [Error Handling & Resiliency](#15-error-handling--resiliency)
16. [Validation & Data Integrity](#16-validation--data-integrity)
17. [Security Model & Audit](#17-security-model--audit)
    - [Implemented Security Controls](#implemented-security-controls)
    - [Security Gaps & Vulnerabilities](#security-gaps--vulnerabilities)
18. [Environment Variable Configuration](#18-environment-variable-configuration)
19. [Dependencies & Package Analysis](#19-dependencies--package-analysis)
20. [Build, Local Execution & Deployment](#20-build-local-execution--deployment)
21. [Testing Infrastructure](#21-testing-infrastructure)
22. [Performance Analysis & Optimization](#22-performance-analysis--optimization)
23. [Architectural Decisions & Trade-Offs](#23-architectural-decisions--trade-offs)
24. [Complete End-to-End Execution Trace](#24-complete-end-to-end-execution-trace)
25. [How Everything Connects](#25-how-everything-connects)
26. [File-to-File Dependency Map](#26-file-to-file-dependency-map)
27. [Interview-Ready Technical Explanations](#27-interview-ready-technical-explanations)
    - [30-Second Pitch](#30-second-pitch)
    - [2-Minute Technical Summary](#2-minute-technical-summary)
    - [Deep Technical Q&A (12 Interview Scenarios)](#deep-technical-qa-12-interview-scenarios)
28. [Strengths, Technical Debt & Scalability Roadmap](#28-strengths-technical-debt--scalability-roadmap)

---

# 1. Projects Overview

The workspace repository [`Origin IDE`](file:///d:/Next_js/codeEditor) is an enterprise-grade full-stack web application. Rather than a monolithic collection of disjointed files, it is engineered into **3 distinct, deeply integrated core sub-systems/projects**:

```
+-----------------------------------------------------------------------------------+
|                                 ORIGIN IDE ECOSYSTEM                              |
+------------------------------------+----------------------------------------------+
| Project 1: Landing & Marketing     | Project 2: Cloud IDE Platform                |
| - Marketing & Feature Onboarding   | - Monaco Editor Engine & Preview Sandbox     |
| - Guest & Auth Entry Modal Routing | - MongoDB Cloud Persistence & Dual Link Sharing|
+------------------------------------+----------------------------------------------+
| Project 3: Origin AI Assistant Engine                                             |
| - Google Gemini 3.6 Flash LLM Service & System Prompt Guardrails                 |
| - Natural Language -> Multi-File HTML/CSS/JS Code Generation Modal                |
+-----------------------------------------------------------------------------------+
```

---

### Project 1: Origin Landing & Marketing Portal

* **Name**: Origin Landing & Marketing Portal
* **Purpose**: Serves as the public entry point, value proposition showcase, guest project initiator, and user authentication portal.
* **Problem it Solves**: Eliminates friction for incoming developers who want to immediately test web code without creating an account, while providing educational landing materials and modal-driven user authentication.
* **Target Users**: Web developers, students, educators, and guest coders looking for instant browser sandbox access.
* **Main Features**:
  * Interactive syntax-highlighted editor mockup ([`CodeEditorPreview.js`](file:///d:/Next_js/codeEditor/src/components/CodeEditorPreview.js)).
  * Responsive navigation bar with mobile hamburger drawer support.
  * Direct modal triggers for Sign In, Sign Up, and Guest/Authenticated Project Creation.
  * Integration with Vercel Analytics, Google Tag Manager (`G-G39KFP1LZ7`), and Umami Analytics (`d7e18806-3d6f-4107-a5ba-9d8d4ea50644`).
* **Technology Stack**: Next.js 15 (Pages Router), React 19, Vanilla CSS Modules ([`Home.module.css`](file:///d:/Next_js/codeEditor/src/styles/Home.module.css)), `react-icons`.
* **Frontend**: Next.js Server-Side Rendered (SSR) home page ([`index.js`](file:///d:/Next_js/codeEditor/src/pages/index.js)) with modal components.
* **Backend**: NextAuth Session Provider consumption ([`_app.js`](file:///d:/Next_js/codeEditor/src/pages/_app.js)).
* **Database**: Indirectly interfaces with MongoDB through auth modals.
* **External APIs**: Google Tag Manager & Umami Analytics scripts.
* **Authentication**: Integrates with NextAuth `useSession` hook to render user avatars and toggle Dashboard access.
* **Deployment**: Vercel Serverless Edge Platform.
* **Current Status**: Production-ready.

---

### Project 2: Origin Cloud IDE & Workspace Platform

* **Name**: Origin Cloud IDE & Workspace Platform
* **Purpose**: Provides a full desktop-grade cloud IDE environment with multi-file code editing, instant sandboxed viewport execution, cloud persistence, project management, and access-controlled link sharing.
* **Problem it Solves**: Removes the overhead of local IDE setup, web server configuration, and environment syncing by offering an instantly accessible browser workspace backed by cloud persistence.
* **Target Users**: Full-stack web developers, students building frontend prototypes, and teams needing quick shareable code sandboxes.
* **Main Features**:
  * **Monaco Editor Engine Integration**: Microsoft Monaco core ([`@monaco-editor/react`](file:///d:/Next_js/codeEditor/package.json#L13)) supporting HTML5, CSS3, and ES6 JavaScript with dark theme (`vs-dark`), line numbers, word wrap, and Fira Code typography.
  * **Real-Time Viewport Execution**: Dynamic `srcDoc` HTML generation with isolated iframe sandboxing (`sandbox="allow-scripts"`).
  * **5-Second Debounced Auto-Save Engine**: Background saving loop updating MongoDB documents via REST API endpoints.
  * **Dual-Key Nanoid Routing & Sharing**: Generates distinct 8-character `editCode` and `viewCode` keys per project ([`codeGenerator.js`](file:///d:/Next_js/codeEditor/src/utils/codeGenerator.js)).
  * **Role-Based Access Control (RBAC)**: Distinguishes between project owners, authenticated guest editors, and view-only visitors.
  * **User Dashboard**: Grid/List view modes, live search filter, date sorting, and confirmation modal deletion ([`dashboard.js`](file:///d:/Next_js/codeEditor/src/pages/dashboard.js)).
* **Technology Stack**: Next.js Pages Router & API Routes, Monaco Editor, Mongoose ORM, MongoDB Atlas, `nanoid`, `axios`, `bcryptjs`, `jsonwebtoken`.
* **Frontend**: Monaco Editor Wrapper ([`src/components/Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js)), Dashboard Page ([`src/pages/dashboard.js`](file:///d:/Next_js/codeEditor/src/pages/dashboard.js)), Shared Editor Page ([`src/pages/editor/[code].js`](file:///d:/Next_js/codeEditor/src/pages/editor/[code].js)).
* **Backend**: Serverless REST API endpoints ([`src/pages/api/projects/*`](file:///d:/Next_js/codeEditor/src/pages/api/projects/)).
* **Database**: MongoDB Atlas document database accessed via Mongoose schemas ([`User.js`](file:///d:/Next_js/codeEditor/src/models/User.js), [`Project.js`](file:///d:/Next_js/codeEditor/src/models/Project.js)).
* **External APIs**: None (Internal REST API).
* **Authentication**: NextAuth.js JWT session strategy with Credentials and Google OAuth providers ([`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js)).
* **Deployment**: Vercel Cloud Platform + MongoDB Atlas cluster.
* **Current Status**: Production-ready.

---

### Project 3: Origin AI Assistant & Code Generation Engine

* **Name**: Origin AI Assistant & Code Generation Engine
* **Purpose**: Serves as an intelligent contextual co-pilot within the IDE that answers programming questions and automatically generates runnable HTML/CSS/JS code blocks from natural language prompts.
* **Problem it Solves**: Eliminates developer context switching to external LLMs or documentation sites by offering instant code generation and debugging assistance directly inside the editor layout.
* **Target Users**: Coders seeking immediate algorithm help, automated UI component generation, or instant bug explanations.
* **Main Features**:
  * **Google Gemini 3.6 Flash Integration**: Powered by `@google/genai` SDK using `gemini-3-flash-preview` model ([`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js)).
  * **Contextual Guardrails & Keyword Classifier**: Built-in system instruction ([`CODING_SYSTEM_PROMPT`](file:///d:/Next_js/codeEditor/src/service/gemini.js#L11)) enforcing technical focus and redirecting off-topic queries.
  * **Intent Detection Regex Engine**: Utility function ([`isCodeGenerationRequest`](file:///d:/Next_js/codeEditor/src/service/gemini.js#L177)) that analyzes user input for action phrases (`create`, `build`, `generate`, `make`) to route requests between Q&A chat and multi-file code generation.
  * **Structured Multi-File Parser**: Extracts HTML, CSS, and JS code blocks from raw LLM responses using regular expression pattern matching.
  * **Interactive Code Generation Modal**: Slide-over modal ([`CodeGenerationModal.js`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js)) providing tabbed previews, full response markdown, new-window execution preview, and a single-click "Accept & Insert" pipeline directly populating Monaco state.
  * **Session Persistence**: Caches chat history in browser `sessionStorage` (`chatMessages` & `chatSessionId`).
* **Technology Stack**: `@google/genai` SDK, React 19, `react-markdown`, `react-icons`, Vanilla CSS Modules ([`CodeGenerationModal.module.css`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.module.css), [`chatbot.css`](file:///d:/Next_js/codeEditor/src/styles/chatbot.css)).
* **Frontend**: Slide-over Chat Interface ([`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js)), Topbar Trigger ([`AIChatButton.js`](file:///d:/Next_js/codeEditor/src/components/AIChatButton.js)), Code Insertion Modal ([`CodeGenerationModal.js`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js)).
* **Backend**: Client-side SDK calls executing direct HTTPS requests to Google Gemini REST endpoints.
* **Database**: None (Uses `sessionStorage` for transient session context).
* **External APIs**: Google Gemini API (`https://generativelanguage.googleapis.com`).
* **Authentication**: Requires an active NextAuth session; unauthenticated users clicking the AI button are prompted with the Sign-In modal.
* **Deployment**: Client-side SDK invocation packaged in Next.js bundle.
* **Current Status**: Production-ready.

---

### Cross-Project Technical Matrix

| Dimension / Feature | Project 1: Landing Portal | Project 2: Cloud IDE Platform | Project 3: AI Assistant Engine |
| :--- | :--- | :--- | :--- |
| **Primary Domain** | Marketing, Onboarding & Auth | Code Editing, Sandboxing & Storage | Code Generation & Conversational AI |
| **Frontend Stack** | Next.js Page, React 19, CSS Modules | Monaco Editor Engine, React 19, Axios | `react-markdown`, React 19, `react-icons` |
| **Backend Stack** | Next.js Page Renderer | Next.js Serverless API Routes | Google GenAI SDK Client Layer |
| **Database Integration** | None (Static/SSR) | MongoDB Atlas via Mongoose ORM | Browser `sessionStorage` |
| **Authentication Requirement** | Public (No Auth needed) | Mixed (Public Guest, Auth for Save/Dashboard) | Protected (Session required to trigger AI) |
| **External APIs** | Vercel Analytics, Google Tag Manager | MongoDB Atlas Driver | Google Gemini 3.6 Flash Preview API |
| **State Management** | React `useState`, Window resize handlers | Monaco Editor state, Auto-save timer, Modals | Chat history arrays, Generation modals |
| **Deployment Target** | Vercel Edge Serverless | Vercel Serverless API + MongoDB Atlas | Client Browser Engine via GenAI SDK |
| **Primary Output** | UI Pages & Auth Modals | Sandboxed Viewport & Persisted Documents | Multi-Language Code Blocks (HTML/CSS/JS) |

---

# 2. Repository & Folder Structure

```text
codeEditor/
├── .env.local                    # Environment configuration (DB URI, Secrets, AI Keys)
├── .gitignore                    # Version control exclusion rules
├── jsconfig.json                 # JavaScript compiler & path alias configuration
├── next.config.mjs               # Next.js framework build settings
├── package.json                  # Dependencies, scripts, and package metadata
├── package-lock.json             # Locked dependency tree
├── postcss.config.mjs            # PostCSS plugin settings (Tailwind CSS v4)
├── README.md                     # Technical Documentation Blueprint (This file)
├── public/                       # Static public assets
│   ├── favicon.ico               # Browser shortcut icon
│   ├── logo.png                  # Application brand logo asset
│   └── robots.txt                # Search engine crawler indexing directives
└── src/                          # Application source code root
    ├── components/               # React UI Components
    │   ├── AIChatButton.js       # Topbar AI trigger button with auth modal protection
    │   ├── AuthRequiredModal.js  # Lock screen modal enforcing sign-in for owner links
    │   ├── ChatBot.js            # Slide-over AI chat panel & message handler
    │   ├── CodeEditorPreview.js  # Landing page animated editor UI mockup
    │   ├── CodeGenerationModal.js# Tabbed modal previewing & inserting generated AI code
    │   ├── CodeGenerationModal.module.css # Styling for AI code modal
    │   ├── CreateProjectModal.js # Project creation modal with title/description inputs
    │   ├── FeatureCard.js        # Landing page feature card component
    │   ├── FloatingChatButton.js # Alternative floating trigger for AI Assistant
    │   ├── LoginModal.js         # Credentials & Google OAuth sign-in modal
    │   ├── SignupModal.js        # User registration modal with validation
    │   ├── Editor/               # Core Monaco Editor Module
    │   │   ├── Editor.module.css # Styles for workspace, tabs, topbar, and iframe viewport
    │   │   └── index.js          # Primary IDE workspace component containing Monaco setup
    │   └── ShareButton/          # Project Link Sharing Module
    │       ├── ShareButton.module.css # Styles for share modal & link type toggles
    │       └── index.js          # Share modal generating editCode/viewCode URLs
    ├── models/                   # Mongoose Database Models
    │   ├── Project.js            # Mongoose schema for code documents & share keys
    │   └── User.js               # Mongoose schema for accounts & password hashing
    ├── pages/                    # Next.js Page Routes & Serverless API Routes
    │   ├── _app.js               # Application wrapper configuring SessionProvider & Analytics
    │   ├── dashboard.js          # User dashboard page displaying project grid/list
    │   ├── index.js              # Public landing page with features & hero section
    │   ├── api/                  # Backend Serverless Endpoints
    │   │   ├── auth/             # Authentication Endpoints
    │   │   │   ├── [...nextauth].js # NextAuth handler for JWT, Credentials & OAuth
    │   │   │   └── register.js   # User registration endpoint with password hashing
    │   │   └── projects/         # Project Management Endpoints
    │   │       ├── [code].js     # Dynamic fetch endpoint resolving editCode or viewCode
    │   │       ├── create.js     # Endpoint creating new project records
    │   │       ├── delete.js     # Endpoint verifying ownership and deleting projects
    │   │       ├── update.js     # Endpoint executing debounced code & title updates
    │   │       └── user-projects.js # Endpoint retrieving authenticated user's projects
    │   └── editor/               # Dynamic IDE Route Group
    │       └── [code].js         # Route handler for /editor/[code] link resolution
    ├── service/                  # External Service SDK Wrappers
    │   └── gemini.js             # Google GenAI SDK wrapper & prompt classification logic
    ├── styles/                   # Global & Module CSS Files
    │   ├── Dashboard.module.css  # Layout & styling for the project dashboard
    │   ├── Home.module.css       # Layout & styling for landing page & hero section
    │   ├── Modal.module.css      # Reusable modal styles for auth & project dialogs
    │   ├── chatbot.css           # Styling for AI Assistant drawer & markdown blocks
    │   └── globals.css           # CSS design tokens, reset styles, and root variables
    └── utils/                    # Utility Helper Functions
        ├── codeGenerator.js      # Nanoid 8-character random code generator utility
        └── dbConnect.js          # Mongoose global connection caching helper
```

---

### Key Directory & File Roles

#### 1. Configuration & Utilities (`/`, [`src/utils`](file:///d:/Next_js/codeEditor/src/utils))
* [`dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js): Implements a global connection cache (`global.mongoose`) preventing database connection exhaustion during Next.js hot-reloading and serverless invocation spikes.
* [`codeGenerator.js`](file:///d:/Next_js/codeEditor/src/utils/codeGenerator.js): Uses `nanoid/customAlphabet` (`123456789abcdefghijklmnopqrstuvwxyz`, length 8) to generate unique `editCode` and `viewCode` strings.

#### 2. Models Layer ([`src/models`](file:///d:/Next_js/codeEditor/src/models))
* [`User.js`](file:///d:/Next_js/codeEditor/src/models/User.js): Mongoose schema defining user fields (`name`, `email`, `password`, `avatar`, `lastLogin`). Contains a pre-save hook executing `bcrypt.hash` with 10 salt rounds and an instance method `comparePassword`.
* [`Project.js`](file:///d:/Next_js/codeEditor/src/models/Project.js): Mongoose schema defining project fields (`editCode`, `viewCode`, `title`, `description`, `html`, `css`, `javascript`, `userId`, `isPublic`, `lastUpdated`). `userId` references `User` but remains optional for guest projects.

#### 3. Service Layer ([`src/service`](file:///d:/Next_js/codeEditor/src/service))
* [`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js): Wraps `@google/genai` GoogleGenAI class. Defines `CODING_SYSTEM_PROMPT`, message keyword classifier `isCodingRelated`, intent detector `isCodeGenerationRequest`, and method `generateCode` parsing Markdown fenced blocks (`html`, `css`, `js`).

#### 4. API Endpoints Layer ([`src/pages/api`](file:///d:/Next_js/codeEditor/src/pages/api))
* [`auth/[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js): Main NextAuth configuration. Uses `CredentialsProvider` and `GoogleProvider`. Handles `jwt`, `session`, and `signIn` callbacks to synchronize MongoDB ObjectIds into session state.
* [`projects/create.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/create.js): Reads title/description, invokes `generateProjectCodes()`, extracts user session via `getServerSession`, validates `ObjectId`, and saves document.
* [`projects/[code].js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/[code].js): Queries MongoDB using `$or: [{ editCode: code }, { viewCode: code }]` to fetch document metadata.
* [`projects/update.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/update.js): Executes `findOneAndUpdate` matching `editCode`. Conditionally updates `html`, `css`, `javascript`, `title`, and `description`.
* [`projects/delete.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/delete.js): Validates ownership by checking `session.user.id === project.userId` before invoking `findByIdAndDelete`.
* [`projects/user-projects.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/user-projects.js): Queries projects belonging to `session.user.id` sorted by `lastUpdated: -1`.

#### 5. Component Layer ([`src/components`](file:///d:/Next_js/codeEditor/src/components))
* [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js): Main IDE component wrapping `@monaco-editor/react`. Manages tabs (`html`, `css`, `js`), layout modes (`split`, `editor`, `preview`), topbar action buttons, iframe rendering, and 5-second debounced auto-saves.
* [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js): Slide-over drawer managing chat state, markdown rendering with custom code block copy buttons, and code generation triggers.

---

# 3. Architecture of Each Project

### High-Level System Architecture

```mermaid
flowchart TD
    User([User Browser]) <--> Frontend[Next.js 15 Frontend Engine]
    
    subgraph Frontend Sub-Systems
        P1[Landing & Marketing Portal]
        P2[Cloud IDE & Workspace Platform]
        P3[Origin AI Assistant Engine]
    end
    
    Frontend --> P1
    Frontend --> P2
    Frontend --> P3
    
    P2 <--> NextAuth[NextAuth.js Session Layer]
    P2 <--> API[Next.js Serverless API Routes]
    API <--> Mongoose[Mongoose ODM Cache Layer]
    Mongoose <--> MongoDB[(MongoDB Atlas Cloud DB)]
    
    P3 <--> GeminiAPI[Google Gemini 3.6 Flash API]
```

---

### Sub-System 1 Architecture: Origin Landing & Marketing Portal

```text
User Request (/)
       │
       ▼
Next.js Page Router (src/pages/index.js)
       │
       ├── Session Check (useSession Hook)
       │      ├── Authenticated: Render Dashboard link & User Profile
       │      └── Guest: Render Login / Signup trigger buttons
       │
       ├── Render Hero Section with CodeEditorPreview component
       ├── Render Features Grid (FeatureCard components)
       ├── Render Workflow Steps & About Section
       └── Event Handlers (Click "Start Coding")
              └── Triggers CreateProjectModal.js -> POST /api/projects/create
```

---

### Sub-System 2 Architecture: Origin Cloud IDE & Workspace Platform

```mermaid
flowchart TD
    subgraph Client Layer
        A[SharedEditor Component /editor/code] --> B[Fetch Project Metadata GET /api/projects/code]
        B --> C{Verify Code Type & Auth State}
        C -- editCode + Auth Owner --> D[Render CodeEditor readOnly=false]
        C -- editCode + Guest + Auth Required --> E[Trigger AuthRequiredModal readOnly=true]
        C -- viewCode --> F[Render CodeEditor readOnly=true]
    end
    
    subgraph Editor State & Workspace Layer
        D --> G[Monaco Editor Instance HTML/CSS/JS]
        G --> H[5-Sec Debounced Timeout / Manual Save Click]
        H --> I[POST /api/projects/update]
        G --> J[Dynamic Iframe Preview srcDoc Injection]
    end
    
    subgraph Backend Serverless Layer
        I --> K[dbConnect Mongoose Cache]
        K --> L[Project.findOneAndUpdate editCode]
        L --> M[(MongoDB Atlas)]
    end
```

---

### Sub-System 3 Architecture: Origin AI Assistant & Code Generation Engine

```mermaid
flowchart TD
    subgraph UI Layer
        A[AIChatButton / FloatingChatButton] -->|Check Session| B{Authenticated?}
        B -- No --> C[Open LoginModal]
        B -- Yes --> D[Toggle ChatBot Drawer]
        D --> E[User Submits Text Prompt]
    end
    
    subgraph Service & Intent Classification Layer
        E --> F[isCodeGenerationRequest prompt]
        F -- False: Q&A Prompt --> G[sendMessage chatSession]
        F -- True: Generation Prompt --> H[generateCode prompt]
        
        G --> I[GoogleGenAI.chats.create gemini-3-flash-preview]
        H --> J[GoogleGenAI.models.generateContent with Structured System Prompt]
    end
    
    subgraph Response Processing Layer
        I --> K[Render Markdown with Custom Copy Code Blocks]
        J --> L[Regex Parse Markdown ```html, ```css, ```javascript]
        L --> M[Populate Generated Code Object]
        M --> N[Open CodeGenerationModal]
        N -->|Click Accept & Insert| O[onCodeGenerated Callback in Editor/index.js]
        O --> P[Update HTML, CSS, JS State & Trigger saveProject]
    end
```

---

# 4. Complete Page & Screen Breakdown

### Page 1: Public Landing Page (`/`)

* **Purpose**: Primary marketing screen, value proposition showcase, guest project entry point, and authentication portal.
* **URL / Route**: `/` (Handled by [`src/pages/index.js`](file:///d:/Next_js/codeEditor/src/pages/index.js)).
* **Navigation Entry**: Direct browser navigation or clicking logo from any page.
* **Navigation Exits**:
  * Navigate to Dashboard (`/dashboard`) if logged in.
  * Navigate to Shared Editor (`/editor/[code]`) after project creation.
  * External navigation to GitHub repository.
* **Components Used**: [`CodeEditorPreview.js`](file:///d:/Next_js/codeEditor/src/components/CodeEditorPreview.js), [`FeatureCard.js`](file:///d:/Next_js/codeEditor/src/components/FeatureCard.js), [`LoginModal.js`](file:///d:/Next_js/codeEditor/src/components/LoginModal.js), [`SignupModal.js`](file:///d:/Next_js/codeEditor/src/components/SignupModal.js), [`CreateProjectModal.js`](file:///d:/Next_js/codeEditor/src/components/CreateProjectModal.js).
* **API Calls & Endpoints**:
  * `POST /api/projects/create` (via [`CreateProjectModal.js`](file:///d:/Next_js/codeEditor/src/components/CreateProjectModal.js)).
  * `POST /api/auth/register` (via [`SignupModal.js`](file:///d:/Next_js/codeEditor/src/components/SignupModal.js)).
  * `POST /api/auth/callback/credentials` & `POST /api/auth/callback/google` (via NextAuth).
* **State Used**:
  * `isMenuOpen` (boolean) — Toggles mobile menu drawer.
  * `isLoginModalOpen`, `isSignupModalOpen`, `isCreateModalOpen` (booleans) — Manages dialog overlays.
* **Context Used**: NextAuth `useSession()` supplying `session` and `status` (`authenticated`, `unauthenticated`, `loading`).
* **Authentication Requirements**: Public access.
* **Page Load Flow**:

```text
User navigates to /
       │
       ▼
NextAuth SessionProvider resolves session state
       │
       ▼
Index page renders header with auth check:
       ├── If authenticated: Display user avatar, name, Dashboard link, Log Out button
       └── If unauthenticated: Display Login and Sign Up action buttons
       │
       ▼
Hero section renders interactive mock editor (CodeEditorPreview)
       │
       ▼
Features & Workflow cards populate grid layout
```

---

### Page 2: Cloud User Dashboard (`/dashboard`)

* **Purpose**: Centralized dashboard for authenticated users to manage, search, sort, open, share, and delete their cloud projects.
* **URL / Route**: `/dashboard` (Handled by [`src/pages/dashboard.js`](file:///d:/Next_js/codeEditor/src/pages/dashboard.js)).
* **Navigation Entry**: Dashboard link in topbar header.
* **Navigation Exits**:
  * `/editor/[editCode]` — Opens selected project in editor mode.
  * `/` — Redirected if unauthenticated or on sign out.
* **Components Used**: [`CreateProjectModal.js`](file:///d:/Next_js/codeEditor/src/components/CreateProjectModal.js), `FiGrid`, `FiList`, `FiSearch`, `FiTrash2`, `FiShare2`, `FiCopy`, `FiLogOut`.
* **API Calls & Endpoints**:
  * `GET /api/projects/user-projects` — Fetches user's saved projects.
  * `DELETE /api/projects/delete?code=[editCode]` — Deletes project record.
  * `POST /api/projects/create` — Creates new project document.
* **State Used**:
  * `projects` (Array) — Stores project document objects.
  * `isProjectsLoading` (boolean) — Controls spinner state.
  * `searchTerm` (string) — Live search filter.
  * `viewMode` (`grid` | `list`) — Toggle display style.
  * `sortBy` (`lastUpdated` | `title` | `createdAt`), `sortDir` (`asc` | `desc`) — Sorting parameters.
  * `showDeleteModal`, `projectToDelete` — Deletion dialog state.
  * `showShareModal`, `selectedProject`, `shareType` — Sharing dialog state.
* **Authentication Requirements**: Strictly protected. Unauthenticated users are redirected to `/` via `useEffect` hook.
* **Page Load Flow**:

```text
User navigates to /dashboard
       │
       ▼
useEffect checks status === "authenticated"
       ├── If false: router.push("/")
       └── If true: Execute fetchProjects()
              │
              ▼
GET /api/projects/user-projects
       │
       ▼
Backend executes getServerSession & Mongoose query:
Project.find({ userId: session.user.id }).sort({ lastUpdated: -1 })
       │
       ▼
Returns JSON { projects: [...] }
       │
       ▼
State updated (setProjects), grid/list rendered with project cards
```

---

### Page 3: Interactive Workspace Editor (`/editor/[code]`)

* **Purpose**: Primary cloud IDE workspace providing Monaco code editing, dynamic iframe rendering, AI co-pilot integration, and link sharing.
* **URL / Route**: `/editor/[code]` (Handled by [`src/pages/editor/[code].js`](file:///d:/Next_js/codeEditor/src/pages/editor/[code].js)).
* **Navigation Entry**: Redirected from project creation modal, dashboard card click, or direct link navigation.
* **Navigation Exits**:
  * `/dashboard` — Navigates to user projects.
  * `/` — Navigates to home page.
  * `/editor/[viewCode]` — Redirected if owner auth modal is dismissed without logging in.
* **Components Used**: [`CodeEditor`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js), [`AuthRequiredModal`](file:///d:/Next_js/codeEditor/src/components/AuthRequiredModal.js), [`ShareButton`](file:///d:/Next_js/codeEditor/src/components/ShareButton/index.js), [`AIChatButton`](file:///d:/Next_js/codeEditor/src/components/AIChatButton.js), [`ChatBot`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js), [`CodeGenerationModal`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js).
* **API Calls & Endpoints**:
  * `GET /api/projects/[code]` — Loads project data.
  * `POST /api/projects/update` — Debounced and manual code updates.
* **State Used**:
  * `project` (Object) — Raw project document.
  * `isReadOnly` (boolean) — Toggles Monaco editor read-only mode.
  * `html`, `css`, `js` (strings) — Code editor buffer contents.
  * `layout` (`split` | `editor` | `preview`) — Viewport layout state.
  * `autoSaveEnabled` (boolean) — Auto-save toggle state.
  * `saveStatus` (string) — Display text ("Saving...", "Saved!", "Save failed").
* **Authentication Requirements**: Dynamic. View links (`viewCode`) and guest project edit links (`editCode` without `userId`) are public. User-owned project edit links (`editCode` with `userId`) require authentication matching `project.userId`.
* **Page Load Flow**:

```text
User navigates to /editor/[code]
       │
       ▼
Router extracts [code] dynamic parameter
       │
       ▼
Execute GET /api/projects/[code]
       │
       ▼
Backend queries: Project.findOne({ $or: [{ editCode: code }, { viewCode: code }] })
       │
       ▼
Client checks authorization rules:
  ├── Is code === editCode AND project.userId exists AND user is NOT logged in?
  │      └── Set needsAuth=true, showAuthModal=true, set isReadOnly=true
  ├── Is code === viewCode?
  │      └── Set isReadOnly=true
  └── Is code === editCode AND (project.userId matches session OR guest project)?
         └── Set isReadOnly=false
       │
       ▼
Monaco Editor mounts with initial HTML, CSS, JavaScript buffers
```

---

# 5. Complete Page Linking & Routing Map

### Route Classification Table

| Route | Type | Protected | Path Parameters | Query Parameters | Description / Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Public Page | No | None | None | Marketing Landing Page & Auth trigger hub |
| `/dashboard` | Protected Page | Yes | None | None | User project dashboard (Grid/List CRUD views) |
| `/editor/[code]` | Dynamic Page | Hybrid | `code` (Nanoid string) | None | Workspace editor supporting edit/view modes |
| `/api/auth/[...nextauth]` | API Route | No | NextAuth subroutes | None | Authentication callback, JWT & session route |
| `/api/auth/register` | API Route | No | None | None | User account registration endpoint |
| `/api/projects/create` | API Route | Optional | None | None | Project initialization endpoint |
| `/api/projects/[code]` | API Route | No | `code` (Nanoid string) | None | Project document resolution endpoint |
| `/api/projects/user-projects`| API Route | Yes | None | None | Retrieves projects belonging to active user |
| `/api/projects/update` | API Route | Hybrid | None | None | Updates project code and title/description |
| `/api/projects/delete` | API Route | Hybrid | None | `code` | Deletes project document from database |

---

### Navigation State Matrix

| Origin Page | Interaction / Trigger | Target Route | Condition / Requirement |
| :--- | :--- | :--- | :--- |
| `/` | Click "Start Coding" | Opens `CreateProjectModal` | None |
| `CreateProjectModal` | Submit Project Form | `/editor/[editCode]` | `POST /api/projects/create` succeeds |
| `/` | Click "Dashboard" | `/dashboard` | User must be authenticated (`status === 'authenticated'`) |
| `/` | Click "Login" / "Sign Up" | Modal Overlay | Opens `LoginModal` or `SignupModal` |
| `/dashboard` | Click Project Card | `/editor/[editCode]` | Opens workspace with project data |
| `/dashboard` | Click "New Project" | Opens `CreateProjectModal` | Creates project under user's account |
| `/editor/[code]` | Click "Home" Logo | `/` | Navigates to landing page |
| `/editor/[code]` | Click "Dashboard" | `/dashboard` | User must be authenticated |
| `/editor/[code]` | Close `AuthRequiredModal` | `/editor/[viewCode]` | Unauthenticated access to owned project |

---

### Mermaid Route Flowchart

```mermaid
flowchart LR
    Landing["Landing Page (/)"]
    LoginModal["LoginModal / SignupModal"]
    CreateModal["CreateProjectModal"]
    Dashboard["Dashboard (/dashboard)"]
    EditorEdit["Editor Workspace (/editor/editCode)"]
    EditorView["Editor Workspace (/editor/viewCode)"]
    AuthModal["AuthRequiredModal"]

    Landing -->|Click Login/Signup| LoginModal
    Landing -->|Click Start Coding| CreateModal
    Landing -->|Click Dashboard| Dashboard
    
    LoginModal -->|Success Auth| Dashboard
    CreateModal -->|API Response| EditorEdit
    
    Dashboard -->|Click Project Card| EditorEdit
    Dashboard -->|Click Share Link| EditorView
    
    EditorEdit -->|Unauthenticated + Owned| AuthModal
    AuthModal -->|Sign In Success| EditorEdit
    AuthModal -->|Dismiss / Continue Read-Only| EditorView
    
    EditorEdit -->|Click Home| Landing
    EditorEdit -->|Click Dashboard| Dashboard
```

---

# 6. Frontend Data Flow

Data movement across the frontend follows an explicit unidirectional reactive model:

```text
User Event (Keyboard Input / Button Click)
       │
       ▼
React Component Event Handler (e.g., onChange in Monaco, onClick in Modal)
       │
       ▼
Local Component State Update (setHtml, setCss, setJs, setSaveStatus)
       │
       ├── Reactive UI Re-render (Monaco Editor Buffer & Controls)
       ├── Dynamic Iframe Document Generation (generateOutput -> iframe srcDoc)
       │
       ▼
Debounced Side-Effect Hook (useEffect with 5000ms timer)
       │
       ▼
HTTP Client Layer (Axios POST request to /api/projects/update)
       │
       ▼
API Response Received (200 OK)
       │
       ▼
UI Feedback State Update (setSaveStatus("Saved!"))
```

#### State & Storage Breakdown:
1. **Monaco State**: Managed via React `useState` (`html`, `css`, `js`). Whenever code changes, the state updates and recalculates `iframe` contents via `srcDoc`.
2. **Session State**: Managed via NextAuth `useSession()`. Supplies user identity (`session.user.id`, `name`, `email`, `image`) across components.
3. **AI Chat Storage**: Managed via browser `sessionStorage`. Message histories are serialized under key `chatMessages` and session keys under `chatSessionId`, preserving chat context across page refreshes.

---

# 7. Backend Data Flow

Backend operations execute inside Next.js Node.js serverless environment handlers:

```text
HTTP Request (e.g., POST /api/projects/create)
       │
       ▼
Next.js API Route Handler (src/pages/api/projects/create.js)
       │
       ▼
Method Validation (Ensure req.method === "POST", else 405 Method Not Allowed)
       │
       ▼
Database Connection Layer (await dbConnect())
       │
       ▼
Session Authentication Check (await getServerSession(req, res, authOptions))
       │
       ▼
Business Logic & Code Generation (generateProjectCodes() -> editCode, viewCode)
       │
       ▼
MongoDB Mongoose Model Query (Project.create(projectData))
       │
       ▼
Database Query Resolution (MongoDB Atlas cluster returns inserted document)
       │
       ▼
HTTP JSON Response Formatting (res.status(201).json({ editCode, viewCode, title }))
```

---

### API Endpoints Table

| Method | Endpoint | Auth | Handler File | Controller / Logic | DB Operations | HTTP Status Codes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | No | [`register.js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/register.js) | Validates matching passwords & email uniqueness | `User.findOne`, `User.create` | `201` Created, `400` Bad Request, `500` Server Error |
| `POST` | `/api/auth/[...nextauth]`| No | [`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js) | Executes bcrypt password check & OAuth sync | `User.findOne`, `User.create` | `200` OK, `401` Unauthorized |
| `POST` | `/api/projects/create` | Optional| [`create.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/create.js) | Generates codes & binds `userId` if session active | `Project.create` | `201` Created, `500` Server Error |
| `GET` | `/api/projects/[code]` | No | [`[code].js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/[code].js) | Finds project by `editCode` or `viewCode` | `Project.findOne` | `200` OK, `404` Not Found, `500` Server Error |
| `GET` | `/api/projects/user-projects`| Yes | [`user-projects.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/user-projects.js) | Returns sorted array of projects for logged-in user | `Project.find` | `200` OK, `401` Unauthorized, `400` Invalid ID |
| `POST` | `/api/projects/update` | Hybrid | [`update.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/update.js) | Updates code buffers, title, description, timestamp | `Project.findOneAndUpdate` | `200` OK, `404` Not Found, `500` Server Error |
| `DELETE`| `/api/projects/delete` | Hybrid | [`delete.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/delete.js) | Verifies user ownership before document deletion | `Project.findByIdAndDelete`| `200` OK, `401` Unauthorized, `403` Forbidden |

---

# 8. Database Architecture

Origin IDE uses **MongoDB Atlas** document store managed via **Mongoose ORM**.

### User Collection Schema

* **Collection Name**: `users` (Defined in [`src/models/User.js`](file:///d:/Next_js/codeEditor/src/models/User.js))

| Field Name | Type | Constraints | Default | Purpose / Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto Primary Key | `auto()` | Unique user identifier |
| `name` | `String` | Required, Trim | None | User's full name |
| `email` | `String` | Required, Unique, Trim, Lowercase, Regex Match | None | Account email address |
| `password` | `String` | Required, MinLength(8), `select: false` | None | Bcrypt-hashed password string |
| `avatar` | `String` | Optional | `""` | User profile image URL |
| `createdAt` | `Date` | Required | `Date.now` | Account creation timestamp |
| `lastLogin` | `Date` | Optional | `null` | Timestamp of last authentication |

---

### Project Collection Schema

* **Collection Name**: `projects` (Defined in [`src/models/Project.js`](file:///d:/Next_js/codeEditor/src/models/Project.js))

| Field Name | Type | Constraints | Default | Purpose / Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto Primary Key | `auto()` | Unique project document identifier |
| `editCode` | `String` | Required, Unique, Indexed | Generated | Nanoid 8-char key for edit permission |
| `viewCode` | `String` | Required, Unique, Indexed | Generated | Nanoid 8-char key for read-only permission |
| `title` | `String` | Required | `"Untitled Project"` | Project title |
| `description`| `String` | Optional | `""` | Project description |
| `html` | `String` | Optional | `""` | Raw HTML source buffer |
| `css` | `String` | Optional | `""` | Raw CSS source buffer |
| `javascript` | `String` | Optional | `""` | Raw JavaScript source buffer |
| `userId` | `ObjectId` | Foreign Key (`ref: "User"`) | `null` | References owner user (`null` for guests) |
| `isPublic` | `Boolean` | Required | `true` | Public visibility flag |
| `createdAt` | `Date` | Required | `Date.now` | Creation timestamp |
| `lastUpdated` | `Date` | Required | `Date.now` | Timestamp of last modification |

---

### Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ PROJECT : "owns / creates"
    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string avatar
        date createdAt
        date lastLogin
    }
    PROJECT {
        ObjectId _id PK
        string editCode UK
        string viewCode UK
        string title
        string description
        string html
        string css
        string javascript
        ObjectId userId FK "Optional for Guest Projects"
        boolean isPublic
        date createdAt
        date lastUpdated
    }
```

---

### Data Lifecycle Management

```text
User Registration / Guest Session
       │
       ▼
Project Initialization (POST /api/projects/create)
       │
       ├── Generates editCode (e.g. "a8f3k9p2") & viewCode (e.g. "m7x1q4w9")
       ├── Binds userId if authenticated, else sets userId = null
       └── Saves document into MongoDBAtlas.projects
       │
       ▼
Active Workspace Iteration
       │
       ├── Auto-save / Manual Save updates html, css, javascript buffers
       └── Updates lastUpdated timestamp to Date.now()
       │
       ▼
Project Deletion (DELETE /api/projects/delete?code=a8f3k9p2)
       │
       ├── Verifies owner session matches document userId
       └── Removes document via Project.findByIdAndDelete()
```

---

# 9. Authentication & Authorization System

Authentication is built on **NextAuth.js** using the **JSON Web Token (JWT)** strategy.

### Session Management & Credentials Authentication

1. **Password Hashing**: Implemented in [`src/models/User.js`](file:///d:/Next_js/codeEditor/src/models/User.js). A `pre('save')` hook intercepts password modifications and hashes them using `bcryptjs` with 10 salt rounds:
   ```javascript
   UserSchema.pre("save", async function (next) {
       if (!this.isModified("password")) return next();
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next();
   });
   ```
2. **Authorize Mechanism**: When credentials are submitted to `signIn("credentials")`, NextAuth executes the `authorize` callback in [`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js#L16). It queries `User.findOne({ email }).select("+password")` and calls `user.comparePassword(credentials.password)`.
3. **Session Population**: The `jwt` callback attaches `user.id` to the token (`token.id = user.id`), and the `session` callback exposes it to the client via `session.user.id`.

---

### OAuth Sign-In Flow

When a user signs in via Google OAuth (`signIn("google")`), the `signIn` callback intercepts the profile:
1. Searches for an existing user record by `email`.
2. If absent, automatically provisions a new `User` document with a secure 32-character generated password and stores their Google avatar URL.
3. Mutates `user.id` to match MongoDB's `dbUser._id.toString()`, ensuring consistent database identity regardless of authentication provider.

---

### Dual-Key Nanoid Authorization Engine

Origin IDE enforces security using a dual-key routing mechanism:

```
                  +-----------------------------------+
                  |   Incoming Project Code (/editor) |
                  +-----------------+-----------------+
                                    |
                    +---------------+---------------+
                    |                               |
          Matches editCode                  Matches viewCode
                    |                               |
       +------------+------------+           +------+------+
       |                         |           | Read-Only   |
User-Owned Project        Guest Project      | Mode Forces |
(userId exists)         (userId == null)     | readOnly=   |
       |                         |           | true        |
Session check:                   |           +-------------+
user.id === userId?        Editable by Anyone
       |                         |
  +----+----+                    |
  |         |                    |
 Yes        No                   |
  |         |                    |
Editable Read-Only               |
(Saved)  Auth Modal              |
            |                    |
            +--------------------+
```

---

### Authentication Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User Browser
    participant F as Frontend Component
    participant NA as NextAuth Handler
    participant DB as MongoDB Atlas

    U->>F: Enter Email & Password into LoginModal
    F->>NA: signIn("credentials", { email, password })
    NA->>DB: User.findOne({ email }).select("+password")
    DB-->>NA: User Document
    NA->>NA: comparePassword(inputPassword, hashedPassword)
    alt Passwords Match
        NA->>DB: Update lastLogin timestamp
        NA-->>F: JWT Token Issued & Session Established
        F-->>U: Reload Page & Render Authenticated UI
    else Password Mismatch / User Not Found
        NA-->>F: Error: "Invalid email or password"
        F-->>U: Display Error Alert in Modal
    end
```

---

# 10. API & External Service Integrations

Origin IDE integrates with external services for AI code generation, web analytics, and cloud database persistence:

```mermaid
flowchart LR
    OriginApp[Origin IDE Application]
    
    OriginApp -->|Gemini GenAI SDK| Gemini[Google Gemini 3.6 Flash API]
    OriginApp -->|Mongoose Driver| MongoAtlas[(MongoDB Atlas Cloud DB)]
    OriginApp -->|React Component| VercelAnalytics[Vercel Analytics]
    OriginApp -->|Script Injection| GTM[Google Tag Manager G-G39KFP1LZ7]
    OriginApp -->|Script Injection| Umami[Umami Analytics]
```

1. **Google Gemini AI SDK (`@google/genai`)**:
   - **Endpoint**: `gemini-3-flash-preview`
   - **Purpose**: Generates context-aware coding responses and structured HTML/CSS/JS code snippets.
   - **Environment Variable**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Implementation**: Defined in [`src/service/gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js).
2. **MongoDB Atlas Cloud Database**:
   - **Purpose**: Cloud persistence for user accounts and project documents.
   - **Environment Variable**: `MONGODB_URI`
   - **Implementation**: Defined in [`src/utils/dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js).
3. **Vercel Analytics & Tag Management**:
   - **Purpose**: Tracks application performance, web vitals, and user engagement metrics.
   - **Implementation**: Embedded in [`src/pages/_app.js`](file:///d:/Next_js/codeEditor/src/pages/_app.js).

---

# 11. Component Architecture

### Component Hierarchy Tree

```text
src/pages/_app.js (SessionProvider, Analytics, Script)
 ├── src/pages/index.js (Home Landing Page)
 │    ├── CodeEditorPreview.js (Hero section mock editor)
 │    ├── FeatureCard.js (Features section grid items)
 │    ├── LoginModal.js (Credentials & Google Sign-In)
 │    ├── SignupModal.js (User registration dialog)
 │    └── CreateProjectModal.js (Project creation modal)
 │
 ├── src/pages/dashboard.js (User Projects Management Page)
 │    ├── CreateProjectModal.js (Project creation modal)
 │    └── Delete & Share Modals (Inline dialog overlays)
 │
 └── src/pages/editor/[code].js (Shared Editor Container)
      ├── AuthRequiredModal.js (Lock screen overlay for owner links)
      └── Editor/index.js (Main Workspace Component)
           ├── @monaco-editor/react (Code Editor Instance)
           ├── ShareButton/index.js (Link sharing modal trigger)
           └── AIChatButton.js (AI Drawer trigger button)
                ├── LoginModal.js & SignupModal.js (Auth guards)
                └── ChatBot.js (Slide-Over AI Chat Interface)
                     └── CodeGenerationModal.js (AI Code Preview & Insertion Modal)
```

---

### Core Component Specifications

#### 1. CodeEditor ([`src/components/Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js))
* **Props**: `initialData` (Object), `readOnly` (Boolean), `editCode` (String), `viewCode` (String).
* **State**: `activeTab` ("html" | "css" | "js"), `html`, `css`, `js`, `layout` ("split" | "editor" | "preview"), `autoSaveEnabled`, `saveStatus`, `isSaving`, `isOwner`.
* **Role**: Primary IDE workspace orchestrating Monaco Code Editor instances, tab switching, topbar layout toggles, auto-saving logic, iframe execution sandbox, and receiving generated AI code via callback (`handleCodeGenerated`).

#### 2. ChatBot ([`src/components/ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js))
* **Props**: `isOpen` (Boolean), `toggleChat` (Function), `onCodeGenerated` (Function).
* **State**: `messages` (Array), `input` (String), `isLoading` (Boolean), `chatSession` (Object), `generatedCode` (Object), `showCodeModal` (Boolean).
* **Role**: Slide-over drawer component maintaining chat state in `sessionStorage`, calling Gemini SDK functions ([`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js)), parsing code responses, rendering markdown blocks with copy-to-clipboard actions, and opening [`CodeGenerationModal`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js).

#### 3. ShareButton ([`src/components/ShareButton/index.js`](file:///d:/Next_js/codeEditor/src/components/ShareButton/index.js))
* **Props**: `editCode` (String), `viewCode` (String), `isGuest` (Boolean).
* **State**: `showModal` (Boolean), `activeLink` ("edit" | "view"), `showTooltip` (Boolean), `showLoginPrompt` (Boolean).
* **Role**: Constructs shareable URL links for edit and view modes. Enforces sign-in restrictions on editable link sharing for guest projects.

---

# 12. State Management Architecture

Origin IDE uses localized React component state, NextAuth session state, Monaco editor state, and browser storage:

```
+-----------------------------------------------------------------------------------+
|                               STATE ARCHITECTURE                                  |
+-------------------+--------------------+--------------------+---------------------+
| Global Auth State | React Component    | Monaco Editor State| Transient Storage   |
| (NextAuth)        | Local State        | (Monaco Instance)  | (Browser Storage)   |
+-------------------+--------------------+--------------------+---------------------+
| - session.user.id | - layout           | - html buffer      | - sessionStorage:   |
| - session.user.name| - activeTab       | - css buffer       |   chatMessages      |
| - status          | - isSaving         | - js buffer        |   chatSessionId     |
|                   | - searchTerm       | - cursor selection | - localStorage:     |
|                   | - modal booleans   | - undo/redo stack  |   none (clean state)|
+-------------------+--------------------+--------------------+---------------------+
```

---

# 13. End-to-End Feature Flows

### Flow 1: User Registration & Auto-Login

```text
User fills SignupModal (Name, Email, Password, Confirm Password)
       │
       ▼
Frontend validates: password === confirmPassword AND password.length >= 8
       │
       ▼
Axios POST /api/auth/register
       │
       ▼
Backend checks existing user (User.findOne({ email }))
       │
       ▼
User document created (User.create()) -> Trigger pre('save') bcrypt hashing
       │
       ▼
Backend returns 201 Created
       │
       ▼
Frontend automatically invokes signIn("credentials", { redirect: false, email, password })
       │
       ▼
NextAuth authenticates session and reloads client UI
```

---

### Flow 2: Authenticated Project Creation

```text
User clicks "New Project" in Dashboard or Landing Page
       │
       ▼
CreateProjectModal opens -> User enters Title & Description
       │
       ▼
User submits form -> Axios POST /api/projects/create
       │
       ▼
Backend executes:
  1. const { editCode, viewCode } = generateProjectCodes()
  2. session = await getServerSession(req, res, authOptions)
  3. Binds projectData.userId = session.user.id
  4. Project.create(projectData)
       │
       ▼
Backend responds with 201 Created { editCode, viewCode, title }
       │
       ▼
Frontend closes modal and invokes router.push("/editor/" + editCode)
```

---

### Flow 3: Code Editing & Auto-Save Pipeline

```text
User types new code inside Monaco Editor instance
       │
       ▼
Monaco onChange event fires -> setHtml(newValue) / setCss / setJs
       │
       ├── 1. Recalculates generateOutput() -> Updates iframe srcDoc instantly
       └── 2. Triggers useEffect hook with 5-second debounced timeout
              │
              ▼
5 Seconds of typing inactivity elapses
              │
              ▼
saveProject() executes -> setSaveStatus("Saving...")
              │
              ▼
Axios POST /api/projects/update { code: editCode, html, css, javascript }
              │
              ▼
Backend executes Project.findOneAndUpdate({ editCode }, updateData)
              │
              ▼
Backend responds 200 OK -> Frontend sets setSaveStatus("Saved!") for 2 seconds
```

---

### Flow 4: Dual-Access Shareable URL Generation & Access Control

```text
User clicks "Share" button in IDE topbar
       │
       ▼
ShareButton component checks active session and isGuest flag
       │
       ├── User selects "View Only": Construct URL /editor/[viewCode] -> Copy to clipboard
       └── User selects "Edit Access":
              ├── If Guest/Unauthenticated: Display lock prompt "Sign in required"
              └── If Authenticated Owner: Construct URL /editor/[editCode] -> Copy to clipboard
       │
       ▼
Recipient opens shared URL /editor/[code]
       │
       ▼
[code].js page executes GET /api/projects/[code]
       │
       ├── Recipient navigated with viewCode -> Render CodeEditor readOnly=true
       └── Recipient navigated with editCode -> Check project.userId vs recipient session:
              ├── Match OR Guest project -> Render CodeEditor readOnly=false
              └── Mismatch & Owned project -> Open AuthRequiredModal & default readOnly=true
```

---

### Flow 5: AI Code Generation & IDE State Insertion

```text
User opens AI ChatBot drawer and submits prompt: "Build a responsive contact form"
       │
       ▼
ChatBot intercepts input -> isCodeGenerationRequest(userMessage) evaluates to TRUE
       │
       ▼
ChatBot calls generateCode(userMessage) in gemini.js
       │
       ▼
Gemini API (gemini-3-flash-preview) executes prompt with multi-block markdown rules
       │
       ▼
gemini.js receives raw text and parses ```html, ```css, ```javascript blocks via regex
       │
       ▼
Returns structured code object { html: "...", css: "...", js: "..." }
       │
       ▼
ChatBot sets generatedCode state and opens CodeGenerationModal
       │
       ▼
CodeGenerationModal renders tabbed HTML/CSS/JS preview and "Preview in new window"
       │
       ▼
User clicks "Accept & Insert" button
       │
       ▼
Modal invokes handleAcceptCode -> Invokes onCodeGenerated callback in Editor/index.js
       │
       ▼
Editor updates state: setHtml(genHtml), setCss(genCss), setJs(genJs)
       │
       ▼
IDE updates Monaco editor buffers, re-renders iframe, and triggers saveProject()
```

---

# 14. Mermaid Sequence Diagrams

### Sequence Diagram 1: User Login & Session Establishment

```mermaid
sequenceDiagram
    actor User
    participant Component as LoginModal.js
    participant NextAuth as NextAuth [...nextauth].js
    participant Mongoose as dbConnect / User.js
    participant DB as MongoDB Atlas

    User->>Component: Input Email & Password, click "Log In"
    Component->>NextAuth: signIn("credentials", { email, password })
    NextAuth->>Mongoose: await dbConnect()
    NextAuth->>DB: User.findOne({ email }).select("+password")
    DB-->>NextAuth: Document (with hashed password)
    NextAuth->>Mongoose: user.comparePassword(password)
    Mongoose-->>NextAuth: Comparison Result (true/false)
    alt Valid Credentials
        NextAuth->>DB: Update lastLogin = new Date()
        NextAuth-->>Component: { error: null }
        Component->>User: Reload page, populate SessionContext
    else Invalid Credentials
        NextAuth-->>Component: { error: "Invalid email or password" }
        Component->>User: Display error message
    end
```

---

### Sequence Diagram 2: Code Auto-Save Lifecycle

```mermaid
sequenceDiagram
    actor Developer
    participant Monaco as Monaco Editor
    participant EditorComp as Editor/index.js
    participant API as /api/projects/update
    participant DB as MongoDB Atlas

    Developer->>Monaco: Type code characters
    Monaco->>EditorComp: onChange event fires
    EditorComp->>EditorComp: Update local state (setHtml / setCss / setJs)
    EditorComp->>EditorComp: Start 5000ms debounce timer
    Note over Developer, EditorComp: Developer pauses typing for 5 seconds
    EditorComp->>API: POST { code: editCode, html, css, javascript }
    API->>DB: Project.findOneAndUpdate({ editCode }, updateData)
    DB-->>API: Updated Document
    API-->>EditorComp: 200 OK { message: "Project updated successfully" }
    EditorComp->>Developer: Display "Saved!" toast indicator
```

---

### Sequence Diagram 3: AI Assistant Code Generation & Insertion

```mermaid
sequenceDiagram
    actor Developer
    participant ChatBot as ChatBot.js
    participant Gemini as gemini.js Service
    participant GoogleAPI as Google Gemini API
    participant GenModal as CodeGenerationModal.js
    participant Editor as Editor/index.js

    Developer->>ChatBot: Submit prompt "Create a calculator app"
    ChatBot->>Gemini: generateCode(prompt)
    Gemini->>GoogleAPI: generateContent(enhancedPrompt)
    GoogleAPI-->>Gemini: Raw LLM markdown response
    Gemini->>Gemini: Regex match ```html, ```css, ```javascript
    Gemini-->>ChatBot: Return { html, css, js }
    ChatBot->>GenModal: Open Modal with generated code
    GenModal->>Developer: Display tabbed code preview & "Accept" button
    Developer->>GenModal: Click "Accept & Insert"
    GenModal->>Editor: Execute onCodeGenerated({ html, css, js })
    Editor->>Editor: Update state setHtml, setCss, setJs
    Editor->>API: Trigger saveProject()
    Editor->>Developer: Display updated code in Monaco & live iframe
```

---

# 15. Error Handling & Resiliency

Origin IDE implements error handling across database connections, authentication providers, REST API endpoints, and LLM SDK calls:

```
+-----------------------------------------------------------------------------------+
|                             ERROR HANDLING RESILIENCY                             |
+-------------------+--------------------+--------------------+---------------------+
| Database Layer    | API Route Layer    | Authentication Layer| AI Service Layer   |
+-------------------+--------------------+--------------------+---------------------+
| - Global connection| - Method verification| - User.findOne    | - try/catch wrappers|
|   caching to      |   check (405)      |   password protection| - Off-topic keyword|
|   prevent leak    | - ObjectId validation| - Catch OAuth sign-in|   classifier       |
| - Try/Catch wrap  | - Structured JSON  |   errors & return   | - Graceful error   |
|   on queries      |   error responses  |   false             |   messages in UI   |
+-------------------+--------------------+--------------------+---------------------+
```

1. **Database Resilience**: [`src/utils/dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js) uses global caching (`global.mongoose`). If a connection exists, it returns immediately rather than opening new sockets.
2. **API Endpoint Error Safeguards**: API handlers wrap logic in `try/catch` blocks. In case of unexpected server errors, handlers log errors via `console.error` and return `res.status(500).json({ message: "..." })`.
3. **Invalid User ID Safeguards**: In [`src/pages/api/projects/create.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/create.js#L34), `mongoose.Types.ObjectId.isValid(session.user.id)` verifies session user IDs before database binding. If an invalid ID is detected, the project defaults to a guest project rather than failing.
4. **AI Generation Resiliency**: If Gemini API returns an error or fails network calls, [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js#L136) catches the error and appends a user-friendly bot message: `"Sorry, I encountered an error while generating code. Please try again."`

---

# 16. Validation & Data Integrity

Origin IDE enforces data integrity across all layers:

1. **Client-Side Form Validation**:
   - [`SignupModal.js`](file:///d:/Next_js/codeEditor/src/components/SignupModal.js#L39): Verifies password match (`password === confirmPassword`) and minimum length (`minLength="8"`).
   - [`LoginModal.js`](file:///d:/Next_js/codeEditor/src/components/LoginModal.js): Checks for required email and password fields.
2. **Database Schema Constraints**:
   - [`User.js`](file:///d:/Next_js/codeEditor/src/models/User.js): Enforces email regex format (`/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/`), string trimming, unique email indexes, and a minimum password length of 8 characters.
   - [`Project.js`](file:///d:/Next_js/codeEditor/src/models/Project.js): Enforces unique indexes on `editCode` and `viewCode`.
3. **API Input Validation**:
   - [`src/pages/api/auth/register.js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/register.js#L15): Re-validates required fields, matching passwords, and minimum password lengths on the backend.

---

# 17. Security Model & Audit

### Implemented Security Controls

* **Password Security**: Passwords are hashed using `bcryptjs` with 10 salt rounds before database persistence. Passwords use `select: false` in the schema to prevent accidental leaks in database queries.
* **Token Security**: NextAuth uses encrypted JWT tokens stored in HTTP-only cookies, mitigating XSS session theft.
* **Preview Viewport Isolation**: The live preview iframe in [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js#L331) uses explicit sandboxing (`sandbox="allow-scripts"`). This isolates executed user code from the top-level IDE window context and cookies.
* **Delete & Update Protection**: [`delete.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/delete.js#L36) verifies that `session.user.id === project.userId.toString()`, returning `403 Forbidden` if an unauthorized user attempts to delete a project.

---

### Security Gaps & Vulnerabilities

> [!WARNING]
> **API Key Exposure in Client Bundle**:  
> In [`src/service/gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js#L3), the Gemini API key is referenced as `process.env.NEXT_PUBLIC_GEMINI_API_KEY`. The `NEXT_PUBLIC_` prefix embeds this secret directly into the publicly accessible browser JavaScript bundle.  
> *Recommended Fix*: Proxy Gemini requests through a serverless API route (`/api/ai/chat`) so the key stays hidden on the server.

> [!WARNING]
> **Unprotected Project Update Endpoint**:  
> [`src/pages/api/projects/update.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/update.js) allows anyone possessing an `editCode` to update a project's HTML/CSS/JS without validating user session ownership. While intentional for shareable collaboration, any public viewer who discovers an `editCode` can overwrite code contents.  
> *Recommended Fix*: Verify `session.user.id === project.userId` for user-owned projects before permitting updates.

---

# 18. Environment Variable Configuration

Create a `.env.local` file in the root directory:

| Variable Name | Purpose / Description | Scope | Required | Example / Format |
| :--- | :--- | :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas cluster connection string | Server-side | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/code-editor` |
| `NEXTAUTH_URL` | Canonical URL of application | Server-side | Yes | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret key used to encrypt NextAuth JWT tokens | Server-side | Yes | `63d8f9a2b1c4e7f0...` (32+ chars) |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key for AI assistant | Client-side | Yes | `AIzaSyB...` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Google Cloud Console | Server-side | Optional | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret from Google Cloud Console | Server-side | Optional | `GOCSPX-...` |

> [!CAUTION]
> Never commit `.env.local` to version control. Confirm `.env.local` is listed in `.gitignore`.

---

# 19. Dependencies & Package Analysis

Package breakdown from [`package.json`](file:///d:/Next_js/codeEditor/package.json):

```text
Dependencies Analysis:
├── Core Framework:
│   ├── next (15.2.8): React framework providing Pages Router, SSR, and API routes.
│   ├── react (^19.0.0) & react-dom (^19.0.0): UI render engines.
├── Code Editor Engine:
│   └── @monaco-editor/react (^4.7.0): Monaco Editor wrapper for React.
├── AI Engine:
│   └── @google/genai (^1.37.0): Official SDK for Google Gemini models.
├── Database & Auth:
│   ├── mongodb (^6.15.0) & mongoose (^8.12.1): MongoDB driver and ODM.
│   ├── next-auth (^4.24.11): Authentication framework.
│   ├── bcryptjs (^3.0.2): Password hashing library.
│   └── jsonwebtoken (^9.0.2): JWT utility.
├── Utilities & UI Components:
│   ├── axios (^1.8.3): Promise-based HTTP client.
│   ├── nanoid (^5.1.5): Unique ID generator.
│   ├── react-icons (^5.5.0): Icon library.
│   ├── react-markdown (^9.1.0): Markdown parsing component.
│   └── @vercel/analytics (^1.5.0): Performance tracking library.
```

---

# 20. Build, Local Execution & Deployment

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: Active MongoDB Atlas cluster connection string

---

### Step-by-Step Local Setup

1. **Clone the Repository & Install Dependencies**:
   ```bash
   git clone https://github.com/origin-ide/origin-ide.git
   cd origin-ide
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/code-editor?retryWrites=true&w=majority
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_32_character_secret_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key_here
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000).

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run start
   ```

---

### Production Deployment (Vercel)

1. Import the repository into the Vercel Dashboard.
2. Set Environment Variables in Project Settings (`MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_GEMINI_API_KEY`).
3. Deploy. Vercel automatically detects Next.js build scripts.

---

# 21. Testing Infrastructure

### Current Testing Audit
* **Framework**: No unit or integration test runner (Jest, Vitest, Cypress, Playwright) is currently configured in [`package.json`](file:///d:/Next_js/codeEditor/package.json).
* **Linting**: ESLint configured with `next lint` script using `eslint-config-next` (`15.2.3`).

---

### Recommended Testing Implementation

1. **Unit Testing**: Add `vitest` and `@testing-library/react` to test API helpers ([`codeGenerator.js`](file:///d:/Next_js/codeEditor/src/utils/codeGenerator.js), [`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js)).
2. **Integration Testing**: Implement `supertest` to test API routes ([`/api/projects/create`](file:///d:/Next_js/codeEditor/src/pages/api/projects/create.js), [`/api/auth/register`](file:///d:/Next_js/codeEditor/src/pages/api/auth/register.js)).
3. **End-to-End Testing**: Integrate Playwright to automate code editing, iframe execution, and link sharing flows.

---

# 22. Performance Analysis & Optimization

1. **Connection Pooling Cache**: [`src/utils/dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js) uses global caching (`global.mongoose`) to reuse database socket connections across hot API reloads, preventing connection limit exhaustion.
2. **Debounced Auto-Save Engine**: Code edits in [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js#L43) use a 5-second `setTimeout` debounce loop. This limits network calls during rapid typing.
3. **Optimized DB Projections**: User queries during authentication ([`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js#L20)) explicitly use `.select("+password")` so password hashes are excluded from all other user queries by default (`select: false`).
4. **Sandboxed Viewport Rendering**: Preview iframe updates use the local `srcDoc` attribute without issuing additional HTTP network requests.

---

# 23. Architectural Decisions & Trade-Offs

#### Decision 1: Next.js Pages Router over App Router
* **Context**: Next.js 15 supports both App Router and Pages Router.
* **Trade-Off**: The project uses Pages Router (`src/pages/*`). While App Router offers Server Components, Pages Router simplifies NextAuth v4 integration and page-level dynamic client routing (`/editor/[code]`).

#### Decision 2: Dual Nanoid Keys (`editCode` / `viewCode`) over RBAC Tables
* **Context**: Project authorization model needed a lightweight way to share view vs. edit links.
* **Trade-Off**: Using two distinct Nanoid keys stored directly on the `Project` document eliminates the need for separate permission tables, enabling instant link-based sharing.

#### Decision 3: Client-Side Gemini SDK over Proxy Server
* **Context**: `@google/genai` is invoked directly from the frontend ([`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js)).
* **Trade-Off**: Reduces backend serverless workload and response latency, but requires exposing `NEXT_PUBLIC_GEMINI_API_KEY` to client bundles.

---

# 24. Complete End-to-End Execution Trace

```text
1. User enters URL: /editor/a8f3k9p2
   │
   ▼
2. SharedEditor component mounts (src/pages/editor/[code].js)
   │
   ▼
3. useEffect hook triggers fetchProject() -> Axios GET /api/projects/a8f3k9p2
   │
   ▼
4. Serverless API handler executes (src/pages/api/projects/[code].js)
   │
   ▼
5. Handler calls dbConnect() -> Returns cached Mongoose connection
   │
   ▼
6. Query executes: Project.findOne({ $or: [{ editCode: "a8f3k9p2" }, { viewCode: "a8f3k9p2" }] })
   │
   ▼
7. Database returns Project document -> API responds with 200 OK JSON payload
   │
   ▼
8. Client compares codes: code ("a8f3k9p2") === projectData.editCode
   │
   ▼
9. Check auth: projectData.userId exists AND user session matches -> set isReadOnly = false
   │
   ▼
10. Render CodeEditor component (src/components/Editor/index.js)
   │
   ▼
11. Monaco Editor instances initialize with initialData.html, initialData.css, initialData.javascript
   │
   ▼
12. Component computes generateOutput() -> Injects generated HTML into preview iframe srcDoc
   │
   ▼
13. User modifies code -> State updates -> 5-sec debounce timer triggers Axios POST /api/projects/update
   │
   ▼
14. Database document updated with new source code & lastUpdated timestamp
```

---

# 25. How Everything Connects

| Source File | Export / Symbol | Consumed By File | Functional Purpose |
| :--- | :--- | :--- | :--- |
| [`dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js) | `default dbConnect` | All API routes (`/api/*`) | Caches & supplies Mongoose database connection |
| [`codeGenerator.js`](file:///d:/Next_js/codeEditor/src/utils/codeGenerator.js) | `generateProjectCodes` | [`projects/create.js`](file:///d:/Next_js/codeEditor/src/pages/api/projects/create.js) | Generates `editCode` and `viewCode` Nanoid strings |
| [`User.js`](file:///d:/Next_js/codeEditor/src/models/User.js) | `default User` | NextAuth & [`register.js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/register.js) | Account schema modeling, hashing, & authentication |
| [`Project.js`](file:///d:/Next_js/codeEditor/src/models/Project.js) | `default Project` | All project API routes | Project document schema modeling & persistence |
| [`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js) | `generateCode`, `sendMessage`| [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js) | Integrates Google Gemini API & parses code blocks |
| [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js)| `default CodeEditor` | [`editor/[code].js`](file:///d:/Next_js/codeEditor/src/pages/editor/[code].js) | Main Monaco IDE interface component |
| [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js) | `default ChatBot` | [`AIChatButton.js`](file:///d:/Next_js/codeEditor/src/components/AIChatButton.js) | AI Assistant conversational slide-over drawer |
| [`CodeGenerationModal.js`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js)| `default CodeGenerationModal`| [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js) | Modal previewing and inserting AI generated code |

---

# 26. File-to-File Dependency Map

```text
App Wrapper (src/pages/_app.js)
 │
 ├── Landing Page (src/pages/index.js)
 │    ├── CodeEditorPreview (src/components/CodeEditorPreview.js)
 │    ├── FeatureCard (src/components/FeatureCard.js)
 │    ├── LoginModal (src/components/LoginModal.js)
 │    │    └── NextAuth Client (next-auth/react -> signIn)
 │    ├── SignupModal (src/components/SignupModal.js)
 │    │    └── Axios -> POST /api/auth/register
 │    └── CreateProjectModal (src/components/CreateProjectModal.js)
 │         └── Axios -> POST /api/projects/create
 │
 ├── Dashboard (src/pages/dashboard.js)
 │    ├── Axios -> GET /api/projects/user-projects
 │    ├── Axios -> DELETE /api/projects/delete
 │    └── CreateProjectModal (src/components/CreateProjectModal.js)
 │
 └── Shared Editor Route (src/pages/editor/[code].js)
      ├── Axios -> GET /api/projects/[code]
      ├── AuthRequiredModal (src/components/AuthRequiredModal.js)
      └── Editor Component (src/components/Editor/index.js)
           ├── Monaco Editor (@monaco-editor/react)
           ├── ShareButton (src/components/ShareButton/index.js)
           └── AIChatButton (src/components/AIChatButton.js)
                └── ChatBot (src/components/ChatBot.js)
                     ├── Gemini SDK Service (src/service/gemini.js)
                     │    └── @google/genai SDK
                     └── CodeGenerationModal (src/components/CodeGenerationModal.js)
```

---

# 27. Interview-Ready Technical Explanations

### 30-Second Pitch

> "Origin IDE is a full-stack, cloud-based Integrated Development Environment built with Next.js, Monaco Editor, MongoDB, and Google Gemini AI. It enables developers to instantly author HTML, CSS, and JavaScript with live iframe preview rendering, automated 5-second debounced cloud persistence, dual-permission Nanoid link sharing, and an integrated AI assistant capable of streaming conversational debugging help and generating insertable multi-file code snippets from natural language prompts."

---

### 2-Minute Technical Summary

> "Origin IDE solves the friction of local workspace setup by delivering a browser-based IDE powered by Microsoft's Monaco Editor core. 
> 
> Architecturally, it uses Next.js 15 Pages Router and serverless API routes connected to a MongoDB Atlas cluster via Mongoose ODM. Database performance is optimized through a custom global connection caching pattern (`dbConnect.js`) to prevent socket exhaustion during serverless cold starts. 
> 
> Security and session management rely on NextAuth.js JWT tokens paired with bcrypt password hashing. Project authorization uses a dual-key routing mechanism: each project generates distinct 8-character Nanoid `editCode` and `viewCode` keys, enabling link sharing without user management overhead. 
> 
> On the frontend, code edits trigger dynamic iframe rendering using sandboxed `srcDoc` execution (`sandbox="allow-scripts"`). The editor integrates an AI assistant powered by Google's `@google/genai` SDK using `gemini-3-flash-preview`. The AI subsystem classifies intent using regex patterns to differentiate between technical Q&A and multi-file code generation. Generated code can be previewed in tabbed views or a standalone window before being inserted directly into the Monaco editor buffers."

---

### Deep Technical Q&A (12 Interview Scenarios)

#### Q1: Why did you choose Next.js Pages Router instead of App Router?
* **Answer**: Pages Router was selected to leverage stable NextAuth.js v4 session handling and simplify dynamic parameter routing (`/editor/[code]`). It cleanly separates client-heavy pages (like Monaco Editor) from serverless backend handlers (`/api/*`).

#### Q2: How does the application prevent database connection leaks in a serverless environment?
* **Answer**: We implemented a global connection caching pattern in [`src/utils/dbConnect.js`](file:///d:/Next_js/codeEditor/src/utils/dbConnect.js). In serverless environments, functions spin up and shut down rapidly, which can overwhelm database connection limits. By caching `global.mongoose = { conn, promise }`, subsequent API calls reuse the existing database connection rather than opening new sockets.

#### Q3: Explain how the 5-second debounced auto-save mechanism works under the hood.
* **Answer**: In [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js#L43), a `useEffect` hook listens to state updates across `html`, `css`, `js`, `projectTitle`, and `projectDescription`. Each keystroke clears the previous timer (`clearTimeout(timer)`) and starts a new 5000ms timer. `saveProject()` only executes after 5 seconds of typing inactivity, sending an Axios `POST` request to `/api/projects/update`.

#### Q4: How is link sharing authorized without complex user permission tables?
* **Answer**: When a project is created, [`codeGenerator.js`](file:///d:/Next_js/codeEditor/src/utils/codeGenerator.js) generates two distinct 8-character Nanoid keys: `editCode` and `viewCode`. When a user opens `/editor/[code]`, [`[code].js`](file:///d:/Next_js/codeEditor/src/pages/editor/[code].js) checks if `code === projectData.viewCode`. If true, `isReadOnly` is set to `true`. If `code === projectData.editCode`, it checks ownership: if the project has an owner (`userId`), the user must be authenticated as the owner; otherwise, [`AuthRequiredModal`](file:///d:/Next_js/codeEditor/src/components/AuthRequiredModal.js) prompts sign-in.

#### Q5: How is user code isolated in the live preview window to prevent security exploits?
* **Answer**: The live viewport in [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js#L331) uses an `<iframe>` with an explicit `sandbox="allow-scripts"` attribute. This allows user JavaScript to run while isolating execution from the parent IDE document context, preventing malicious code from accessing top-level window cookies or local storage.

#### Q6: How does the AI Assistant differentiate between regular Q&A and code generation requests?
* **Answer**: In [`gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js#L177), `isCodeGenerationRequest()` scans user prompts for intent keywords like `"create"`, `"generate"`, `"build"`, or `"make"`. If matched, [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js) calls `generateCode()`, which instructs Gemini to return code formatted into fenced ```html, ```css, and ```javascript blocks, parsed via regular expressions.

#### Q7: How does generated code get inserted into Monaco Editor state?
* **Answer**: When a user accepts generated code in [`CodeGenerationModal.js`](file:///d:/Next_js/codeEditor/src/components/CodeGenerationModal.js), it triggers the `onAccept(generatedCode)` callback. This passes the parsed `{ html, css, js }` object up to `handleCodeGenerated` in [`Editor/index.js`](file:///d:/Next_js/codeEditor/src/components/Editor/index.js#L163), updating the React state buffers (`setHtml`, `setCss`, `setJs`) and triggering an immediate save.

#### Q8: How does NextAuth handle user identity across OAuth and Credentials providers?
* **Answer**: In [`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js#L66), the `signIn` callback intercepts Google OAuth profiles. If a user signs in with Google, it checks MongoDB for an existing user document by email. If found, it updates `user.id = dbUser._id.toString()`; if not found, it provisions a new `User` document. This ensures `session.user.id` always references a valid MongoDB `ObjectId`.

#### Q9: What happens when an unauthenticated user tries to edit a protected project?
* **Answer**: When an unauthenticated user accesses `/editor/[editCode]` for an owned project, [`[code].js`](file:///d:/Next_js/codeEditor/src/pages/editor/[code].js#L35) sets `needsAuth = true`, sets `isReadOnly = true`, and opens [`AuthRequiredModal`](file:///d:/Next_js/codeEditor/src/components/AuthRequiredModal.js). The user can sign in, register, or choose "Continue in Read-Only Mode", which redirects them to `/editor/[viewCode]`.

#### Q10: How is state preserved across page refreshes in the AI Chat Assistant?
* **Answer**: [`ChatBot.js`](file:///d:/Next_js/codeEditor/src/components/ChatBot.js#L24) syncs message history to browser `sessionStorage` under the key `chatMessages` and stores the active session ID under `chatSessionId`. On component mount, it restores previous messages from `sessionStorage`, maintaining chat context across page reloads.

#### Q11: How would you scale this architecture to support 100x user growth?
* **Answer**: 
  1. Move Gemini API requests from client-side SDK calls to a serverless backend proxy with redis-based rate limiting (`@upstash/ratelimit`).
  2. Implement WebSocket infrastructure (`Socket.io` or Yjs CRDTs) to replace periodic HTTP auto-save polling with real-time multi-user collaborative editing.
  3. Introduce Redis caching (`ioredis`) for project GET queries (`/api/projects/[code]`) to reduce database read load on MongoDB Atlas.

#### Q12: What security vulnerability exists in the current AI integration, and how would you fix it?
* **Answer**: The Gemini API key is currently exposed in client JavaScript bundles via `process.env.NEXT_PUBLIC_GEMINI_API_KEY` in [`src/service/gemini.js`](file:///d:/Next_js/codeEditor/src/service/gemini.js#L3). To fix this, relocate LLM calls to a protected Next.js API route (`/api/ai/generate`), store the API key as a server-side environment variable (`GEMINI_API_KEY`), and enforce session authentication on the endpoint.

---

# 28. Strengths, Technical Debt & Scalability Roadmap

### Current Strengths

* **Desktop-Grade Editing Experience**: Integration of Microsoft Monaco Editor with dark mode theme (`vs-dark`), customizable tab views, line numbers, and Fira Code typography.
* **Dual-Key Access Control**: Nanoid-powered `editCode` and `viewCode` system provides lightweight sharing without authentication friction.
* **Clean Code Structure**: Clear separation between components, pages, Mongoose schemas, utilities, and service SDK wrappers.
* **Context-Aware AI Assistant**: Intent classification and structured regex parsing convert natural language prompts into multi-file code snippets.

---

### Technical Debt & Codebase Issues

1. **Client-Exposed Secrets**: `NEXT_PUBLIC_GEMINI_API_KEY` is exposed in client-side JavaScript bundles.
2. **Missing Ownership Verification on Project Update**: `POST /api/projects/update` accepts code updates matching `editCode` without verifying if `session.user.id === project.userId`.
3. **Absence of Test Suite**: The codebase lacks automated unit, integration, or end-to-end test runners.
4. **Console Log Statements in Production**: Backend routes contain debugging `console.log` statements ([`[...nextauth].js`](file:///d:/Next_js/codeEditor/src/pages/api/auth/[...nextauth].js#L54)).

---

### Security & Performance Roadmap

* **Move AI Calls to Server Proxy**: Refactor Gemini SDK calls to run inside a protected API route (`/api/ai/generate`).
* **Enforce Owner Update Guard**: Add session checks to `/api/projects/update` for owned projects.
* **Implement Redis Caching**: Use Redis to cache project reads for popular shareable links.

---

### Scalability Roadmap (10x to 100x Growth)

```mermaid
flowchart TD
    subgraph Current Architecture
        A[Single Next.js Serverless Instance] --> B[(MongoDB Atlas Standalone)]
        A --> C[Direct Client API Call to Gemini]
    end
    
    subgraph 100x Scaled Architecture
        D[Next.js Application Edge Cluster] --> E[Upstash Redis Cache Layer]
        E --> F[(MongoDB Atlas Sharded Cluster)]
        D --> G[Serverless AI Proxy API + Rate Limiting]
        G --> H[Google Gemini API]
        D <--> I[Yjs CRDT + WebSockets Engine for Real-Time Collaboration]
    end
```

1. **Sharded Database Cluster**: Transition MongoDB Atlas to a sharded cluster with indexes on `editCode`, `viewCode`, and `userId`.
2. **Real-Time Collaboration**: Integrate Yjs CRDTs over WebSockets for multi-user co-editing.
3. **Rate Limiting**: Enforce IP- and user-based rate limits on API routes using Upstash Redis.

---

Made with ❤️ by technical documentation engineering for **Origin IDE**.
