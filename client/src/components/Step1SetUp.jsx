import React from 'react'
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios";
import { ServerUrl } from '../App';
import { linkWithCredential } from 'firebase/auth';

function Step1Setup({onStart}) {
  
  const[role,setRole] = useState("");
  const [experience, setExperience] = useState("");
  const[mode,setMode] = useState("Technical");
  const[resumeFile,setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText,setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async() =>{
    if(!resumeFile || analyzing) return;
    setAnalyzing(true)

     const formData = new FormData();
     formData.append("resume", resumeFile);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formData,
        { withCredentials: true },
      );

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log("Frontend error:", error);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center
    justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
    >
      <div
        className="w-full max-w-6xl bg-white rounded-3xl 
      shadow-2xl grid md:grid-cols-2 overflow-hidden"
      >
        {/* Left side View */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative  bg-gradient-to-br from-green-50
         to-green-100 p-12 flex flex-col"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your Ai Interview
          </h2>
          <p className="text-gray-600 mb-10">
            Practice real interview scenario powered by Ai. Improve
            communication, technical skills and confidence.
          </p>
          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-green-600 text-xl" />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-green-600 text-xl" />,
                text: "Performance Analytics",
              },
            ].map((items, index) => (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 * index * 0.4 }}
                whileHover={{ scale: 1.03 }}
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl 
              shadow-sm cursor-pointer"
              >
                {items.icon}
                <span className="text-gray-700 font-medium">{items.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side View */}

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Interview Setup
          </h2>
          <div className="space-y-5">
            <div className="relative ">
              <FaUserTie className="absolute top-4 left-4 text-gray-400 " />

              <input
                type="text"
                placeholder="Enter Role"
                className="w-full pl-12 pr-4 py-3 border border-gray-200
                rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative ">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400 " />

              <input
                type="text"
                placeholder="Experience(e.g. 3 years)"
                className="w-full pl-12 pr-4 py-3 border border-gray-200
                rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-3 px-4  border border-gray-200
                rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="Technical">Technical</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-gray-600
                rounded-xl p-5 text-center cursor-pointer
                hover:bg-green-50 border-green-500 transition"
              >
                <FaFileUpload className="text-4xl text-green-500 mx-auto mb-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="font-medium text-gray-400">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume (Optional)"}
                </p>

                {resumeFile && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-4 bg-gray-900 text-white px-5 py-3 rounded-lg
                  hover:bg-gray-700 transition"
                  >
                    {analyzing ? "Analyzing.." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 border-gray-200 rounded-xl p-5 space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-700 ">
                  Resume Analysis Result{" "}
                </h3>
                {projects.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Projects:</p>
                    <ul className="list-inside list-disc text-gray-600 space-y-1">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-2 ">
                      {skills.map((s, i) => (
                        <span className='bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full '
                        key={i}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              disabled={!role || !experience}
              className="w-full disabled:bg-gray-600 bg-green-600 text-center 
            hover:bg-green-700 text-white py-3 rounded-full font-semibold
            text-lg transition duration-300 shadow-md"
            >
              Start Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1Setup
