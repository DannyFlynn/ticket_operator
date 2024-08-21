"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const DarkModeBtn = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button className="w-[2.6rem]"></Button>
  }

  const toggleTheme = () => {
    
    setTheme(theme === "dark" ? "light" : "dark");
    
  }


  //variant="outline"

  return (
    <Button  size="icon" onClick={toggleTheme} className="w-[2.6rem]">
         {theme === "dark" ? (
        <Sun className="h-[1.6rem] w-[1.6rem]" />
      ) : (
        <Moon className="h-[1.6rem] w-[1.6rem]" />
      )}
    </Button>
  );
};

export default DarkModeBtn;
