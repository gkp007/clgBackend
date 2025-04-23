import { useEffect } from "react";

const AboutStats = () => {
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
    <section className="bg-transparent py-14 px-6 md:px-20 text-center overflow-hidden">
      {/* Glowing Badge */}
      <div className="inline-block bg-[#009933] text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-[#b3ffcc] animate-pulse">
        Courses
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        We are <span className="font-bold text-black text-orange bg-clip-text text-transparent">continuously </span> expanding our offerings.
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto fade-up opacity-0 translate-y-6 transition-all duration-700 delay-150">
        Our mission: offering scholarship for a diverse range of courses.
      </p>

      {/* Stats Section */}
     <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-14 fade-up opacity-0 translate-y-6 transition-all duration-700 delay-300">
  {[
    { value: "MBA", label: "200+ colleges in Odisha" },
    { value: "MCA", label: "120+ colleges in Odisha" },
    { value: "B.TECH", label: "170+ colleges in Odisha" },
    { value: "DIPLOMA", label: "270+ colleges in Odisha" },
    { value: "BCA", label: "320+ colleges in Odisha" },
  ].map((stat, index) => (
    <div
      key={index}
      className="bg-white border border-green-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-lg px-6 py-8 w-64 transform hover:scale-105 hover:rotate-1  shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,106,0,0.4)] hover:ring-0.5 group cursor-pointer"
    >
      <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#009933] to-[#00cc44] bg-clip-text text-transparent animate-pulse">
        {stat.value}
      </h3>
      <p className="text-gray-600 mt-3 text-sm">{stat.label}</p>
    </div>
  ))}
</div>

    </section>
  );
};

export default AboutStats; 