import React, { useEffect, useState } from "react";

//
import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav
      className={`${
        show && "bg-black"
      } fixed top-0 z-10 flex items-center justify-between w-full h-20 px-10 py-2 transition-all ease-in duration-500`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        onClick={() => window.location.reload()}
        className="block object-contain cursor-pointer max-h-10"
      />
      <img
        src="https://www.zenplates.co/assets/images/documentation/avatars/default.png"
        alt=""
        className="block object-contain rounded-full cursor-pointer max-h-10"
      />
    </nav>
  );
};

export default Nav;
