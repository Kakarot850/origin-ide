import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";
import { generateProjectCodes } from "../../../utils/codeGenerator";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import mongoose from "mongoose";

import { DEFAULT_TEMPLATES } from "@/utils/templates";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();

    try {
        const { title, description } = req.body;
        const { editCode, viewCode } = generateProjectCodes();

        // Get user session
        const session = await getServerSession(req, res, authOptions);

        // Create project with user ID if logged in
        const projectData = {
            title: title || "Untitled Project",
            description: description || "",
            html: req.body.html || DEFAULT_TEMPLATES.html,
            css: req.body.css || DEFAULT_TEMPLATES.css,
            javascript: req.body.javascript || DEFAULT_TEMPLATES.javascript,
            editCode,
            viewCode,
        };

        // Associate project with user if logged in and ID is valid
        if (session?.user?.id) {
            // Validate that user ID is a valid MongoDB ObjectId
            if (mongoose.Types.ObjectId.isValid(session.user.id)) {
                projectData.userId = session.user.id;
            } else {
                console.error("Invalid user ID format in project creation:", session.user.id);
                // For invalid IDs, we'll create as guest project (no userId)
            }
        }

        const project = await Project.create(projectData);

        res.status(201).json({
            editCode: project.editCode,
            viewCode: project.viewCode,
            title: project.title,
            description: project.description,
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Error creating project" });
    }
}
