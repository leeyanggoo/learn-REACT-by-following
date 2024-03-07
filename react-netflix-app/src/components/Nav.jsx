import React, { useEffect, useState } from "react";

//
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav
      className={`${
        show && "bg-black"
      } fixed top-0 z-10 flex items-center justify-between w-full h-20 px-10 py-2 transition-all ease-in duration-500`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        onClick={() => {
          navigate("/");
          setSearchValue("");
        }}
        className="block object-contain cursor-pointer max-h-10"
      />

      <input
        value={searchValue}
        onChange={handleSearchChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
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
