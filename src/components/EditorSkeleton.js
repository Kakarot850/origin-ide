import styles from "./Editor/Editor.module.css";
import { FiCode } from "react-icons/fi";

export default function EditorSkeleton() {
    return (
        <div className={styles.container} style={{ backgroundColor: "#1a1a1a" }}>
            {/* Top Bar Skeleton */}
            <div className={styles.topBar}>
                <div className={styles.logoArea}>
                    <div className={styles.logo}>
                        <FiCode size={24} className={styles.logoIcon} />
                        <span>Origin IDE</span>
                    </div>
                </div>
                <div className={styles.projectTitleArea}>
                    <div
                        style={{
                            width: "180px",
                            height: "22px",
                            backgroundColor: "#333",
                            borderRadius: "4px",
                            animation: "pulse 1.5s infinite ease-in-out",
                        }}
                    />
                </div>
                <div className={styles.actions}>
                    <div
                        style={{
                            width: "80px",
                            height: "34px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "6px",
                        }}
                    />
                    <div
                        style={{
                            width: "100px",
                            height: "34px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "6px",
                        }}
                    />
                </div>
            </div>

            {/* Editor Workspace Skeleton */}
            <div className={`${styles.mainContainer} ${styles.split}`}>
                <div className={styles.editorSection} style={{ borderRight: "1px solid #333", backgroundColor: "#1e1e1e" }}>
                    <div className={styles.editorTabs}>
                        <div style={{ display: "flex", gap: "8px", padding: "8px 12px" }}>
                            <div style={{ width: "70px", height: "26px", backgroundColor: "#333", borderRadius: "4px" }} />
                            <div style={{ width: "70px", height: "26px", backgroundColor: "#262626", borderRadius: "4px" }} />
                            <div style={{ width: "70px", height: "26px", backgroundColor: "#262626", borderRadius: "4px" }} />
                        </div>
                    </div>
                    <div
                        style={{
                            height: "calc(100% - 44px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#1e1e1e",
                            color: "#888",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                border: "3px solid #333",
                                borderTop: "3px solid #4ecdc4",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                        <span style={{ fontSize: "0.9rem", color: "#a0a0a0" }}>Initializing Editor Workspace...</span>
                    </div>
                </div>

                <div className={styles.previewSection} style={{ backgroundColor: "#0f172a" }}>
                    <div className={styles.previewHeader}>
                        <div style={{ width: "80px", height: "18px", backgroundColor: "#333", borderRadius: "4px" }} />
                    </div>
                    <div
                        style={{
                            height: "calc(100% - 44px)",
                            backgroundColor: "#0f172a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span style={{ color: "#555", fontSize: "0.85rem" }}>Live Preview Standby</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
