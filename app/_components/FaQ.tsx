import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does your AI understand my career needs?",
      answer: "Our model uses transformer architecture trained on millions of career trajectories, analyzing patterns in skills, industries, and job market trends to provide hyper-personalized recommendations.",
      icon: "🧠"
    },
    {
      question: "What data does the resume analyzer consider?",
      answer: "We evaluate 37 key dimensions including ATS compatibility, skill density, achievement quantification, and industry-specific keyword optimization using our proprietary CareerBERT model.",
      icon: "📊"
    },
    {
      question: "Can the AI simulate different career paths?",
      answer: "Yes! Our multi-agent simulation environment can project 5-year outcomes for different paths, accounting for market trends, salary trajectories, and skill obsolescence risks.",
      icon: "🌐"
    },
    {
      question: "How often is your AI retrained?",
      answer: "We perform weekly incremental updates with new job market data and quarterly full retraining to ensure our recommendations reflect the current employment landscape.",
      icon: "🔄"
    },
    {
      question: "Is there human oversight on recommendations?",
      answer: "While our AI operates autonomously, all outputs are validated through our Career Assurance Layer (CAL) - a hybrid system combining algorithmic checks with human expert sampling.",
      icon: "👩‍💼"
    }
  ];

  return (
    <section className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text text-sm font-mono mb-3">
            AI-POWERED CAREER INTELLIGENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Career Knowledge Base
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Answers to common queries about our AI career optimization engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-start w-full p-6 text-left group"
              >
                <div className="mr-4 text-2xl">{faq.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-600 overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className={`ml-4 text-blue-500 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-green-200 shadow-xs mb-6">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-mono text-green-600">AI ASSISTANT ONLINE</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need personalized guidance?</h3>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            Our AI career coach can answer your unique questions in real-time
          </p>
          <button className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <span className="relative z-10 flex items-center">
              Chat with Career AI
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
}