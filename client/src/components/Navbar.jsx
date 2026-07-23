import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";
import Sidebar from "./Sidebar";

import {
  FiShoppingCart,
  FiMenu,
  FiUser,
} from "react-icons/fi";

function Navbar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // LOGIN / LOGOUT
  const handleUserClick = () => {

    if (!user) {
      navigate("/login");
      return;
    }

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {

      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();

    }

  };

  // CART
  const handleCartClick = () => {

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/cart");

  };

  const goToAbout = () => {

    if (window.location.pathname === "/") {

      const section = document.getElementById("about");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth"
        });
      }

    } else {

      navigate("/");

      setTimeout(() => {

        const section = document.getElementById("about");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }

      }, 100);

    }

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg chromix-navbar">

        <div className="container">

          <Link className="navbar-brand logo" to="/">
            ChromixHeart
          </Link>

          <button
            className="navbar-toggler"
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }

              setIsSidebarOpen(true);
            }}
          >
            <FiMenu />
          </button>

          <div className="navbar-collapse">

            <ul className="navbar-nav mx-auto">

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
                  role="button"
                  data-bs-toggle="dropdown"
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
                <button
                  className="nav-link nav-btn"
                  onClick={goToAbout}
                >
                  About Us
                </button>
              </li>

            </ul>

            <div className="nav-icons">


              {/* USER */}
              <button
                className="icon-btn"
                onClick={handleUserClick}
              >
                <FiUser />
              </button>

              {/* CART */}
              <button
                className="icon-btn"
                onClick={handleCartClick}
              >
                <FiShoppingCart />
              </button>


            </div>

          </div>

        </div>

      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

    </>
  );
}

export default Navbar;