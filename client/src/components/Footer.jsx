import "../styles/footer.css";

import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-top">

          {/* LEFT */}

          <div className="footer-brand">

            <h2>ChromixHeart</h2>

            <p>
              Where darkness meets elegance.
              Crafted for souls who embrace timeless
              gothic fashion beyond the ordinary.
            </p>

            <div className="footer-social">

              <a href="#">
                <FiInstagram />
              </a>

              <a href="#">
                <FiFacebook />
              </a>

              <a href="#">
                <FiTwitter />
              </a>

            </div>

          </div>

          {/* SHOP */}

          <div>

            <h4>Shop</h4>

            <ul>

              <li><a href="#">New Arrival</a></li>

              <li><a href="#">Best Seller</a></li>

              <li><a href="#">Collections</a></li>

              <li><a href="#">Accessories</a></li>

            </ul>

          </div>

          {/* COMPANY */}

          <div>

            <h4>Company</h4>

            <ul>

              <li><a href="#">About Us</a></li>

              <li><a href="#">Our Story</a></li>

              <li><a href="#">Careers</a></li>

              <li><a href="#">Privacy Policy</a></li>

            </ul>

          </div>

          {/* CONTACT */}

          <div>

            <h4>Contact</h4>

            <ul className="contact">

              <li>
                <FiMail />
                support@chromixheart.com
              </li>

              <li>
                <FiPhone />
                +62 812-3456-7890
              </li>

              <li>
                <FiMapPin />
                Jakarta, Indonesia
              </li>

            </ul>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 ChromixHeart. All Rights Reserved.
          </p>

          <span>
            Designed with 🖤 for Gothic Souls
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;