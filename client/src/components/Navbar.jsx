import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

import NavbarSidebar from "./NavbarSidebar";
import UserSidebar from "./UserSidebar";

import {
  FiShoppingCart,
  FiMenu,
  FiUser,
} from "react-icons/fi";

function Navbar() {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <>
      <nav className="navbar chromix-navbar">

        <div className="container">

          <Link className="navbar-brand logo" to="/">
            ChromixHeart
          </Link>

          <div className="navbar-collapse">

            <ul className="navbar-nav mx-auto">

              <li><Link className="nav-link" to="/">Home</Link></li>
              <li><Link className="nav-link" to="/shop">Collections</Link></li>

              <li className="nav-item dropdown">

                <span
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Explore
                </span>

                <ul className="dropdown-menu custom-menu">

                  <li><Link className="dropdown-item" to="/clothes">Clothes</Link></li>
                  <li><Link className="dropdown-item" to="/skirt">Skirt</Link></li>
                  <li><Link className="dropdown-item" to="/shoes">Shoes</Link></li>
                  <li><Link className="dropdown-item" to="/jewellery">Jewellery</Link></li>
                  <li><Link className="dropdown-item" to="/accessories">Accessories</Link></li>

                </ul>

              </li>

              <li><Link className="nav-link" to="/about">About Us</Link></li>

            </ul>

            <div className="nav-icons">

              <button
                className="icon-btn"
                onClick={() => setIsUserOpen(true)}
              >
                <FiUser />
              </button>

              <button className="icon-btn">
                <FiShoppingCart />
              </button>

              <button
                className="menu-btn"
                onClick={() => setIsNavbarOpen(true)}
              >
                <FiMenu />
              </button>

            </div>

          </div>

        </div>

      </nav>

      <NavbarSidebar
        isOpen={isNavbarOpen}
        onClose={() => setIsNavbarOpen(false)}
      />

      <UserSidebar
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
      />

    </>
  );
}

export default Navbar;