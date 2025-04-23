import styles from "../style";
import Button from "./Button";

const CTAcounseling = () => (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2  box-shadow`}>
        <div className="flex-1 flex flex-col">
            <h2 className={styles.heading2}>Let’s start your counseling!</h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                You may save your Lakhs of rupees on course fees. Book one to one call and clarify all your doubts.
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
              <button type="button" className={` group-hover:opacity-100 transition-opacity duration-300 outline-none transition-all duration-300 ease-in-out
      transform shadow-[0px_10px_34px_rgba(255,166,34,0.8)]
      hover:scale-105 active:scale-95 cursor-pointer py-4 px-24 font-poppins font-medium text-[18px] text-primary bg-orange1 rounded-[10px] outline-none  text-white px-16 py-3 rounded-xl shadow-[0px_10px_34px_rgba(255,166,34,0.8)] transition ${styles}`}>
    Book Now @49
  </button>
        </div>
    </section>
);

export default CTAcounseling;
