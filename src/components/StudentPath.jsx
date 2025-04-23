import { motion } from "framer-motion";
import { FaCheckCircle, FaPuzzlePiece, FaRupeeSign, FaSearch, FaStopwatch } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Apply",
    description: "Apply for the scholarship",
    icon: <FaPuzzlePiece className="text-white text-2xl" />,
    color: "bg-orange",
  },
  {
    title: "Test link",
    description: "We will send you the test link",
    icon: <FaSearch className="text-white text-2xl" />,
    color: "bg-blue-500",
  },
  {
    title: "Pass",
    description: "Get above 60% in the test",
    icon: <FaCheckCircle className="text-white text-2xl" />,
    color: "bg-purple-500",
  },
  {
    title: "Admission",
    description: "Take admission",
    icon: <MdOutlineRocketLaunch className="text-white text-2xl" />,
    color: "bg-red-500",
  },
  {
    title: "Reward",
    description: "Get the scholarship amount",
    icon: <FaRupeeSign className="text-white text-2xl" />,
    color: "bg-green-500",
  },
];

const StudentPath = () => {
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLine(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-20">
      {/* Background Floating Shapes */}
      <motion.div
        className="absolute w-40 h-40 bg-purple-400 rounded-full top-10 left-[-60px] blur-3xl opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-cyan-300 rounded-full bottom-10 right-[-40px] blur-2xl opacity-20"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Section Heading */}

      
      <div className="text-center mb-16">

        <div className="inline-block bg-[#009933] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 animate-bounce">
        Journey
      </div>
      
       <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        <span className="font-bold text-black text-orange bg-clip-text text-transparent">Roadmap</span> to get the scholarship.
      </h2>
     
        <p className="text-gray-600 py-8">Your step-by-step scholarship journey</p>
      </div>

      {/* Timeline */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex flex-col items-center text-center group"
          >
            {/* Glow Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className={`absolute w-28 h-28 rounded-full ${step.color} blur-xl opacity-30 z-0`}
            />

            {/* Icon with Hover Tilt & Glow */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative z-10 w-24 h-24 flex items-center justify-center rounded-full ${step.color} shadow-2xl transition-transform duration-300`}
            >
              {/* Sparkles on Hover */}
              <motion.div
                className="absolute w-4 h-4 bg-white rounded-full top-0 left-0 opacity-60 blur-sm"
                animate={{ x: [0, 20, -20, 0], y: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              {step.icon}
            </motion.div>

            {/* Title and Description */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="mt-8 font-bold  text-xl text-gray-800"
            >
              {step.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-gray-600 text-sm mt-1 max-w-[180px]"
            >
              {step.description}
            </motion.p>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={showLine ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="hidden md:block absolute right-[-80px] top-1/2 h-1 w-24 origin-left bg-gradient-to-r from-blue-500 via-indigo-300 to-gray-300 rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StudentPath;