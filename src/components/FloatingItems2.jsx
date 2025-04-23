import {  test1, test2, test3, test4 } from "../assets";

const FloatingItems2 = () => {
  return (
    <div className="absolute  z-20 w-full h-full top-0 left-0 z-0 overflow-hidden pointer-events-none">
    
      <div className="absolute left-[0%]  top-[35%] animate-floatSlow">
         <img
          src={test1}
          alt="star"
          className="w-[282px] h-[72.14px] object-contain"
        />
      </div>
      <div className="absolute left-[65%] top-[70%] animate-floatFast">
         <img
          src={test2}
          alt="star"
          className="w-[282px] h-[80.14px] object-contain"
        />
      </div>
      <div className="absolute absolute left-[65%] top-[8%] animate-floatBounce">
         <img
          src={test3}
          alt="star"
          className="w-[282px] h-[80.14px] object-contain"
        />
      </div>
     
    </div>
  );
};

export default FloatingItems2;