import React from 'react'
import maleVideo from '../assets/Videos/maleVideo.mp4'
import femaleVideo from "../assets/Videos/female-ai.mp4";
import Timer from './Timer';


function Step2Interview({interviewData, onFinish}) {

 // const {interviewId, questions, userName} =  interviewData;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-emerald-50 via-white
    to-teal-100 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl
      shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden "
      >
        {/* Video Section */}
        <div
          className="w-full lg:w-[35%] bg-white flex flex-col items-center 
        p-6 space-y-6 border-r border-gray-200"
        >
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={femaleVideo}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Subtitle Pending */}

          {/* Timer Area */}

          <div
            className="w-full max-w-md bg-white border border-gray-200
            rounded-2xl shadow-xl p-6 space-y-5"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              <span className="text-sm font-semibold text-green-600">
                Ai is Speaking
              </span>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className=" flex justify-center">
              <Timer timeLeft="30" totalTime="60" />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="text-2xl font-semibold text-emerald-600">
                  1
                </span>
                <span className="text-es text-gray-400"> Current Question</span>
              </div>

              <div>
                <span className="text-2xl font-semibold text-emerald-600">
                  10
                </span>
                <span className="text-es text-gray-400"> Total Question</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div
          className="flex-1 flex flex-col p-4 sm:p-6 md:p-8  relative"
        ></div>
      </div>
    </div>
  );
}

export default Step2Interview
