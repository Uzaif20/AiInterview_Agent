import React from 'react'
import {useSelector} from 'react-redux'
import {motion} from "motion/react"
import { BsRobot } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";


function Navbar() {
    const {userData} = useSelector((state)=> state.user)

  return (
    <motion.div 
    initial={{opacity:0, y:-40}}
    animate={{opacity:1, y:0}}
    transition={{duration:1.0}}
    className=' bg-[#f3f3f3] flex justify-center px-4 pt-6 '>
        <div className='w-full max-w-6xl bg-white shadow-sm rounded-[24px] 
        border border-gray-200 px-8 py-4 flex justify-between items-center
        relative'>
            <div className='flex gap-4 item-center cursor-pointer'>
                 <div className='bg-black text-white p-2 rounded-lg '>
                    <BsRobot size={18}/>
                </div>
                <h1 className="font-semibold text-lg hidden md:block">
                    InterView.IQ
                </h1>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <button className='flex items-center gap-3 bg-gray-100
                    px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
                        <BsCoin size={20}/>
                        {userData?.credits || 0}
                    </button>
                </div>
                <div className='relative'>
                    <button className='w-9 h-9 bg-black text-white rounded-full
                    font-semibold flex items-center justify-center'>
                        {userData?.name.slice(0,1).toUpperCase()
                        || <FaUserAlt size={18}/>}
                    </button>
                </div>
                
            </div>
        </div>
    </motion.div>
  )
}

export default Navbar
