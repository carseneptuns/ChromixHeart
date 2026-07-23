import { Link } from "react-router-dom";
import {
  FiX,
  FiShoppingBag,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiLogOut,
  FiClipboard
} from "react-icons/fi";

import "../styles/userSidebar.css";

function UserSidebar({ isOpen, onClose }) {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <div className={`user-sidebar ${isOpen ? "active" : ""}`}>

        <div className="sidebar-header">

          <h2>ChromixHeart</h2>

          <button onClick={onClose}>
            <FiX />
          </button>

        </div>

        <ul>

          {user?.role === "customer" && (
            <>
              <li>
                <Link to="/shop" onClick={onClose}>
                  <FiShoppingBag />
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/my-orders" onClick={onClose}>
                  <FiPackage />
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/cart" onClick={onClose}>
                  <FiShoppingCart />
                  My Cart
                </Link>
              </li>

              <li>
                <Link to="/profile" onClick={onClose}>
                  <FiUser />
                  Profile
                </Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/admin/products" onClick={onClose}>
                  <FiPackage />
                  Product Management
                </Link>
              </li>

              <li>
                <Link to="/admin/orders" onClick={onClose}>
                  <FiClipboard />
                  Order Management
                </Link>
              </li>
            </>
          )}

          {user ? (
            <li>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("user");
                  onClose();
                }}
              >
                <FiLogOut />
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={onClose}>
                <FiUser />
                Login
              </Link>
            </li>
          )}

        </ul>

      </div>
    </>
  );
}

export default UserSidebar;