import { motion } from "framer-motion";
import { FiArrowRight, FiCpu, FiBarChart2, FiCode, FiZap } from "react-icons/fi";




export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-grid-gray-900/[0.03] ">
      {/* Neuro-network background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-50/10 to-transparent"></div>
      </div>

      {/* Floating AI elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -100],
              x: Math.random() * 200 - 100
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className={`absolute ${i % 2 ? 'text-blue-400' : 'text-green-400'} text-xl`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`
            }}
          >
            {[<FiCpu />, <FiBarChart2 />, <FiCode />, <FiZap />][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Animated tech badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-200/70 text-sm  text-gray-800 p-1.5 ps-3 rounded-full shadow-xs hover:shadow-sm transition-all hover:border-green-300 group">
            <a href="" className="relative">
              <div className="absolute -inset-1 bg-green-400/30 blur rounded-full"></div>
              <div className="relative flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2. w-2.5 bg-green-500"></span>
                </span>
                <span>OPTILYTIC AI Career Agent - v2.3</span>
                <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-green-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400">
                    <FiArrowRight className="" />
                </span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Main headline with animated gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            <span className="relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-lg rotate-1 blur opacity-80 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
                Get Something With
              </span>
            </span>
            <br />
            <span className="relative mt-4 inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-green-500/10 rounded-lg -rotate-1 blur opacity-70"></span>
              <span className="relative font-extrabold text-transparent bg-clip-text bg-[length:300%_300%] bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 animate-gradient-shift">
                AI Agents
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Animated subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto text-center font-medium"
        >
          <p className="bg-white/80 backdrop-blur-sm px-1 rounded">
            Revolutionize your job getting with our AI-powered app, delivering engaging and high-quality analysis in seconds.
          </p>
        </motion.p>

        {/* Interactive CTA with floating particles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center relative"
        >
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-600/30 to-green-500/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <button className="relative group overflow-hidden px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600/90 hover:to-green-600/90 text-white font-medium text-lg shadow-lg transition-all duration-300">
            <span className="relative z-10 flex items-center gap-3">
              <span className="">
                <a href="/dashboard">Get Started</a>
              </span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>

        {/* Tech stack indicators */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center gap-6 opacity-80"
        >
          {['Transformers', 'LLM', 'Neural Nets', 'NLP', 'Deep Learning'].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-2 rounded-full shadow-xs">
              <div className={`h-2 w-2 rounded-full ${i % 2 ? 'bg-green-400' : 'bg-blue-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">{tech}</span>
            </div>
          ))}
        </motion.div> */}
      </div>
    </div>
  );
}