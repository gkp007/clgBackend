import { scholarship, star } from "../assets";

const FloatingItems = () => {
  return (
    <div className="absolute  z-20 w-full h-full top-0 left-0 z-0 overflow-hidden pointer-events-none">
    
      <div className="absolute left-[10%] top-[40%] animate-floatSlow">
         <img
          src={star}
          alt="star"
          className="w-[282px] h-[132.14px] object-contain"
        />
      </div>
      <div className="absolute left-[25%] top-[15%] animate-floatSlow">
         <img
          src={star}
          alt="star"
          className="w-[282px] h-[80.14px] object-contain"
        />
      </div>
      <div className="absolute absolute left-[60%] top-[14%] animate-floatBounce">
         <img
          src={scholarship}
          alt="star"
          className="w-[282px] h-[80.14px] object-contain"
        />
      </div>
    </div>
  );
};

export default FloatingItems;