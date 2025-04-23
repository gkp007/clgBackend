import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const eligibilityPoints = [
  "Course fees.",
  "Percentage(%) got in scholarship test.",
  "Career marks from 10th, +2, graduation.(Which ever applicable)",
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

const FeatureCard = ({ icon, title, content, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={index + 1}
    className={`flex flex-row p-6 rounded-[20px] backdrop-blur-md bg-white/80 hover:scale-105 transition-transform duration-300 shadow-sm border border-gray-200 ${index !== features.length - 1 ? "mb-6" : "mb-0"}`}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-gradient-to-br from-green-100 to-green-100`}>
      <img src={icon} alt="star" className="w-[90%] h-[90%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-black text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </motion.div>
);

const Business = () => (
  <section
    id="features"
    className={`${layout.section} rounded-xl px-6 py-12 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden`}
  >
    {/* Decorative Shapes */}
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

     <div className="absolute bottom-[-100px] left-[-100px] z-0 opacity-20">
                <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#A78BFA" d="M53.5,-57.5C67.3,-47.6,75.4,-28.8,75.3,-10.7C75.1,7.4,66.7,24.7,56.3,40.1C45.9,55.6,33.5,69.2,18.3,72.4C3,75.6,-15.2,68.4,-28.2,57.1C-41.3,45.8,-49.2,30.4,-53.6,14.6C-58,-1.2,-58.8,-17.3,-52.4,-30.3C-46.1,-43.3,-32.6,-53.3,-17.6,-61C-2.5,-68.7,13.9,-74.3,29.9,-71.2C45.8,-68.2,61.3,-56.4,53.5,-57.5Z" transform="translate(100 100)" />
                </svg>
    </div>
    
    {/* Left Side: Eligibility */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={0}
      className={`${layout.sectionInfo}`}
    >
      <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-green-300 animate-pulse">
        Eligibility
      </div>

      <h2 className={`${styles.heading2} text-gray-800`}>
        Get <span className="font-bold text-black text-orange bg-clip-text text-transparent">scholarship, </span>
        <br className="sm:block hidden" />
        up to ₹30k.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-gray-700`}>
        Scholarship amount will be decided based on the below parameters.
      </p>

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

      
      
      <p className="text-xs py-4 text-red-600 font-medium leading-snug">
        <span className="text-red-500 text-xs mt-1">★</span>
        Note: This is additional scholarship apart from the state/central scholarships
  </p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={eligibilityPoints.length + 1}
      >
    
      </motion.div>
    </motion.div>

    {/* Right Side: Feature Cards */}
    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
        <div className="absolute top-[-200px] right-[-150px] z-0 opacity-20">
                <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#A78BFA" d="M53.5,-57.5C67.3,-47.6,75.4,-28.8,75.3,-10.7C75.1,7.4,66.7,24.7,56.3,40.1C45.9,55.6,33.5,69.2,18.3,72.4C3,75.6,-15.2,68.4,-28.2,57.1C-41.3,45.8,-49.2,30.4,-53.6,14.6C-58,-1.2,-58.8,-17.3,-52.4,-30.3C-46.1,-43.3,-32.6,-53.3,-17.6,-61C-2.5,-68.7,13.9,-74.3,29.9,-71.2C45.8,-68.2,61.3,-56.4,53.5,-57.5Z" transform="translate(100 100)" />
                </svg>
            </div>
    </div>
  </section>
);

export default Business;
