import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content text-sm px-4 py-3">
      <div className="max-w-7xl mx-auto text-center">
        © {new Date().getFullYear()} DevTinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
