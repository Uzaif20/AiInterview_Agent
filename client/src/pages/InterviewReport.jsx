import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ServerUrl } from '../App'
import Step3Report from '../components/Step3Report'

function InterviewReport() {

  const {id} = useParams()
  const[report, setReport] = useState(null)

  useEffect(()=> {
    const fetchReport = async() =>{
      try{
        console.log("Interview ID:", id);
        console.log("Request URL:", `${ServerUrl}/api/interview/report/${id}`);
        const result = await axios.get(ServerUrl + `/api/interview/report/${id}`,
           {withCredentials:true}
        );

        console.log(result);
        setReport(result.data)

      }catch(error){
        console.log(error)
      }
    }
    fetchReport()
  },[id])

  if(!report){
    return(
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>
            Loading..
        </p>
      </div>
    )
  }

  return <Step3Report report={report} />;

}

export default InterviewReport
