import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <NavBar />

      {/* Main Content - grows to push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default Body;
