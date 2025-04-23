import React, { useEffect } from "react";
import { counseling } from "../assets";
import ScholarshipSection from "./ScholarshipSection";
import CategorySection from "./CategorySection";
import Testimonials from "./Testimonials";
import CTAcounseling from "./CTAcounseling";

const points = [
  "Counseling helps avoid costly mistakes and confusion about courses, colleges, and careers..",
  "Choose the best college suited for you",
  "Every persons have different priorities.",
    "Filter colleges according to your priorities.",
];

const EligibilitySection = () => {
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
           <h2 className="text-2xl text-center md:text-4xl font-extrabold  text-orange mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        Personalized <span className="text-black ">College Counseling </span>
      </h2>
      
        <p className="text-gray-500 text-center mt-10   mb-0">
          <span className="text-black font-semibold text-center mt-2   mb-0">
      Not every college is meant for everyone.</span> Some offer great placements, others have better facilities, and some excel in academics.</p>
      <p className="text-gray-500 text-center mt-2   mb-0">
       Some are good for  <span className="text-black font-semibold text-center"> career oriented students </span> and some for <span className="text-black font-semibold text-center"> working professionals, govt. job preparation students </span> etc..</p>
      <p className="text-gray-500 text-center mt-2   mb-0">
       We ensure that you will get into the right college.</p>
            
    <section className=" min-h-screen py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">

          
          

      {/* Left: Text + Points */}
      <div className="w-full md:w-1/2 z-10">
        <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-green-300 animate-pulse">
          Counseling
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 fade-up opacity-0 translate-y-6 transition-all duration-700">
         Think what you need!!
        </h2>

        <ul className="space-y-4">
          {points.map((point, index) => (
            <li
              key={index}
              className="fade-up opacity-0 translate-y-6 transition-all duration-700 delay-150 bg-white border border-purple-200 rounded-xl px-5 py-4 flex items-start gap-3 shadow-md hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 group"
            >
              <span className="text-green-500 text-xl mt-1 group-hover:animate-pulse">✔️</span>
              <p className="text-gray-700 font-medium">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Illustration */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 z-10 fade-up opacity-0 translate-y-6 transition-all duration-700 delay-300">
        <img src={counseling} alt="Eligibility illustration" className="w-full max-w-lg mx-auto drop-shadow-lg" />
      </div>
            </section>
            <CategorySection />
            <ScholarshipSection />
            <Testimonials />
             <CTAcounseling/>
            </div>
  );
};

export default EligibilitySection;
