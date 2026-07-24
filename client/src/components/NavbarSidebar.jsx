import { Link } from "react-router-dom";
import {
    FiX,
    FiPackage,
    FiShoppingCart,
    FiUser,
    FiLogOut,
    FiShoppingBag
} from "react-icons/fi";

import "../styles/navbarSidebar.css";

function NavbarSidebar({ isOpen, onClose, isMobile }) {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div
                className={`navbar-sidebar-overlay ${isOpen ? "show" : ""}`}
                onClick={onClose}
            />

            <div className={`navbar-sidebar ${isOpen ? "active" : ""}`}>

                <div className="navbar-sidebar-header">

                    <h2>
                        {isMobile ? "Menu" : "Account"}
                    </h2>

                    <button onClick={onClose}>
                        <FiX />
                    </button>

                </div>

                <ul>

                    {isMobile && (
                        <>

                            <li><Link to="/" onClick={onClose}>Home</Link></li>

                            <li><Link to="/shop" onClick={onClose}>Collections</Link></li>

                            <li><Link to="/clothes" onClick={onClose}>Clothes</Link></li>

                            <li><Link to="/skirt" onClick={onClose}>Skirt</Link></li>

                            <li><Link to="/shoes" onClick={onClose}>Shoes</Link></li>

                            <li><Link to="/jewellery" onClick={onClose}>Jewellery</Link></li>

                            <li><Link to="/accessories" onClick={onClose}>Accessories</Link></li>

                            <li><Link to="/about" onClick={onClose}>About Us</Link></li>

                            <hr />

                        </>
                    )}

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
                                    <FiPackage />
                                    Order Management
                                </Link>

                            </li>

                        </>
                    )}

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

                </ul>

            </div>

        </>
    );
}

export default NavbarSidebar;