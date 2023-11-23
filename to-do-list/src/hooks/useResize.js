import { useState, useEffect } from "react";
import { SM, MD, LG, XL, XXL } from "../app/breakpoints";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SM && width < MD,
    isScreenMd: width >= MD && width < LG,
    isScreenLg: width >= LG && width < XL,
    isScreenXl: width >= XL && width < XXL,
    isScreenXxl: width >= XXL,
  };
};
