import { Button } from '@/components/ui/button'
import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className='p-5 bg-gradient-to-r from-green-500 to-blue-700 rounded-xl'>
        <h2 className='font-bold text-2xl text-white'>AI Career Coach Agent</h2>
        <p className='text-white mt-1'>Optilytic is a smart career platform that helps you analyze resumes, get advice, generate tailored cover letters, and follow role-specific job roadmaps all in one place.</p>
        <Button variant={'outline'} className='mt-4'>Let's Get Started</Button>
    </div>
  )
}

export default WelcomeBanner