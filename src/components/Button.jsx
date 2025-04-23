import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-24 font-poppins font-medium text-[18px] text-primary bg-orange1 rounded-[10px] outline-none  text-white px-16 py-3 rounded-xl shadow-[0px_10px_34px_rgba(255,166,34,0.8)] hover:bg-orange-600 transition ${styles}`}>
    Get Started
  </button>
);

export default Button;
