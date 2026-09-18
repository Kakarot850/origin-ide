import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Editor from "@monaco-editor/react";
import axios from "axios";
import ShareButton from "../ShareButton";
import AIChatButton from "../AIChatButton";
import styles from "./Editor.module.css";
import { FiSave, FiCode, FiLayout, FiColumns, FiEye, FiGrid, FiHome, FiEdit, FiCheck, FiSettings, FiInfo, FiX, FiRotateCcw, FiAlignLeft } from "react-icons/fi";
import { DEFAULT_TEMPLATES } from "@/utils/templates";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

let emmetConfigured = false;
let prettierCache = null;

async function getPrettier() {
    if (!prettierCache) {
        const [prettier, htmlPlugin, postcssPlugin, babelPlugin, estreePlugin] = await Promise.all([
            import("prettier/standalone"),
            import("prettier/plugins/html"),
            import("prettier/plugins/postcss"),
            import("prettier/plugins/babel"),
            import("prettier/plugins/estree"),
        ]);
        prettierCache = {
            prettier: prettier.default || prettier,
            htmlPlugin: htmlPlugin.default || htmlPlugin,
            postcssPlugin: postcssPlugin.default || postcssPlugin,
            babelPlugin: babelPlugin.default || babelPlugin,
            estreePlugin: estreePlugin.default || estreePlugin,
        };
    }
    return prettierCache;
}

