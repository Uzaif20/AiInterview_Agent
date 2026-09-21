import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

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

export const generateQuestion = async(req, res) =>{
  try {
    const {role, experience, mode, skills, projects, resumeText} = req.body

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if(!role || !experience || !mode){
      return res.status(400).json(
       { msg:"Role, experince and mode are required"}
      );}

      const user = await User.find(req.userId)

      if(!user){
        return res.status(404).json({
          msg:"User not found"
        });
      }

      if(user.credits < 50){
         return res.status(404=0).json({
           msg: "Not enough credits, minimum 50 required.",
         });
      }

      const projectText = Array.isArray(projects) && projects.length 
        ? projects.join(", ") : "None";

      const skillsText = Array.isArray(skillsText) && skillsText.length 
        ? skillsText.join(", ") : "None";

      const safeResume = resumeText?.trim() || "None";

      const userPrompt = `
      Role:${role},
      Experience:${experience},
      InterviewMode: ${mode},
      Projects : ${projectText},
      Skills: ${skillsText},
      Resume: ${safeResume}
      `

      if(!userPrompt.trim()){
        return res.status(400).json({
          msg: "Prompt content is empty."
        });
      }

      const message = [
        {
          role: "system",
          content: `
            You are a real human interviewer conducting real interview.

            Speak in simple, natural english as if you are directly talking to the candicate.

            Generate exactly 10 interview question.

            Strict rules:
            -Each question must contain between 15 to 20 words.
            -Each question must be a single complete question.
            -Do not number them
            -Do not add explanations.
            -Do not add extra text before and after.
            -One question per line only.
            -keep language simple and conservational.
            -Question must be feel practical and realistic.
            
            Difficulty progression:
              Question 1 → easy  
              Question 2 → easy  
              Question 3 → easy  
              Question 4 → medium  
              Question 5 → medium
              Question 6 → medium  
              Question 7 → medium  
              Question 8 → hard  
              Question 9 → hard  
              Question 10 → hard  

              Make questions based on the candidate’s role, experience,interviewMode,
               projects, skills, and resume details.
          `},
          {
        role: "user",
        content: userPrompt
      }
      ]; 

      const aiResponse = await askAi(message);

      if(!aiResponse || !aiResponse.trim()){
        return res.status(500).json({
          msg:"AI returned empty response"
        });
      }

      const questionsArray = aiResponse
      .split("\n")
      .map(q => q.trim())
      .slice(0,10);

      if(questionsArray.length === 0){
        return res.status(500).json({
          msg:"AI failed to generate question. "
        });
      }

      user.credits -=50;
      await user.save();

      const interview = await Interview({
        userId: user._id,
        role,
        experience,
        mode,
        resumeText: safeResume,
        question: questionsArray.map((q, index) => ({
          question:q,
          difficulty:["easy","easy","easy","medium","medium","medium","medium",
                      "hard","hard","hard"],
          timeLimit:[60,60,60,90,90,90,90,120,120,120][index],
        }))
      })

      res.json({
        interviewId: interview._id,
        creditsLeft: user.credits,
        userName: user.name,
        questions : interview.question 
      })

  } catch (error) {
     return res.status(500).json({
          msg:error.message
        });
  }
}

export const submitAnswer = async(req, res) => {
  try {
    const {interviewId, questionIndex, timeTaken, answer} = req.body;

    const interview = await Interview.findById(interviewId)
    const submitAnswer =  interview.questions[questionIndex]

    if(!answer){
      questions.score = 0;
      questions.feedback = "You did not submit an answer.";
      questions.answer = "";

      await interview.save();

      return res.json({
        feedback : question.feedback
      });
    }

    if(timeTaken > questions.timeLimit){
      question.score = 0;
      questions.feedback = "Time limit exced";

    }

  } catch (error) {
    
  }
}