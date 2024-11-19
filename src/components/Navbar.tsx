import React, { useState } from "react";

const Navbar = ({}) => {
  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          Cinelist
        </a>
        <section className="menu">
          <ul>
            <li>
              <a href="">Genre</a>
            </li>
            <li>
              <a href="">New & Popular</a>
            </li>
            <li>
              <a href="">My List</a>
            </li>
            <li>
              <a href="">Browse by Languages</a>
            </li>
          </ul>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
