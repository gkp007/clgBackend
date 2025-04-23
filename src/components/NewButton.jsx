import React from "react";
import { FaRocket } from "react-icons/fa"; // Optional icon

const NewButton = ({ styles, onClick }) => (
  <button
     type="button"
    onClick={onClick}
    className={`
      relative group overflow-hidden
      rounded-tl-full rounded-br-full px-10 py-4
      font-poppins font-medium text-[18px] text-white
      bg-orange1 outline-none transition-all duration-300 ease-in-out
      transform shadow-[0px_10px_34px_rgba(255,166,34,0.8)]
      hover:scale-105 active:scale-95 cursor-pointer
      ${styles}
    `}
  >
    {/* Glow Border Pulse */}
    <span className="absolute inset-0 rounded-tl-full rounded-br-full border-2 border-orange-400 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none"></span>

    {/* Gradient Hover Overlay */}
    <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full rounded-br-full z-0"></span>

    {/* Button Content */}
    <span className="relative z-10 flex items-center justify-center gap-2">
      <FaRocket className="text-white group-hover:animate-bounce transition-transform duration-300" />
      Apply Now
    </span>
  </button>
);

export default NewButton;