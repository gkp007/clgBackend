import React from "react";
import { user } from "../assets";

const testimonials = [
  {
    name: "Ankit R.",
    role: "B.Tech in CSE",
    image:user,
    text: "I got the right guidance just when I needed it. Now I'm in a great college and super happy with my course!",
  },
  {
    name: "Nikita J.",
    role: "ECE Student",
    image:user,
    text: "The counseling I got helped me compare everything properly—fees, location, placements—all of it.",
  },
  {
    name: "Rahul M.",
    role: "CSE Student",
 image:user,
    text: "With the help of 2nd scholarship I received, I found the right branch, applied for scholarships, and got in!",
  },
  {
    name: "Faisal A.",
    role: "B.Tech Student",
    image:user,
    text: "I wasn’t sure if I was even eligible for scholarships. It really lifted a huge financial burden off my family.",
  },
  {
    name: "Sneha T.",
    role: "B.Tech in IT",
    image:user,
    text: "I knew I wanted to go into tech, but I didn’t know which branch or college to pick. After talking to someone who actually listened to what I wanted, everything fell into place.",
  },
  {
    name: "Manoj B.",
    role: "Mechanical Engineering",
     image:user,
    text: "As someone from a small town, I felt lost. But the entire process was made simple for me—from shortlisting colleges to getting help with the forms.",
  },
  {
    name: "Pooja S.",
    role: "B.Tech Evening Batch",
   image:user,
    text: "I was also preparing for government exams and needed a college that gave me flexibility. I found one that fit perfectly with my schedule.",
  },
  {
    name: "Sambit P.",
    role: "Civil Engineering",
    image:user,
    text: "I didn’t want to just go where everyone else was going. I wanted to choose based on my priorities—and that’s exactly what I did.",
  },
  {
    name: "Priya S.",
    role: "EEE Student",
 image:user,
    text: "Honestly, I thought my marks wouldn’t get me anywhere good. But turns out I had more options than I imagined. I just needed the right push.",
  },
  {
    name: "Neha M.",
    role: "ECE",
    image:user,
    text: "My counselor actually asked me about my career goals, not just my marks. That helped me find a college that supports startups and entrepreneurship.",
  },
  {
    name: "Ashish N.",
    role: "Lateral Entry Student",
     image:user,
    text: "As a working professional, I was looking for lateral entry programs that wouldn’t clash with my job. I found a course that works for me without sacrificing quality.",
  },
  {
    name: "Shalini T.",
    role: "IT",
     image:user,
    text: "I didn’t even know hostel, library, and lab facilities differed so much between colleges. With proper guidance, I ended up choosing one with a great campus life.",
  },
  {
    name: "Riya K.",
    role: "B.Tech in AI",
    image:user,
    text: "I always wanted to be part of a college where workshops and hackathons were encouraged. Now I’m part of a college that supports all of that and more.",
  },
  {
    name: "Vivek D.",
    role: "CSE",
     image:user,
    text: "There are so many colleges out there—it’s easy to get confused. What helped me was talking to someone who understood the process and helped narrow it down.",
  },
  {
    name: "Deepak R.",
    role: "B.Tech Student",
    image:user,
    text: "I was honestly lost before counseling. Now, I’ve not only chosen a good college but also received a scholarship that helps with my tuition fees.",
  },
];



const Testimonials = () => {
  const columnCount = (window.innerWidth >= 1224) ? 3 : (window.innerWidth >= 640 ? 2 : 1);

  return (
    <div className="app bg-gradient-to-tr from-[#fff0e6] to-[#ffffff]">
     <div className="text-center mb-16 ">

         <div className="inline-block bg-[#009933] text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-[#b3ffcc] animate-pulse">
        Testimonials
      </div>
      
        <h2 className="text-4xl font-bold md:text-4xl text-black mb-10 leading-tight racking-tight">
          🌟 What our candidates says
        </h2>
      
      </div>
      <div className="columns-container ">
        {Array.from({ length: columnCount }).map((_, colIdx) => (
          <div key={colIdx} className="scroll-column">
            <div
              className={`scroll-inner ${
                colIdx % 2 === 0 ? "scroll-up" : "scroll-down"
              }`}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div className="testimonial-card bg-white rounded-xl p-8 mx-8 shadow-xs transition-all duration-400 transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,106,0,0.4)] group cursor-pointer " key={idx}>
                  <img src={t.image} alt={t.name} />
                  <div className="content text-wrap">
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="role text-sm">{t.role}</p>
                    <p className=" text-[12px] text-wrap">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;