export default function CodeEditor({ initialData, readOnly, editCode, viewCode }) {
    const router = useRouter();
    const { data: session } = useSession();
    const isAuthenticated = !!session;

    const hasInitialCode = initialData && (initialData.html || initialData.css || initialData.javascript);
    const [activeTab, setActiveTab] = useState("html");
    const [html, setHtml] = useState(
        hasInitialCode ? (initialData.html || "") : (initialData?.html ? initialData.html : DEFAULT_TEMPLATES.html)
    );
    const [css, setCss] = useState(
        hasInitialCode ? (initialData.css || "") : (initialData?.css ? initialData.css : DEFAULT_TEMPLATES.css)
    );
    const [js, setJs] = useState(
        hasInitialCode ? (initialData.javascript || "") : (initialData?.javascript ? initialData.javascript : DEFAULT_TEMPLATES.javascript)
    );
    const [saveStatus, setSaveStatus] = useState("");
    const [projectTitle, setProjectTitle] = useState(initialData?.title || "Untitled Project");
    const [projectDescription, setProjectDescription] = useState(initialData?.description || "");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tempTitle, setTempTitle] = useState(initialData?.title || "Untitled Project");
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [layout, setLayout] = useState("split"); // "split", "editor", "preview"

    const hasUnsavedChangesRef = useRef(false);
    const latestStateRef = useRef({
        html,
        css,
        js,
        projectTitle,
        projectDescription,
        editCode,
        readOnly,
        isOwner,
    });

    useEffect(() => {
        setTempTitle(projectTitle);
    }, [projectTitle]);

    useEffect(() => {
        latestStateRef.current = {
            html,
            css,
            js,
            projectTitle,
            projectDescription,
            editCode,
            readOnly,
            isOwner,
        };
    }, [html, css, js, projectTitle, projectDescription, editCode, readOnly, isOwner]);

    // Track unsaved modifications
    useEffect(() => {
        hasUnsavedChangesRef.current = true;
    }, [html, css, js, projectTitle, projectDescription]);

    // Check if the current user is the owner of the project
    useEffect(() => {
        if (isAuthenticated && initialData?.userId && session?.user?.id) {
            setIsOwner(initialData.userId === session.user.id);
        } else if (!initialData?.userId) {
            // If the project doesn't have an owner, anyone can edit it
            setIsOwner(true);
        }
    }, [isAuthenticated, initialData, session]);

    // Auto-save logic
    useEffect(() => {
        if (!readOnly && autoSaveEnabled) {
            const timer = setTimeout(() => {
                saveProject();
            }, 5000); // Auto-save after 5 seconds of inactivity

            return () => clearTimeout(timer);
        }
    }, [html, css, js, projectTitle, projectDescription]);

    const tabs = [
        {
            id: "html",
            label: "HTML",
            icon: <FiCode size={16} />,
            language: "html",
        },
        {
            id: "css",
            label: "CSS",
            icon: <FiLayout size={16} />,
            language: "css",
        },
        {
            id: "js",
            label: "JS",
            icon: <FiCode size={16} />,
            language: "javascript",
        },
    ];

    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const handleFormatCodeRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Register Shift+Alt+F (Windows/Linux) and Shift+Option+F (Mac) for Beautify action
        editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
            handleFormatCodeRef.current?.();
        });

        // Register Emmet for HTML and CSS using a single-instance guard to prevent duplicate bindings on re-mounts
        if (!emmetConfigured && typeof window !== "undefined") {
            try {
                emmetHTML(monaco, ["html"]);
                emmetCSS(monaco, ["css"]);
                emmetConfigured = true;
            } catch (error) {
                console.error("Failed to initialize Emmet:", error);
            }
        }

        // Configure JavaScript compiler options to target ES2020 with allowJs: true
        if (monaco.languages?.typescript?.javascriptDefaults) {
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget?.ES2020 ?? 7,
                allowNonTsExtensions: true,
                allowJs: true,
            });
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: false,
                noSyntaxValidation: false,
            });
        }

        // Enable default HTML5 tag suggestions via monaco.languages.html.htmlDefaults
        if (monaco.languages?.html?.htmlDefaults) {
            monaco.languages.html.htmlDefaults.setOptions({
                format: {
                    tabSize: 2,
                    insertSpaces: true,
                    wrapLineLength: 120,
                    unformatted: "default",
                    contentUnformatted: "pre,code,textarea",
                    indentInnerHtml: true,
                    preserveNewLines: true,
                    maxPreserveNewLines: null,
                    indentHandlebars: false,
                    endWithNewline: false,
                    extraLiners: "head, body, /html",
                    wrapAttributes: "auto",
                },
                suggest: {
                    html5: true,
                },
            });
        }

        // Enable CSS property validation, linting rules, and default CSS data providers via monaco.languages.css.cssDefaults
        if (monaco.languages?.css?.cssDefaults) {
            monaco.languages.css.cssDefaults.setOptions({
                validate: true,
                lint: {
                    compatibleVendorPrefixes: "warning",
                    vendorPrefix: "warning",
                    duplicateProperties: "warning",
                    emptyRules: "warning",
                    importStatement: "ignore",
                    boxModel: "ignore",
                    universalSelector: "ignore",
                    zeroUnits: "ignore",
                    fontFaceProperties: "warning",
                    hexColorLength: "error",
                    argumentsInColorFunction: "error",
                    unknownProperties: "warning",
                    ieHack: "ignore",
                    unknownVendorSpecificProperties: "ignore",
                    propertyIgnoredDueToDisplay: "warning",
                    important: "ignore",
                    float: "ignore",
                    idSelector: "ignore",
                },
                data: {
                    useDefaultProviders: true,
                },
            });
        }
    };

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        lineNumbers: "on",
        roundedSelection: true,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        readOnly: readOnly, // Allow editing if user has edit link
        theme: "vs-dark",
        padding: { top: 10 },
        fontFamily: "'Fira Code', monospace",
        fontLigatures: true,
        // IntelliSense & Autocomplete options
        quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
        tabCompletion: "on",
        snippetSuggestions: "top",
        parameterHints: {
            enabled: true,
        },
        suggest: {
            showKeywords: true,
            showSnippets: true,
            showWords: true,
            showMethods: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            snippetsPreventQuickSuggestions: false,
        },
    };

    const saveProject = useCallback(async () => {
        if (readOnly || isSaving) return; // Anyone with edit link can save

        try {
            setIsSaving(true);
            setSaveStatus("Saving...");

            await axios.post("/api/projects/update", {
                code: editCode,
                html,
                css,
                javascript: js,
                title: isOwner ? projectTitle : undefined, // Only owner can edit title
                description: isOwner ? projectDescription : undefined, // Only owner can edit description
            });

            hasUnsavedChangesRef.current = false;
            setSaveStatus("Saved!");
            setTimeout(() => setSaveStatus(""), 2000);
        } catch (error) {
            console.error("Save error:", error);
            setSaveStatus("Save failed");
            setTimeout(() => setSaveStatus(""), 2000);
        } finally {
            setIsSaving(false);
        }
    }, [readOnly, isSaving, editCode, html, css, js, isOwner, projectTitle, projectDescription]);

    const flushSave = useCallback(() => {
        const state = latestStateRef.current;
        if (state.readOnly || !state.editCode || !hasUnsavedChangesRef.current) return;

        const payload = JSON.stringify({
            code: state.editCode,
            html: state.html,
            css: state.css,
            javascript: state.js,
            title: state.isOwner ? state.projectTitle : undefined,
            description: state.isOwner ? state.projectDescription : undefined,
        });

        hasUnsavedChangesRef.current = false;

        // Try navigator.sendBeacon first
        try {
            if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
                const blob = new Blob([payload], { type: "application/json" });
                const sent = navigator.sendBeacon("/api/projects/update", blob);
                if (sent) return;
            }
        } catch (err) {
            console.warn("sendBeacon error:", err);
        }

        // Fallback to fetch with keepalive: true
        try {
            if (typeof fetch !== "undefined") {
                fetch("/api/projects/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: payload,
                    keepalive: true,
                }).catch((e) => console.warn("keepalive fetch error:", e));
            }
        } catch (err) {
            console.warn("Flush fetch error:", err);
        }
    }, []);

    // Tab/window lifecycle unload listeners & component unmount flush
    useEffect(() => {
        const handlePageHide = () => {
            flushSave();
        };

        window.addEventListener("pagehide", handlePageHide);
        window.addEventListener("beforeunload", handlePageHide);

        return () => {
            window.removeEventListener("pagehide", handlePageHide);
            window.removeEventListener("beforeunload", handlePageHide);
            flushSave();
        };
    }, [flushSave]);

    const generateOutput = useCallback((customHtml = html, customCss = css, customJs = js, customTitle = projectTitle) => {
        const titleTag = `<title>${customTitle || "Origin IDE"}</title>`;
        const rawHtml = customHtml || "";
        const darkCanvasReset = `<meta name="color-scheme" content="dark">\n<style id="origin-dark-reset">\n:root { color-scheme: dark; }\nhtml, body {\n  background-color: #0f172a;\n  color: #f8fafc;\n  color-scheme: dark;\n  margin: 0;\n}\n</style>`;
        const tailwindScript = rawHtml.includes("cdn.tailwindcss.com") ? "" : '<script src="https://cdn.tailwindcss.com"></script>';
        const styleTag = `<style>${customCss || ""}</style>`;
        const headTags = `${darkCanvasReset}\n${tailwindScript}\n${styleTag}`;
        const scriptTag = `<script>\ntry {\n${customJs || ""}\n} catch (err) {\n  console.error("Preview script error:", err);\n}\n</script>`;

        if (rawHtml.includes("<html") || rawHtml.includes("<!DOCTYPE") || rawHtml.includes("<body")) {
            let output = rawHtml;

            // Inject Tailwind & styles into head or at start
            if (output.includes("</head>")) {
                output = output.replace(/<\/head>/i, `${headTags}\n</head>`);
            } else if (output.includes("<head>")) {
                output = output.replace(/<head>/i, `<head>\n${headTags}`);
            } else if (output.includes("<body")) {
                output = output.replace(/<body/i, `${headTags}\n<body`);
            } else {
                output = `${headTags}\n${output}`;
            }

            // Inject scripts before closing body or at end
            if (output.includes("</body>")) {
                output = output.replace(/<\/body>/i, `${scriptTag}</body>`);
            } else if (output.includes("</html>")) {
                output = output.replace(/<\/html>/i, `${scriptTag}</html>`);
            } else {
                output = `${output}${scriptTag}`;
            }

            return output;
        }

        return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${titleTag}
        ${headTags}
    </head>
    <body>
        ${rawHtml}
        ${scriptTag}
    </body>
</html>`;
    }, [html, css, js, projectTitle]);

    // Debounced iframe srcDoc to prevent DOM thrashing and lag while typing
    const [debouncedSrcDoc, setDebouncedSrcDoc] = useState(() => generateOutput(html, css, js, projectTitle));

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSrcDoc(generateOutput(html, css, js, projectTitle));
        }, 350);

        return () => clearTimeout(timer);
    }, [html, css, js, projectTitle, generateOutput]);

    const openPreview = useCallback(() => {
        const output = generateOutput();
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(output);
        previewWindow.document.close();
    }, [generateOutput]);

    const handleTitleSave = useCallback(() => {
        setShowTitleModal(false);
        saveProject();
    }, [saveProject]);

    const handleDescriptionSave = useCallback(() => {
        setShowDescriptionModal(false);
        saveProject();
    }, [saveProject]);

    const toggleLayout = useCallback((newLayout) => {
        setLayout(newLayout);
    }, []);

    const goToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    const goToDashboard = useCallback(() => {
        router.push("/dashboard");
    }, [router]);

    const handleResetToBoilerplate = useCallback(() => {
        if (readOnly) return;
        const confirmReset = window.confirm(
            "Replace current workspace contents with default starter boilerplate?"
        );
        if (confirmReset) {
            setHtml(DEFAULT_TEMPLATES.html);
            setCss(DEFAULT_TEMPLATES.css);
            setJs(DEFAULT_TEMPLATES.javascript);
            setSaveStatus("Reset to boilerplate!");
            setTimeout(() => setSaveStatus(""), 2000);
        }
    }, [readOnly]);

    const [isFormatting, setIsFormatting] = useState(false);

    const handleFormatCode = useCallback(async () => {
        if (readOnly) return;

        const editor = editorRef.current;
        const currentTab = activeTab; // "html" | "css" | "js"
        const rawCode = currentTab === "html" ? html : currentTab === "css" ? css : js;

        if (!rawCode || !rawCode.trim()) return;

        setIsFormatting(true);
        setSaveStatus("Formatting...");

        try {
            const { prettier, htmlPlugin, postcssPlugin, babelPlugin, estreePlugin } = await getPrettier();

            let parser = "html";
            let plugins = [htmlPlugin];

            if (currentTab === "css") {
                parser = "css";
                plugins = [postcssPlugin];
            } else if (currentTab === "js") {
                parser = "babel";
                plugins = [babelPlugin, estreePlugin];
            }

            const formatted = await prettier.format(rawCode, {
                parser,
                plugins,
                tabWidth: 2,
                singleQuote: false,
                semi: true,
                trailingComma: "es5",
            });

            // Preserve editor cursor position, scroll state, and push to undo history
            if (editor) {
                const model = editor.getModel();
                if (model) {
                    const position = editor.getPosition();
                    const scrollTop = editor.getScrollTop();
                    const scrollLeft = editor.getScrollLeft();

                    editor.executeEdits("beautify", [
                        {
                            range: model.getFullModelRange(),
                            text: formatted,
                            forceMoveMarkers: true,
                        },
                    ]);
                    editor.pushUndoStop();

                    if (position) editor.setPosition(position);
                    editor.setScrollTop(scrollTop);
                    editor.setScrollLeft(scrollLeft);
                }
            }

            // Update corresponding buffer state
            if (currentTab === "html") setHtml(formatted);
            else if (currentTab === "css") setCss(formatted);
            else if (currentTab === "js") setJs(formatted);

            setSaveStatus("Formatted!");
            setTimeout(() => setSaveStatus(""), 2000);
        } catch (err) {
            console.warn("Prettier format failed, falling back to Monaco format action:", err);
            if (editor) {
                try {
                    await editor.getAction("editor.action.formatDocument")?.run();
                    setSaveStatus("Formatted!");
                    setTimeout(() => setSaveStatus(""), 2000);
                } catch (fallbackErr) {
                    console.error("Monaco format error:", fallbackErr);
                    setSaveStatus("Formatting failed");
                    setTimeout(() => setSaveStatus(""), 2000);
                }
            } else {
                setSaveStatus("Formatting failed");
                setTimeout(() => setSaveStatus(""), 2000);
            }
        } finally {
            setIsFormatting(false);
        }
    }, [readOnly, activeTab, html, css, js]);

    useEffect(() => {
        handleFormatCodeRef.current = handleFormatCode;
    }, [handleFormatCode]);

    // Handle code generated from AI
    const handleCodeGenerated = useCallback((generatedCode) => {
        if (readOnly) return; // Don't update if in read-only mode

        const { html: generatedHtml, css: generatedCss, js: generatedJs } = generatedCode;

        // Update the code in each tab
        if (generatedHtml) {
            setHtml(generatedHtml);
        }

        if (generatedCss) {
            setCss(generatedCss);
        }

        if (generatedJs) {
            setJs(generatedJs);
        }

        // Save the project with the new code
        saveProject();
    }, [readOnly, saveProject]);

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.logoArea}>
                    <div className={styles.logo} onClick={goToHome}>
                        <FiCode size={24} className={styles.logoIcon} />
                        <span>Origin IDE</span>
                    </div>
                </div>

                <div className={styles.projectTitleArea}>
                    {isEditingTitle && !readOnly && isOwner ? (
                        <input
                            type="text"
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            onBlur={() => {
                                setIsEditingTitle(false);
                                const trimmed = tempTitle.trim();
                                if (trimmed && trimmed !== projectTitle) {
                                    setProjectTitle(trimmed);
                                    hasUnsavedChangesRef.current = true;
                                } else {
                                    setTempTitle(projectTitle);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setIsEditingTitle(false);
                                    const trimmed = tempTitle.trim();
                                    if (trimmed && trimmed !== projectTitle) {
                                        setProjectTitle(trimmed);
                                        hasUnsavedChangesRef.current = true;
                                    } else {
                                        setTempTitle(projectTitle);
                                    }
                                } else if (e.key === "Escape") {
                                    setIsEditingTitle(false);
                                    setTempTitle(projectTitle);
                                }
                            }}
                            className={styles.inlineTitleInput}
                            autoFocus
                        />
                    ) : (
                        <h1
                            className={styles.projectTitle}
                            onClick={() => {
                                if (!readOnly && isOwner) {
                                    setTempTitle(projectTitle);
                                    setIsEditingTitle(true);
                                }
                            }}
                            title={!readOnly && isOwner ? "Click to rename project" : projectTitle}
                            style={{ cursor: !readOnly && isOwner ? "pointer" : "default" }}
                        >
                            <span>{projectTitle}</span>
                            {!readOnly && isOwner && (
                                <button
                                    className={styles.editButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTempTitle(projectTitle);
                                        setIsEditingTitle(true);
                                    }}
                                    title="Rename Project"
                                >
                                    <FiEdit size={14} />
                                </button>
                            )}
                        </h1>
                    )}
                </div>

                <div className={styles.actions}>
                    {!readOnly && (
                        <>
                            <button
                                className={`${styles.actionButton} ${styles.saveButton}`}
                                onClick={saveProject}
                                disabled={isSaving}
                                title="Save Project"
                            >
                                <FiSave size={16} />
                                <span>{isSaving ? "Saving..." : "Save"}</span>
                            </button>

                            <button
                                className={styles.formatButton}
                                onClick={handleFormatCode}
                                disabled={isFormatting}
                                title="Format Code (Shift+Alt+F)"
                            >
                                <FiAlignLeft size={16} />
                                <span>{isFormatting ? "Formatting..." : "Beautify"}</span>
                            </button>

                            <button
                                className={styles.resetButton}
                                onClick={handleResetToBoilerplate}
                                title="Reset to Boilerplate Code"
                            >
                                <FiRotateCcw size={16} />
                                <span>Reset</span>
                            </button>
                        </>
                    )}

                    <div className={styles.layoutControls}>
                        <button
                            className={`${styles.layoutButton} ${layout === "editor" ? styles.active : ""}`}
                            onClick={() => toggleLayout("editor")}
                            title="Editor Only"
                        >
                            <FiCode size={16} />
                        </button>
                        <button
                            className={`${styles.layoutButton} ${layout === "split" ? styles.active : ""}`}
                            onClick={() => toggleLayout("split")}
                            title="Split View"
                        >
                            <FiColumns size={16} />
                        </button>
                        <button
                            className={`${styles.layoutButton} ${layout === "preview" ? styles.active : ""}`}
                            onClick={() => toggleLayout("preview")}
                            title="Preview Only"
                        >
                            <FiEye size={16} />
                        </button>
                    </div>

                    <button className={styles.infoButton} onClick={() => setShowDescriptionModal(true)} title="Project Info">
                        <FiInfo size={16} />
                        <span>Info</span>
                    </button>

                    <div className={styles.navButtons}>
                        {isAuthenticated && (
                            <button className={styles.navButton} onClick={goToDashboard} title="Go to Dashboard">
                                <FiGrid size={16} className={styles.buttonIcon} />
                                <span>Dashboard</span>
                            </button>
                        )}
                        <button className={styles.navButton} onClick={goToHome} title="Go to Home">
                            <FiHome size={16} className={styles.buttonIcon} />
                            <span>Home</span>
                        </button>
                    </div>

                    {!readOnly && (
                        <div className={styles.shareContainer}>
                            <ShareButton editCode={editCode} viewCode={viewCode} isGuest={!initialData?.userId} />
                        </div>
                    )}
                    <div className={styles.aiAssistantContainer}>
                        <AIChatButton onCodeGenerated={handleCodeGenerated} />
                    </div>
                </div>
            </div>

            <div className={`${styles.mainContainer} ${styles[layout]}`}>
                <div className={`${styles.editorSection} ${layout === "preview" ? styles.hidden : ""}`}>
                    <div className={styles.editorTabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className={styles.tabIcon}>{tab.icon}</span>
                                <span className={styles.tabLabel}>{tab.label}</span>
                            </button>
                        ))}

                        <div className={styles.editorSettings}>
                            <button className={styles.settingsButton} onClick={() => setShowSettings(!showSettings)} title="Settings">
                                <FiSettings size={16} />
                            </button>

                            {showSettings && (
                                <div className={styles.settingsDropdown}>
                                    <div className={styles.settingItem}>
                                        <input
                                            type="checkbox"
                                            id="autoSave"
                                            checked={autoSaveEnabled}
                                            onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
                                        />
                                        <label htmlFor="autoSave">Auto-save</label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.editorContent}>
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            loading={
                                <div className={styles.editorLoading}>
                                    <div className={styles.editorSpinner} />
                                    <span>Loading Editor...</span>
                                </div>
                            }
                            language={tabs.find((t) => t.id === activeTab).language}
                            value={activeTab === "html" ? html : activeTab === "css" ? css : js}
                            onChange={(value) => {
                                if (!readOnly) {
                                    if (activeTab === "html") setHtml(value);
                                    if (activeTab === "css") setCss(value);
                                    if (activeTab === "js") setJs(value);
                                }
                            }}
                            onMount={handleEditorDidMount}
                            options={editorOptions}
                        />
                    </div>
                </div>

                <div className={`${styles.previewSection} ${layout === "editor" ? styles.hidden : ""}`}>
                    <div className={styles.previewHeader}>
                        <h3>Preview</h3>
                        <button className={styles.previewButton} onClick={openPreview} title="Open in new window">
                            <FiEye size={16} />
                        </button>
                    </div>
                    <iframe
                        srcDoc={debouncedSrcDoc}
                        title="preview"
                        sandbox="allow-scripts allow-modals allow-forms allow-popups"
                        className={styles.previewFrame}
                        style={{
                            backgroundColor: "#0f172a",
                            colorScheme: "dark",
                        }}
                    />
                </div>
            </div>

            {/* Title Edit Modal */}
            {showTitleModal && (
                <div className={styles.modalOverlay} onClick={() => setShowTitleModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Edit Project Title</h3>
                            <button className={styles.closeButton} onClick={() => setShowTitleModal(false)}>
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.formGroup}>
                                <label htmlFor="projectTitle">Title</label>
                                <input
                                    type="text"
                                    id="projectTitle"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    className={styles.modalInput}
                                    placeholder="Enter project title"
                                    autoFocus
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button className={styles.cancelButton} onClick={() => setShowTitleModal(false)}>
                                    Cancel
                                </button>
                                <button className={styles.saveButton} onClick={handleTitleSave}>
                                    <FiCheck size={16} />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Description Edit Modal */}
            {showDescriptionModal && (
                <div className={styles.modalOverlay} onClick={() => setShowDescriptionModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Project Information</h3>
                            <button className={styles.closeButton} onClick={() => setShowDescriptionModal(false)}>
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.infoItem}>
                                <h4>Project Title</h4>
                                <p>{projectTitle}</p>
                            </div>
                            {!readOnly && isOwner ? (
                                <div className={styles.formGroup}>
                                    <label htmlFor="projectDescription">Description</label>
                                    <textarea
                                        id="projectDescription"
                                        value={projectDescription}
                                        onChange={(e) => setProjectDescription(e.target.value)}
                                        className={styles.modalTextarea}
                                        placeholder="Add a description for your project"
                                        rows={4}
                                    />
                                </div>
                            ) : (
                                <div className={styles.infoItem}>
                                    <h4>Description</h4>
                                    <p>{projectDescription || "No description provided."}</p>
                                </div>
                            )}
                            {!readOnly && isOwner && (
                                <div className={styles.modalActions}>
                                    <button className={styles.cancelButton} onClick={() => setShowDescriptionModal(false)}>
                                        Cancel
                                    </button>
                                    <button className={styles.saveButton} onClick={handleDescriptionSave}>
                                        <FiCheck size={16} />
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {saveStatus && (
                <div className={styles.saveStatusIndicator}>
                    {saveStatus === "Saved!" ? (
                        <>
                            <FiCheck size={16} className={styles.statusIcon} />
                            {saveStatus}
                        </>
                    ) : (
                        saveStatus
                    )}
                </div>
            )}

            {readOnly && !isOwner && (
                <div className={styles.readOnlyNotice}>
                    {isAuthenticated
                        ? "You're viewing a project you don't own. You cannot make changes."
                        : "Sign in to create and edit your own projects."}
                </div>
            )}
        </div>
    );
}
