import React from 'react'
import AiToolCard from './AiToolCard'


export const aiToolsList = [
    {
        name:'AI Career Q&A Chat',
        desc:'Chat with AI Agent',
        icon:'/chat.png',
        button:'Lets Chat',
        path:'/ai-tools/ai-chat'
    },
    {
        name:'AI Resume Analyzer',
        desc:'Improve your resume',
        icon:'/analysis.png',
        button:'Analyze Now',
        path:'/ai-tools/ai-resume-analyzer'
    },
    {
        name:'AI Roadmap Generator',
        desc:'Build your roadmap',
        icon:'/map.png',
        button:'Generate Now',
        path:'/ai-tools/ai-roadmap-agent'
    },
    {
        name:'Cover Letter Generator',
        desc:'Write a cover letter',
        icon:'/cover.png',
        button:'Create Now',
        path:'/ai-tools/ai-cover-latter'
    },
]

const AiToolsList = () => {
  return (
    <div className='mt-7 p-5 bg-white border rounded-xl'>
        <h2 className='font-bold text-lg'>Available AI Tools</h2>
        <p>Start Building and Shape Your Career with this exclusive AI Tools</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
            {aiToolsList.map((tool:any, index) => (
                <AiToolCard tool={tool} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default AiToolsList