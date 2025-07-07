"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Report from '../_components/Report';

function AiResumeAnalyzer() {

  const {recordid} = useParams();
  const [pdfUrl, setPdfUrl] = useState();
  const [aiReport, setAiReport] = useState();

  useEffect(() => {
    recordid && GetResumeAnalyzerRecord();
  }, [recordid])

  const GetResumeAnalyzerRecord = async() => {
    const result = await axios.get('/api/history?recordId='+ recordid);
    console.log(result.data);
    setPdfUrl(result.data?.metaData);
    setAiReport(result.data?.content);
  }


  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 h-[83vh]'>
      <div className='col-span-2 overflow-auto border-r h-full'>
        <Report aiReport={aiReport}/>
      </div>

      <div className='col-span-2 overflow-y-auto p-4 h-full'>
        <h2 className='font-bold text-2xl mb-5'>Resume Preview</h2>
        <iframe
          src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
          width={'100%'}
          height={800}
          className='min-w-lg'
          style={{
            border: 'none',
            minHeight: '1000px',
          }}
        />
      </div>
    </div>
  )
}

export default AiResumeAnalyzer