import { FaArrowRight } from "react-icons/fa"; // Optional icon

const NewButton1 = ({ styles, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`
      relative group overflow-hidden
      border-2 border-orange text-orange
      bg-transparent px-10 py-4 font-poppins font-medium text-[18px]
      rounded-tl-full rounded-br-full transition-all duration-300 ease-in-out
      hover:bg-orange-500 hover:text-orange
      hover:shadow-[0px_10px_28px_rgba(255,165,0,0.4)]
      active:scale-95 cursor-pointer
      ${styles}
    `}
    >
        <span className="relative z-10 flex items-center justify-center gap-2">
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            Counseling
        </span>
    </button>
);

export default NewButton1;