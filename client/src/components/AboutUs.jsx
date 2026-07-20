import "../styles/about.css";
import aboutImage from "../assets/about.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about" className="about">

      <div className="container">

        <div className="section-title">

          <span>ABOUT US</span>

          <h2>
            Born From Darkness,
            <br />
            Crafted With Elegance.
          </h2>

        </div>

        <div className="about-wrapper">

          {/* LEFT */}

          <div className="about-image">

            <img
              src={aboutImage} alt="About ChromixHeart"
            />

            <div className="about-year">
              <h3>2026</h3>
              <p>Founded</p>
            </div>

          </div>

          {/* RIGHT */}

          <div className="about-content">

            <span>OUR STORY</span>

            <h3>
              Fashion Beyond
              <br />
              The Ordinary.
            </h3>

            <p>

              ChromixHeart was created for those who find
              beauty within darkness. Every collection blends
              gothic aesthetics, timeless craftsmanship,
              and modern luxury into wearable art.

            </p>

            <p>

              We believe clothing is more than fabric.
              It is identity, confidence, and the silent
              language of those who refuse to blend into
              the ordinary world.

            </p>

            <div className="about-info">

              <div>

                <h4>150+</h4>

                <span>Exclusive Pieces</span>

              </div>

              <div>

                <h4>100%</h4>

                <span>Premium Materials</span>

              </div>

              <div>

                <h4>24/7</h4>

                <span>Customer Care</span>

              </div>

            </div>

            <Link
              to="/brand-about" className="about-btn"
            >
              Discover More →
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;