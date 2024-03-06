import React, { useState, useRef, useEffect } from "react";

export const Stopwatch = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [elapseTime, setElapseTime] = useState(0);

   const IntervalRef = useRef(null);
   const startRef = useRef(0);

   useEffect(() => {
      if (isLoading) {
         IntervalRef.current = setInterval(() => {
            setElapseTime(Date.now() - startRef.current);
         }, 10);
      }

      return () => {
         clearInterval(IntervalRef.current);
      };
   }, [isLoading]);

   const start = () => {
      setIsLoading(true);
      startRef.current = Date.now() - elapseTime;
   };

   const stop = () => {
      setIsLoading(false);
   };

   const reset = () => {
      setIsLoading(false);
      setElapseTime(0);
   };

   const formateTime = () => {
      let hours = Math.floor(elapseTime / (1000 * 60 * 60));
      let minutes = Math.floor((elapseTime / (1000 * 60)) % 60);
      let seconds = Math.floor((elapseTime / 1000) % 60);
      let milliSeconds = Math.floor((elapseTime % 1000) / 10);

      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");
      milliSeconds = String(milliSeconds).padStart(2, "0");

      return `${minutes}:${seconds}:${milliSeconds}`;
   };

   return (
      <div className="stopwatch-container">
         <div className="display">{formateTime()}</div>
         <div className="controls">
            <button className="start" onClick={start}>
               Start
            </button>
            <button className="reset" onClick={reset}>
               Reset
            </button>
            <button className="stop" onClick={stop}>
               Stop
            </button>
         </div>
      </div>
   );
};
