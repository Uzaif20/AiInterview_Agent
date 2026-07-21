import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {motion} from "motion/react"
import { BsRobot } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import {ServerUrl} from "../App.jsx"
import axios from 'axios';
import { setUserData } from '../redux/userSlice.js';
import AuthModel from './AuthModel.jsx';


function Navbar() {
    const {userData} = useSelector((state)=> state.user)
    const [showCreditPop, setShowCreditPop] = useState(false)
    const [showUserPop, setShowUserPop] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] =useState(false)

    const handleLogout = async ()=>{
        try {
            await axios.post(ServerUrl + "/api/auth/logout",
                {},
                {withCredentials: true})
                dispatch(setUserData(null))
                setShowCreditPop(false)
                setShowUserPop(false)
                navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div 
    initial={{opacity:0, y:-40}}
    animate={{opacity:1, y:0}}
    transition={{duration:1.0}}
    className=' bg-[#f3f3f3] flex justify-center px-4 pt-6 '>
        <motion.div className='w-full max-w-6xl bg-white shadow-sm rounded-[24px] 
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
                    <button onClick={()=> {
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPop (!showCreditPop);
                        setShowUserPop (false)
                    } }
                    className='flex items-center gap-3 bg-gray-100
                    px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
                        <BsCoin size={20}/>
                        {userData?.credits || 0}
                    </button>
                    {showCreditPop && (
                        <div className='absolute right-[-50px] mt-3 w-60 bg-white shadow-xl 
                        border border-gray-200 rounded p-5 z-50'>
                            <p className='text-sm text-gray-700 mb-4'>
                                Need more credits to continue interviews?
                            </p>
                            <button onClick={()=>navigate("/pricing")} 
                            className='w-full bg-black text-white
                            py-2 rounded-lg text-sm'>Buy more credits</button>
                        </div>
                    )}
                </div>
                <div className='relative'>
                    <button onClick={()=> {
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPop (!showUserPop)
                        setShowCreditPop (false)
                    }} 
                    className='w-9 h-9 bg-black text-white rounded-full
                    font-semibold flex items-center justify-center'>
                        {userData?.name.slice(0,1).toUpperCase()
                        || <FaUserAlt size={18}/>}
                    </button>
                    {showUserPop && (
                        <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl 
                        border border-gray-200 rounded p-4 z-50'>
                            <p className='text-md text-blue-600 mb-4 font-medium mb-1'>
                                {userData?.name}
                            </p>
                            <button onClick={()=>navigate("/history")} 
                            className='w-full bg-white text-black border-2 border-black
                            py-1 rounded-lg text-sm mb-3 hover:bg-black hover:text-white'>
                                Interview History
                            </button>
                           <button onClick={handleLogout} 
                            className='w-full bg-red-500 text-white hover:bg-red-700
                            py-1 rounded-lg text-md font-medium flex items-center gap-2 justify-center'>
                                Log out <GrLogout size={15} />
                                </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
        {showAuth && <AuthModel onClose ={()=> setShowAuth(false)}/>}
    </div>
  )
}

export default Navbar
