import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {motion} from "motion/react"
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs"
import {HiSparkles} from "react-icons/hi"

function Home() {
  const{userData} = useSelector((state) => state.user)

  return (
    <div
    className='bg-[#f3f3f3] min-h-screen flex flex-col'>
      <Navbar></Navbar>

      <div className=' flex-1 px-6 py-20  '>
        <div className='flex justify-center mb-6 '>
          <div className=' flex items-center  bg-gray-100 text-gray-600
          text-sm px-4 py-2 gap-1 rounded-full'>
             <HiSparkles size={16} className='bg-green-50 text-green-600'/>
          Ai Powered Smart Interview Platform
          </div>
        </div>
          <div className=' text-center mb-28'>
            <motion.h1 
             initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.5}}
            className="text-4xl md:text-6xl font-bold
            leading-tight max-w-4xl mx-auto">
              Pratice Interview With 
              <span className='relative inline-block'>
                <span className='bg-green-100 text-green-600 px-5 py-1 rounded-full'>
                  Ai Intelligence
                </span>
              </span>
            </motion.h1>
            <motion.p
             initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
            className='text-gray-600 mt-6 max-w-2xl mx-auto text-lg '>
              Role-based mock interview with smart follow-ups,
              adaptive difficulty and real-time performance  evalution 
            </motion.p>
          </div>
      </div>
    </div>
    
  )
}

export default Home
