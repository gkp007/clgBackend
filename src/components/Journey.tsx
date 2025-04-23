import { useEffect } from "react";
import eligibility from "../assets/eligibility.svg";
import logo from "../assets/logo.svg";

const points = [
    "Apply for scholarship.",
    "We will intimate you the test link through mail in some days.",
    "Pass the test (get above 60%).",
    "Take admission in the course.",
    "Get scholarship amount in your bank account.",
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
        <section className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            {/* Floating SVG blob */}
            <div className="absolute top-[-100px] left-[-100px] z-0 opacity-20">
                <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#A78BFA" d="M53.5,-57.5C67.3,-47.6,75.4,-28.8,75.3,-10.7C75.1,7.4,66.7,24.7,56.3,40.1C45.9,55.6,33.5,69.2,18.3,72.4C3,75.6,-15.2,68.4,-28.2,57.1C-41.3,45.8,-49.2,30.4,-53.6,14.6C-58,-1.2,-58.8,-17.3,-52.4,-30.3C-46.1,-43.3,-32.6,-53.3,-17.6,-61C-2.5,-68.7,13.9,-74.3,29.9,-71.2C45.8,-68.2,61.3,-56.4,53.5,-57.5Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Left: Text + Points */}
            <div className="w-full md:w-1/2 z-10">
                <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-green-300 animate-pulse">
                    Journey
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 fade-up opacity-0 translate-y-6 transition-all duration-700">
                    Your Journey
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
                <img src={eligibility} alt="Eligibility illustration" className="w-full max-w-lg mx-auto drop-shadow-lg" />

            </div>
            <div className="absolute bottom-[-100px] right-[-100px] z-0 opacity-20">
                <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#A78BFA" d="M53.5,-57.5C67.3,-47.6,75.4,-28.8,75.3,-10.7C75.1,7.4,66.7,24.7,56.3,40.1C45.9,55.6,33.5,69.2,18.3,72.4C3,75.6,-15.2,68.4,-28.2,57.1C-41.3,45.8,-49.2,30.4,-53.6,14.6C-58,-1.2,-58.8,-17.3,-52.4,-30.3C-46.1,-43.3,-32.6,-53.3,-17.6,-61C-2.5,-68.7,13.9,-74.3,29.9,-71.2C45.8,-68.2,61.3,-56.4,53.5,-57.5Z" transform="translate(100 100)" />
                </svg>
            </div>
        </section>
    );
};

export default EligibilitySection;
