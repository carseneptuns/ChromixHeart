import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  return (
    <>
      <nav className="chromix-navbar">

        <div className="container navbar-wrapper">

          <Link className="logo" to="/">
            ChromixHeart
          </Link>

          <div className="navbar-content">

            {!isMobile && (

              <ul className="nav-menu">

                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Collections
                  </Link>
                </li>

                <li className="nav-item dropdown">

                  <span
                    className="nav-link dropdown-toggle custom-dropdown"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    Explore
                  </span>

                  <ul className="dropdown-menu custom-menu">

                    <li>
                      <Link className="dropdown-item" to="/clothes">
                        Clothes
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/skirt">
                        Skirt
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/shoes">
                        Shoes
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/jewellery">
                        Jewellery
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/accessories">
                        Accessories
                      </Link>
                    </li>

                  </ul>

                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>

              </ul>

            )}

            <div className="nav-icons">

              {/* User Sidebar */}
              <button
                className="icon-btn"
                onClick={() => setIsUserOpen(true)}
              >
                <FiUser />
              </button>

              {/* Cart */}
              <button className="icon-btn">
                <FiShoppingCart />
              </button>

              {/* Hamburger */}
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
        isMobile={isMobile}
      />

      <UserSidebar
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
      />
    </>
  );
}

export default Navbar;