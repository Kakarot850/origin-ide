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
        const { title, description } = req.body || {};
        const { editCode, viewCode } = generateProjectCodes();

        // Get user session
        const session = await getServerSession(req, res, authOptions);

        let finalTitle = title?.trim();
        let validUserId = null;

        // Associate project with user if logged in and ID is valid
        if (session?.user?.id) {
            if (mongoose.Types.ObjectId.isValid(session.user.id)) {
                validUserId = session.user.id;
            } else {
                console.error("Invalid user ID format in project creation:", session.user.id);
            }
        }

        // Deterministic auto-naming if no title provided
        if (!finalTitle) {
            if (validUserId) {
                // Find all existing untitled projects for this user to determine the next ordinal
                const untitledProjects = await Project.find({
                    userId: validUserId,
                    title: /^untitled_\d+$/i,
                }).select("title").lean();

                let maxNumber = 0;
                untitledProjects.forEach((p) => {
                    const match = p.title.match(/^untitled_(\d+)$/i);
                    if (match) {
                        const num = parseInt(match[1], 10);
                        if (num > maxNumber) maxNumber = num;
                    }
                });

                if (maxNumber === 0) {
                    const count = await Project.countDocuments({ userId: validUserId });
                    finalTitle = `untitled_${count + 1}`;
                } else {
                    finalTitle = `untitled_${maxNumber + 1}`;
                }
            } else {
                // Guest user: incremental counter if supplied or default to untitled_1
                const counter = req.body?.counter;
                if (counter && !isNaN(counter)) {
                    finalTitle = `untitled_${counter}`;
                } else {
                    finalTitle = "untitled_1";
                }
            }
        }

        // Create project with user ID if logged in
        const projectData = {
            title: finalTitle,
            description: description || "",
            html: req.body?.html || DEFAULT_TEMPLATES.html,
            css: req.body?.css || DEFAULT_TEMPLATES.css,
            javascript: req.body?.javascript || DEFAULT_TEMPLATES.javascript,
            editCode,
            viewCode,
        };

        if (validUserId) {
            projectData.userId = validUserId;
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
