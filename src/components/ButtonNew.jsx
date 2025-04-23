import React from "react";

const ButtonNew = ({ styles }) => (
  <button type="button" className={`rounded-br-2xl rounded-tl-2xl py-4 px-24 font-poppins font-medium text-[18px] text-primary bg-orange1 outline-none  text-white px-6 py-3  shadow-[0px_10px_34px_rgba(255,166,34,0.8)] hover:bg-orange-600 transition ${styles}`}>
    Get Started
  </button>
);

export default ButtonNew;
