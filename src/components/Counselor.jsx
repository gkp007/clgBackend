import React, { useEffect } from "react";
import { counseling, refer } from "../assets";
import styles, { layout } from "../style";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import InterestForm from "./InterestForm";

const eligibilityPoints = [
  "Give feedback of your college.",
  "You must be an current student or alumni of college.",
  "Give feedback of other college.",
  "You must be a recent passout student (upto 4 year).",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};


const Counselor = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-up").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <div>
           <h2 className="text-2xl font-semibold text-center md:text-4xl font-extrabold mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        Become a <span className="text-orange ">Counselor </span>
      </h2>
      
        <p className="text-gray-500 text-center mt-10   mb-0">
          
      Help us in counseling candidate by giving your honest feedback and get rewarded.</p>
            
    <section className=" min-h-screen py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">

          
          

      {/* Left: Text + Points */}
         <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={0}
      className={`${layout.sectionInfo}`}
    >
      <h2 className={`${styles.heading2} text-gray-800`}>
        You can get<span className="font-bold text-black text-orange bg-clip-text text-transparent"> reward</span>
        <br className="sm:block hidden" />
        up to ₹20k.
      </h2>
      {/* <p className={`${styles.paragraph} max-w-[470px] mt-5 text-gray-700`}>
        Scholarship amount will be decided based on the below parameters.
      </p> */}

      <ul className="mt-6 space-y-4">
        {eligibilityPoints.map((point, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3"
            variants={fadeUp}
            custom={index + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FaCheckCircle className="text-green-500 text-xl mt-1" />
            <span className="text-[16px] text-gray-800 font-medium leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
      
                    
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={eligibilityPoints.length + 1}
      >
    
      </motion.div>
    </motion.div>

      {/* Right: Illustration */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 z-10 fade-up opacity-0 translate-y-6 transition-all duration-700 delay-300">
        <img src={refer} alt="Eligibility illustration" className="w-full max-w-lg mx-auto drop-shadow-lg" />
      </div>
            </section>

            <InterestForm/>
            </div>
  );
};

export default Counselor;
