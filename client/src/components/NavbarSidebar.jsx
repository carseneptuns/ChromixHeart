import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "../styles/navbarSidebar.css";

function NavbarSidebar({ isOpen, onClose }) {
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? "show" : ""}`}
                onClick={onClose}
            />

            <div className={`navbar-sidebar ${isOpen ? "active" : ""}`}>

                <div className="sidebar-header">

                    <h2>Menu</h2>

                    <button onClick={onClose}>
                        <FiX />
                    </button>

                </div>

                <ul>

                    <li>
                        <Link to="/" onClick={onClose}>Home</Link>
                    </li>

                    <li>
                        <Link to="/shop" onClick={onClose}>Collections</Link>
                    </li>

                    <li>
                        <Link to="/clothes" onClick={onClose}>Clothes</Link>
                    </li>

                    <li>
                        <Link to="/skirt" onClick={onClose}>Skirt</Link>
                    </li>

                    <li>
                        <Link to="/shoes" onClick={onClose}>Shoes</Link>
                    </li>

                    <li>
                        <Link to="/jewellery" onClick={onClose}>Jewellery</Link>
                    </li>

                    <li>
                        <Link to="/accessories" onClick={onClose}>Accessories</Link>
                    </li>

                    <li>
                        <Link to="/about" onClick={onClose}>About Us</Link>
                    </li>

                </ul>

            </div>
        </>
    );
}

export default NavbarSidebar;