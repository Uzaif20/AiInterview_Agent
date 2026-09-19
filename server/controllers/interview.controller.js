import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js";

export const analyzeResume = async (req, res) => {
  try {
    // 1. Check if resume was uploaded
    if (!req.file) {
      return res.status(400).json({
        msg: "Resume required",
      });
    }

    // 2. Get file location
    const filePath = req.file.path;

    // 3. Read PDF from disk
    const fileBuffer = await fs.promises.readFile(filePath);

    // 4. Convert binary data for PDF.js
    const uint8Array = new Uint8Array(fileBuffer);

    // 5. Load PDF
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
    });

    const pdf = await loadingTask.promise;

    // 6. Extract text from every page
    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const message = [
      {
        role: "system",
        content: `
        Extract structured data from resume.
        
        return srtictly JSON:
        {
        "role" : "string",
        "experience": "string",
        "projects" :["projects1", "Projects2"],
        "skills" :["skill1", "skill2"],
        }
        `,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(message);
   const cleanResponse = aiResponse
     .replace(/```json/g, "")
     .replace(/```/g, "")
     .trim();

   const parsed = JSON.parse(cleanResponse);

    fs.unlinkSync(filePath);

    // 7. Send extracted text to frontend
    res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    console.error("========== RESUME ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("=================================");

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};
