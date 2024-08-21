"use client";

import DarkModeBtn from "./DarkModeBtn";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const [links, setLinks] = useState([
    { label: "Users", link: "/users" },
    { label: "Tickets", link: "/" },
  ]);

  const { data: session, status } = useSession();

 

  const isLoading = status === "loading";

  
  return (
    <nav className="w-full flex lg:flex-row flex-col overflow-x-hidden p-3 relative">
      <div>
        <h2 className="text-2xl font-bold">TechDech🖥️</h2>
      </div>
      <div className="w-full flex justify-evenly items-center mt-10  lg:flex-1 lg:justify-end  lg:mt-0 text-xl font-semibold">
        <NavLinks />
        {isLoading ? (
          <div>Loading...</div> // Replace with a spinner or other loading indicator if preferred
        ) : session?.user ? (
          <button onClick={() => signOut()} className="lg:mr-10">Logout</button>
        ) : (
          <button onClick={() => signIn("credentials")} className="lg:mr-10">Login</button>
        )}
        <div className="hidden lg:flex">
          <DarkModeBtn />
        </div>
      </div>
      <div className="flex lg:hidden absolute z-30 right-5">
        <DarkModeBtn />
      </div>
    </nav>
  );
};

export default NavBar;
