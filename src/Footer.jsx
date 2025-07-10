import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-4 py-2 text-sm">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.672 15.226l-2.432.811..." />
          </svg>
          <p>© {new Date().getFullYear()} DevTinder</p>
        </div>

        <div className="flex gap-3">
          <a>
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.557c-0.883..." />
            </svg>
          </a>
          <a>
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.615 3.184..." />
            </svg>
          </a>
          <a>
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 8h-3v4h3v12..." />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
