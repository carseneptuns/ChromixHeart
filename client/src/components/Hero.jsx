import "../styles/hero.css";
import heroImage from "../assets/hero.png";
import featuredImage from "../assets/boots2.png"; // pindahkan ke assets
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlurText from "./BlurText";

function Hero() {

  const [isHover, setIsHover] = useState(false);
  const timeRef = useRef(null);

  const handleMouseEnter = () => {
    timeRef.current = setTimeout(() => {
      setIsHover(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeRef.current);
    setIsHover(false);
  };

  return (

    <section className="hero">

      <div className="container">

        <div className="hero-wrapper">

          {/* BIG TITLE */}

          <h1 className={`hero-overlay ${isHover ? "hide-content" : ""}`}>
            CHROMIXHEART
          </h1>

          {/* HERO IMAGE */}

          <img
            src={heroImage}
            alt="Hero"
            className={`hero-image ${isHover ? "hero-image-full" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* LEFT CONTENT */}

          <div
            className={`hero-content ${isHover ? "hide-content" : ""}`}
          >

            <div>

              <BlurText
                text="Where Darkness"
                className="hero-title"
                animateBy="words"
                direction="top"
              />

              <BlurText
                text="Becomes Style"
                className="hero-title"
                animateBy="words"
                direction="top"
                delay={180}
              />

            </div>

            <p>
              Discover gothic fashion, silver jewelry,
              boots, corsets and timeless accessories
              crafted for modern souls who embrace
              elegance beyond the ordinary.
            </p>

            <Link
              to="/shop"
              className="hero-btn"
            >
              Explore Collection →
            </Link>

          </div>

          {/* PRODUCT CARD */}

          <div className={`floating-card ${isHover ? "hide-content" : ""}`}>

            <img
              src={featuredImage}
              alt="Midnight Boots"
              className="floating-product"
            />

            <span>Featured</span>

            <h4>Midnight Boots</h4>

            <Link
              to="/shop"
              className="floating-btn"
            >
              View Product →
            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;