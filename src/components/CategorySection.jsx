import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
   {
    id: "01",
    title: "Placements & Internships",
     points: [
      "Placement Records & Alumni Network.",
      "Internship Opportunities.",
     
    ],
    icon: "💼",
    width: "w-1/4",
    row: 1,
  },
   {
    id: "02",
    title: "Location & Connectivity",
    points: [
      "Travel Accessibility",
      "PG and market availability",
    ],
    icon: "📍",
    width: "w-1/5",
    row: 1,
  },
  {
    id: "03",
    title: "Fees & ROI",
    points: [
      "Fee Structure & Scholarships.",
      "Education Loan Support.",
    ],
    icon: "💸",
    width: "w-1/4",
    row: 1,
  },
  {
    id: "04",
    title: " Infrastructure & Facilities",
    points: [
      "Labs & Equipments, Library.",
      "Hostel & Food Campus Environment.",
    ],
    icon: "🏫",
    width: "w-1/4",
    row: 1,
  },
  {
    id: "05",
    title: "Academics & Curriculum",
     points: [
      "Affiliation & Accreditation.",
      "Branch Availability.",
    ],
    icon: "🎓",
    width: "w-1/5",
    row: 2,
  },
  
  {
    id: "06",
    title: "Faculty & Teaching Quality",
     points: [
      "Qualified Professors.",
      "Modern teaching methods",
    ],
    icon: "👨‍🏫",
    width: "w-1/4",
    row: 2,
  },
  
 
  {
    id: "07",
    title: "Industry Exposure & Extra Opportunities",
     points: [
      "Workshops, Hackathons, Seminars & Certifications.",
      "Start-up/Incubation Support.",
     
    ],
    icon: "💻",
    width:"1/3",
  row:2,
  },
  {
    id: "08",
    title: "Reputation & Rankings",
     points: [
      "Student Reviews.",
      "Alumni Feedback.",
     
    ],
    icon: "🌐",
    width: "w-1/5",
    row: 2,
  },
  // {
  //   id: "01",
  //   title: "Campus Life",
  //    points: [
  //     "Clubs & Societies.",
  //     "Events & Fests.",
  //   ],
  //   icon: "🧑‍🎓",
  //   width: "w-1/5",
  //   row: 2,
  // },
 
  
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const CategorySection = () => {
  return (
    <section className="bg-gradient-to-tr from-[#fff0e6] to-[#ffffff] py-12 px-4 md:px-16 text-center">
      {/* <div className="inline-block bg-[#009933] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 animate-bounce">
        Checklist
      </div> */}
      <h2 className="text-3xl md:text-4xl font-semibold text-orange mb-10 leading-tight">
  Check <br />
        <span className="text-black">Before you taking <span className="text-orange"> admission</span></span>
      </h2>
         
      {/* Desktop layout */}
      <div className="hidden md:block space-y-8">
        {[1, 2].map((row) => (
          <div key={row} className="flex gap-6 justify-center">
            {categories
              .filter((item) => item.row === row)
              .map((item) => (
                <div
                  key={item.id}
                  className={`relative ${item.width} bg-white rounded-xl p-6 shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,106,0,0.4)] hover:ring-2 hover:ring-orange-200 group cursor-pointer`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <ul className="mt-6 space-y-4">
  {item.points?.map((point, index) => (
    <motion.li
      key={index}
      className="flex items-center text-center gap-3"
      variants={fadeUp}
      custom={index + 1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <FaCheckCircle className="text-green-500 text-md mt-1" />
      <span className="text-[13px] text-gray-800 font-medium leading-relaxed">
        {point}
      </span>
    </motion.li>
  ))}
</ul>

                  <span className="absolute bottom-4 right-4 text-[#f0dcdc] font-bold text-2xl">
                    {item.id}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-6 shadow-md relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 my-2">{item.description}</p>
            <div className="text-sm font-semibold text-orange-500 mt-4">
              {item.courses}
            </div>
            <span className="absolute bottom-4 right-4 text-[#f0dcdc] font-bold text-2xl">
              {item.id}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {/* <button className="mt-10 bg-gradient-to-r from-orange-500 to-red-400 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all font-semibold">
        See All Category
      </button> */}
    </section>
  );
};

export default CategorySection;