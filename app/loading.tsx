"use client";
import ClockLoader from "react-spinners/ClockLoader";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const override: any = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  const { theme, resolvedTheme } = useTheme();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (resolvedTheme) {
      setColor(resolvedTheme === "dark" ? "#FF6B2D" : "#3378FF");
    }
  }, [resolvedTheme]);

  //change load color depening on dark mode or not
  if (!color) {
    return null;
  }

  return (
    <div className="w-full h-screen absolute z-20 top-0 flex justify-center items-center">
      <ClockLoader
        color={color}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;