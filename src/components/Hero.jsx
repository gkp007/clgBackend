import styles from "../style";
import { robot } from "../assets";
import NewButton from "./NewButton";
import FloatingItems from "./FloatingItems";
import NewButton1 from "./NewButton1";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/scholarship");
  };
  
  const handleGetStarted1 = () => {
    navigate("/counseling");
  };
  return (
    <section id="home" className={`flex bg-white md:flex-row flex-col`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>


        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[62px] text-[48px] text-black ss:leading-[100.8px] leading-[75px]">
            The 2nd <br className="sm:block hidden" />
            <span className="text-gradient font-bold">Scholarship</span>{" "}
            <span><h1 className="font-poppins font-semibold ss:text-[62px] text-[48px] text-black ss:leading-[100.8px] leading-[75px] w-full">
          For Eligible<span className="text-gradient font-bold"> Students</span>
        </h1></span>
          </h1>
        {/* <div className="absolute z-[30] w-[15%] h-[50%] bottom-26 left-0 blue__gradient" /> */}
        </div>
       <div className="flex flex-row items-center gap-10 mt-6">
<NewButton onClick={handleGetStarted} />
    <NewButton1 onClick={handleGetStarted1}/>
  </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0  relative`}>
       <img
  src={robot}
  alt="billing"
  className="hidden md:block w-[100%] h-[80%] -mt-20 z-10 relative z-[5]"
/>
        <FloatingItems  />
       
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;