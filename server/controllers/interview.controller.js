import fs from "fs";
import * as pdfjsLib from "pdfjs-dist";

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

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item) => item.str).join(" ");

      resumeText += pageText + "\n";
    }

    // 7. Send extracted text to frontend
    res.status(200).json({
      message: "Resume analyzed successfully",
      resumeText,
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);

    res.status(500).json({
      message: "Failed to analyze resume",
    });
  }
};
