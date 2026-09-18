import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";

export default async function handler(req, res) {
    await dbConnect();
    const { code } = req.query;

    if (req.method === "GET") {
        try {
            const project = await Project.findOne({
                $or: [{ editCode: code }, { viewCode: code }],
            }).lean();

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            // If accessed via public read-only view link, cache aggressively on CDN/browser
            if (project.viewCode === code) {
                res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
            } else {
                res.setHeader("Cache-Control", "no-store, max-age=0");
            }

            res.status(200).json(project);
        } catch (error) {
            console.error("Error fetching project:", error);
            res.status(500).json({ message: "Error fetching project" });
        }
    }
}
