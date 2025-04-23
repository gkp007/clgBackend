import { useState, useEffect } from "react";
import { FaHome, FaInfoCircle, FaUserPlus, FaSignInAlt } from "react-icons/fa"; // import icons
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCounseling  = (label, path) => {
    setActive(label);
    navigate(path);

    if (toggle) {
      setToggle(false);
    }
  };


  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/" }, 
    { label: "Counselings", icon: <FaUserPlus />, path: "/counseling" }, 
    // { label: "Login/Signup", icon: <FaSignInAlt />, path: "/login" }, 
    // { label: "About", icon: <FaInfoCircle />, path: "/about" },
  ];


  return (
    <nav
      className={`w-full overflow-x-hidden left-0 right-0 top-0 z-50 transition-all duration-100 ${
        isSticky
          ? "fixed bg-light-orange shadow-md animate-fadeDown"
          : "relative bg-light-orange1"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
       <div className=" items-center cursor-pointer" onClick={() => navigate('/')}> 
          <img src={logo} alt="logo" className="w-30 h-14" />
          {/* You can add a brand name here if needed */}
        </div>

        {/* Desktop Links */}
       <ul className="hidden md:flex gap-8 text-[16px] text-orange font-bold items-center">
          {navItems.map(({ label, icon, path }) => (
            <li
              key={label}
              className={`flex items-center gap-2 cursor-pointer ${
                active === label
                  ? "text-orange-500 underline" 
                  : "text-black hover:text-orange-500 transition-colors" 
              }`}
            
              onClick={() => handleCounseling(label, path)}
            >
              {icon} {label}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
       <div className="md:hidden flex items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-orange text-xl font-bold" 
          >
            {toggle ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {toggle && (
        <ul className="md:hidden bg-green-50 px-6 pb-4 flex flex-col gap-4 animate-slideDown text-[16px] font-medium">
          {navItems.map(({ label, icon, path }) => (
            <li
              key={label}
              className={`flex items-center gap-2 cursor-pointer ${
                 active === label ? "text-orange-500" : "text-black"
              }`}
             
              onClick={() => handleNavClick(label, path)} 
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;