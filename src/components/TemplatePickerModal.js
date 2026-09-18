import React, { useState } from "react";
import styles from "../styles/TemplatePickerModal.module.css";
import { FiCode, FiLayers, FiX, FiArrowRight } from "react-icons/fi";

export default function TemplatePickerModal({ isOpen, onClose, onSelectTemplate }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    if (!isOpen) return null;

    const handleSelect = async (type) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSelectedType(type);
        try {
            await onSelectTemplate(type);
        } catch (error) {
            console.error("Template creation failed:", error);
            setIsSubmitting(false);
            setSelectedType(null);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.headerTitleArea}>
                        <h2>Choose Project Template</h2>
                        <p>Select your runtime environment to start coding immediately.</p>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} disabled={isSubmitting}>
                        <FiX size={18} />
                    </button>
                </div>

                <div className={styles.cardsContainer}>
                    {/* Vanilla Web Card */}
                    <button
                        className={styles.templateCard}
                        onClick={() => handleSelect("vanilla")}
                        disabled={isSubmitting}
                    >
                        <span className={styles.cardBadge}>Standard Web</span>
                        <div className={styles.cardIconBox}>
                            <FiCode size={22} />
                        </div>
                        <h3 className={styles.cardTitle}>Vanilla Web</h3>
                        <p className={styles.cardDescription}>
                            Standard multi-buffer environment with dedicated HTML5, CSS3, and JavaScript tabs.
                        </p>
                        <div className={styles.tagsList}>
                            <span className={styles.tag}>HTML5</span>
                            <span className={styles.tag}>CSS3</span>
                            <span className={styles.tag}>ES6+ JS</span>
                        </div>
                        <div className={styles.cardButton}>
                            {isSubmitting && selectedType === "vanilla" ? (
                                "Creating..."
                            ) : (
                                <>
                                    <span>Start Vanilla Project</span>
                                    <FiArrowRight size={14} />
                                </>
                            )}
                        </div>
                    </button>

                    {/* React + Tailwind Sandbox Card */}
                    <button
                        className={styles.templateCard}
                        onClick={() => handleSelect("react")}
                        disabled={isSubmitting}
                    >
                        <span className={`${styles.cardBadge} ${styles.reactBadge}`}>Modern Sandbox</span>
                        <div className={styles.cardIconBox}>
                            <FiLayers size={22} />
                        </div>
                        <h3 className={styles.cardTitle}>React + Tailwind</h3>
                        <p className={styles.cardDescription}>
                            Single-file modern React 18 component with JSX, hooks, and instant utility-first Tailwind classes.
                        </p>
                        <div className={styles.tagsList}>
                            <span className={styles.tag}>React 18</span>
                            <span className={styles.tag}>JSX</span>
                            <span className={styles.tag}>Tailwind CSS</span>
                            <span className={styles.tag}>Babel</span>
                        </div>
                        <div className={styles.cardButton}>
                            {isSubmitting && selectedType === "react" ? (
                                "Creating..."
                            ) : (
                                <>
                                    <span>Start React Sandbox</span>
                                    <FiArrowRight size={14} />
                                </>
                            )}
                        </div>
                    </button>
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
