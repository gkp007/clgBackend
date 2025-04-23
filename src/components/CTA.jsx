import { useNavigate } from "react-router-dom";
import styles from "../style";
import Button from "./Button";



const CTA = () => {

  
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/counselor");
  };
  
  return (
      
    <section className={`${styles.flexCenter} $
  {styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 m-8 rounded-xl box-shadow`}>
    
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>Be our counselor!</h2>
        <p className={`${styles.paragraph} max-w-[670px] mt-5`}>
          Give your <span className="text-orange">honest feedback </span> about your college or any other colleges you know. You can <span className="text-green-700 font-bold"> earn upto  20k.</span>
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <button
  onClick={handleGetStarted}
  type="button"
  className={`group-hover:opacity-100 transition-opacity duration-300 outline-none transition-all duration-300 ease-in-out
    transform shadow-[0px_10px_34px_rgba(255,166,34,0.8)]
    hover:scale-105 active:scale-95 cursor-pointer py-4 px-24 font-poppins font-medium text-[18px] text-primary bg-orange1 rounded-[10px] outline-none text-white px-16 py-3 rounded-xl shadow-[0px_10px_34px_rgba(255,166,34,0.8)] transition ${styles}`}
>
  Start Now
</button>

      </div>
    </section>
  );
}

export default CTA;
