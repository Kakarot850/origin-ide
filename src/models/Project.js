import mongoose from "mongoose";
import { DEFAULT_TEMPLATES } from "../utils/templates";

const ProjectSchema = new mongoose.Schema({
    editCode: {
        type: String,
        required: true,
        unique: true,
    },
    viewCode: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: "Untitled Project",
    },
    description: {
        type: String,
        default: "",
    },
    html: {
        type: String,
        default: () => DEFAULT_TEMPLATES.html,
    },
    css: {
        type: String,
        default: () => DEFAULT_TEMPLATES.css,
    },
    javascript: {
        type: String,
        default: () => DEFAULT_TEMPLATES.javascript,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // Not required to support anonymous projects
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

// Compound index for dashboard queries and sorting
ProjectSchema.index({ userId: 1, lastUpdated: -1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
