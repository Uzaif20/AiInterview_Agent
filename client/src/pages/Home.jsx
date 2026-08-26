import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col">
      <Navbar></Navbar>

      <div className=" flex-1 px-6 py-20  ">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6 ">
            <div
              className=" flex items-center  bg-gray-100 text-gray-600
          text-sm px-4 py-2 gap-1 rounded-full"
            >
              <HiSparkles size={16} className="bg-green-50 text-green-600" />
              Ai Powered Smart Interview Platform
            </div>
          </div>
          <div className=" text-center mb-28">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold
            leading-tight max-w-4xl mx-auto"
            >
              Pratice Interview With
              <span className="relative inline-block">
                <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                  Ai Intelligence
                </span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg "
            >
              Role-based mock interview with smart follow-ups, adaptive
              difficulty and real-time performance evalution.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                whileHover={{ opacity: 0.6, scale: 1.03 }}
                whileTap={{ opacity: 0.9, scale: 0.9 }}
                className="bg-black text-white rounded-full px-10 py-4 text-2xl
              hover: opacity-90 transition shadow-md "
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview");
                }}
              >
                Start Interview
              </motion.button>
              <motion.button
                whileHover={{ opacity: 0.6, scale: 1.03 }}
                whileTap={{ opacity: 0.9, scale: 0.9 }}
                className="border border-black rounded-full px-10 py-4 text-2xl
              hover: bg-gray-100 transition  "
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history");
                }}
              >
                View History
              </motion.button>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row justify-center items-center
          gap-10 mb-28 "
          >
            {[
              {
                icon: <BsRobot size={28} />,
                step: "STEP 1",
                title: "Role & Experience Selection",
                desc: "AI adjust difficulty based on selected job role.",
              },
              {
                icon: <BsMic size={28} />,
                step: "STEP 2",
                title: "Smart Voice Interview",
                desc: "Dynamic follow-up question based on your resume.",
              },
              {
                icon: <BsClock size={28} />,
                step: "STEP 3",
                title: "Timer Based Simulation",
                desc: "Real interview pressure with time tracker.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                className={`
                  relative bg-white rounded-3xl border-2 border-green-100
                  hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md
                  hover:shadow-2xl
                  transition-all duration-300
                  ${index === 0 ? "rotate-[-4deg]" : ""} 
                   ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""} 
                    ${index === 0 ? "rotate-[-3deg]" : ""} 
                  `}
              >
                <div className="flex justify-center items-center mt-5 text-underline ">
                  {item.icon}
                </div>
                <div className="pt-10 text-center">
                  <div
                    className="text-xs text-green-600 font-semibold mb-2
                        tracking-wider "
                  >
                    {" "}
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-3"> {item.title} </h3>
                  <p className="text-gray-500 text-sm leading-realax">
                    {" "}
                    {item.desc}{" "}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-semibold text-center mb-23"
            >
              Advanced Ai{"  "}
              <span className="text-green-600">Capabilities</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Scores communication, technical accuracy and confidence.",
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interview",
                  desc: "Project-Specific question based on upload resume.",
                },
                {
                  image: pdfImg,
                  icon: <BsBarChart size={20} />,
                  title: "Downloadable PDF Report",
                  desc: "Detailed strength, weakness  and improvement insights.",
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "History & Analytics",
                  desc: "Track progress with performances graphs and topics analysis.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-8
              shadow-sm hover: shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-contain max-h-64"
                      />
                    </div>
                    <div className="w-full  md:w-1/2 ">
                      <div
                        className=" bg-green-50 text-green-600 flex w-12
                    h-12 rounded-xl items-center justify-center mb-6"
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-semibold text-center mb-23"
            >
              Multiple Interview{"  "}
              <span className="text-green-600">Modes</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  img: hrImg,
                  title: "HR Interview Mode ",
                  desc: "Behavioral and communication based evaluation.",
                },
                {
                  img: techImg,
                  title: "Technical Mode ",
                  desc: "Deep technical questioning based on selected role.",
                },
                {
                  img: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Basic tone and voice analysis insight.",
                },
                {
                  img: creditImg,
                  title: "Credit System",
                  desc: "Unlock premium interview sessions easily.",
                },
              ].map((mode, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-8
              shadow-sm hover: shadow-xl transition-all"
                >
                  <div className="flex items-center justify-center md:flex-row  gap-8">
                    <div className=":w-1/2 ">
                      <h3 className="font-semibold mb-3 text-xl">
                        {mode.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {mode.desc}
                      </p>
                    </div>
                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer></Footer>
    </div>
  );
}

export default Home;
