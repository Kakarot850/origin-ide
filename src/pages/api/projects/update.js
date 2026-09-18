import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();

    try {
        let body = req.body;
        if (typeof body === "string") {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.warn("Failed to parse request body as JSON in update.js:", e);
            }
        }

        const { code, html, css, javascript, title, description } = body || {};

        if (!code) {
            return res.status(400).json({ message: "Project code is required" });
        }

        // Build update object with only provided data
        const updateData = {
            lastUpdated: new Date(),
        };

        if (html !== undefined) updateData.html = html;
        if (css !== undefined) updateData.css = css;
        if (javascript !== undefined) updateData.javascript = javascript;
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;

        // Atomically update project and return only required fields without Mongoose hydration overhead
        const updatedProject = await Project.findOneAndUpdate(
            { editCode: code },
            { $set: updateData },
            { new: true, select: "editCode viewCode title" }
        ).lean();

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project: {
                editCode: updatedProject.editCode,
                viewCode: updatedProject.viewCode,
                title: updatedProject.title,
            },
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project" });
    }
}
