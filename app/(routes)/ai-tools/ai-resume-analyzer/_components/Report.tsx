import ResumeUploadDialog from '@/app/(routes)/dashboard/_components/ResumeUploadDialog';
import { ArrowUp, Briefcase, Check, GraduationCap, Lightbulb, Sparkle, Star, ThumbsUp, UserCircle } from 'lucide-react'
import React, { useState } from 'react'

function Report({aiReport}: any) {

    const [openResumeUpload, setOpenResumeDialog] = useState(false);

       const colorMap = {
        red: {
            bg: 'bg-red-500',
            text: 'text-red-500',
            border: 'border-red-500',
            lightText: 'text-red-300'
        },
        yellow: {
            bg: 'bg-yellow-500',
            text: 'text-yellow-500',
            border: 'border-yellow-500',
            lightText: 'text-yellow-300'
        },
        green: {
            bg: 'bg-green-500',
            text: 'text-green-500',
            border: 'border-green-500',
            lightText: 'text-green-300'
        }
    };

    const getStatusColor = (per: number) => {
        if(per < 60) return 'red';
        if(per >= 60 && per <= 80 ) return 'yellow';
        return 'green';
    };

    const getColorClasses = (per: number) => {
        const color = getStatusColor(per);
        return colorMap[color];
    };

    // Get the overall score color
    const overallScore = aiReport?.overall_score || 0;
    const overallColors = getColorClasses(overallScore);

    // Section icons mapping to Lucide
    const sectionIcons = {
        contact_info: <UserCircle className="text-gray-500 mr-2 w-5 h-5" />,
        experience: <Briefcase className="text-gray-500 mr-2 w-5 h-5" />,
        education: <GraduationCap className="text-gray-500 mr-2 w-5 h-5" />,
        skills: <Lightbulb className="text-gray-500 mr-2 w-5 h-5" />
    };

    const sectionTitles = {
        contact_info: 'Contact Info',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills'
    };


  return (
    <div className='p-4'>
        <div className='flex justify-between items-center mb-5'>
            <h2 className='text-2xl font-bold text-gray-800 gradient-component-text'>AI Analysis Results</h2>
            <button 
                onClick={() => setOpenResumeDialog(true)}
                type='button' 
                className='relative inline-flex items-center justify-center
                  bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600
                  active:from-green-600 active:to-emerald-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 shadow-lg overflow-hidden group'>
                
                {/* Button content */}
                <span className='relative z-10 flex items-center'>
                  Re-analyze
                  <Sparkle className='ml-2 h-5 w-5 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110 group-active:rotate-360' />
                </span>

            </button>
        </div>

        {/* Overall score */}
        <div className='bg-gradient-to-r from-[#1800ad] to-[#d81478] rounded-lg shadow-md p-6 border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out mb-6'>
            <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                <Star className={`${overallColors.text} mr-2 w-5 h-5`}/>
                Overall Score
            </h3>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4'>
                <span className='text-6xl font-extrabold text-white'>
                    {aiReport?.overall_score}
                    <span className='text-2xl'>/100</span>
                </span>



                <div className='flex items-center'>
                    <ArrowUp className={`${overallColors.text} w-5 h-5 mr-2`} />
                    <span className={`${overallColors.lightText} text-lg font-bold`}>
                        {aiReport?.overall_feedback}
                    </span>
                </div>

            </div>


            <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
                <div 
                    className={`${overallColors.bg} h-2.5 rounded-full`} 
                    style={{ width: `${aiReport?.overall_score || 0}%` }}
                ></div>                
            </div>
            <p className='text-gray-200 text-sm'>{aiReport?.summary_comment}</p>
        </div>

        {/* Section Rating */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {['contact_info', 'experience', 'education', 'skills'].map((sectionKey) => {

                const section = aiReport?.section?.[sectionKey];
                const score = section?.score || 0;
                const colors = getColorClasses(score);

                return (
                    <div key={sectionKey} className={`bg-white rounded-lg shadow-md p-5 border-green-200 relative overflow-hidden group`}>
                        <h4 className='text-lg font-semibold text-gray-700 mb-3 flex items-center'>
            
                            {sectionIcons[sectionKey]}
                            {sectionTitles[sectionKey]}

                        </h4>
                        <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
                        <p className='text-sm text-gray-600 mt-2'>{section?.comment}</p>
                        <div className={`absolute inset-x-0 bottom-0 h-1 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                )
            })}
        </div>

        {/* Tips & Improvements */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200'>
            <h3 className='text-xl font-bold text-gray-700 mb-4 flex items-center'>
                <Lightbulb className='text-orange-400 mr-2' />
                Tips for Improvement
            </h3>
            <ol className='list-none space-y-4'>
                {aiReport?.tips_for_improvement.map((item: any, index: number) => (
                    <li key={index} className='flex items-start gap-4'>
                        <span className='flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold'>
                            <Check className='w-4 h-4' />
                        </span>
                        {/* <p className='font-semibold text-gray-800'>Quantify Achivements:</p> */}
                        <p className='text-gray-600 text-sm'>{item}</p>
                    </li>
                ))}
            </ol>
        </div>

        {/* Good & Needs Improvement */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div className='bg-white rounded-lg shadow-md p-5 border border-green-200'>
                <h3 className='text-lg font-bold text-gray-700 mb-3 flex items-center'>
                    <ThumbsUp className='w-5 h-5 text-green-500 mr-2' />
                    What's Good
                </h3>
                <ul className='list-disc list-inside text-gray-600 text-sm space-y-2'>
                    {aiReport?.whats_good.map((item: any, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='bg-white rounded-lg shadow-md p-5 border border-green-200'>
                <h3 className='text-lg font-bold text-gray-700 mb-3 flex items-center'>
                    <ThumbsUp className='w-5 h-5 text-green-500 mr-2' />
                    Needs Improvement
                </h3>
                <ul className='list-disc list-inside text-gray-600 text-sm space-y-2'>
                    {aiReport?.needs_improvement.map((item: any, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Call to Action */}
        <div className='bg-blue-600 text-white rounded-lg shadow-md p-6 text-center gradient-button-bg mb-4'>
            <h3 className='text-2xl font-bold mb-3'>Ready to refine your resume?</h3>
            <p className='text-base mb-4'>Make your application stand out with our premium insights and features.</p>
            <button type='button' className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'>
                Upgrade to Premium <i className='fas fa-arrow mi-2 text-blue-600'></i>
            </button>
        </div>

        <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeDialog={() => setOpenResumeDialog(false)} />
    </div>
  )
}

export default Report