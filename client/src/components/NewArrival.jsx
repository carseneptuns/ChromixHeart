import "../styles/newarival.css";

import corset from "../assets/corset.png";
import jewelry from "../assets/jewelry.png";
import boots from "../assets/boots.png";

import { Link } from "react-router-dom";

function NewArrival() {
  return (
    <section className="new-arrival">

      <div className="container">

        <div className="section-title">

          <span>NEW ARRIVAL</span>

          <h2>
            Darkness Never Goes Out of Style
          </h2>

          <p>
            Discover our newest gothic pieces crafted for modern souls,
            where timeless elegance meets the mystery of the night.
          </p>

        </div>

        <div className="arrival-grid">

          {/* ///left */}

          <div className="arrival-card large">

            <img src={corset} alt="" />

            <div className="arrival-content">

              <span>Editor's Pick</span>

              <h3>Velvet Corsets</h3>

              <Link
                to="/shop"
                className="arrival-btn"
              >
                Explore Collection →
              </Link>
            </div>

          </div>

         
          <div className="right-grid">

            <div className="arrival-card">

              <img src={jewelry} alt="" />

              <div className="arrival-content">

                <span>Dark Essentials</span>

                <h3>Silver Jewelry</h3>

                <Link
                  to="/shop"
                  className="arrival-btn"
                >
                  Explore →
                </Link>

              </div>

            </div>

            <div className="arrival-card">

              <img src={boots} alt="" />

              <div className="arrival-content">

                <span>Footwear</span>

                <h3>Leather Boots</h3>

                <Link
                  to="/shop"
                  className="arrival-btn"
                >
                  Explore →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default NewArrival;