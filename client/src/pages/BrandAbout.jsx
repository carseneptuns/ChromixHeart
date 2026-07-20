import { Link } from "react-router-dom";
import "../styles/brandabout.css";

import storyImage from "../assets/about.png";
import ctaVideo from "../assets/video/ctaVideo.mp4";
import storyBg from "../assets/storyBg2.jpg";
import TextType from "../components/TextType";

function BrandAbout() {

    return (

        <section className="brand-about">

            {/* // hero */}
            <div className="brand-hero">

                <div className="brand-overlay"></div>

                <div className="container">

                    <div className="brand-hero-content">

                        <span>DISCOVER CHROMIXHEART</span>

                        <h1>
                            Born From Darkness.
                            <br />
                            Crafted For Those
                            <br />
                            Who Dare To Stand Apart.
                        </h1>

                        <p>

                            We don't simply create fashion.
                            We create identities wrapped in
                            elegance, mystery, and confidence.

                        </p>

                    </div>

                </div>

            </div>

           {/* // our story */}

            <div className="container">

                <div className="story-section">

                    <div className="story-image">

                        <img
                            src={storyImage}
                            alt="Brand about"
                        />

                    </div>

                    <div
                        className="story-content"
                        style={{
                            backgroundImage: `url(${storyBg})`
                        }}
                    >

                        <span>OUR STORY</span>

                        <h2>
                            More Than Fashion.
                            <br />
                            It's A Statement.
                        </h2>

                        <p>

                            ChromixHeart was founded in 2026 with
                            one vision: to redefine gothic fashion
                            through timeless elegance.

                        </p>

                        <p>
                            Our journey began with a desire to bridge the gap between ancient
                            mystique and contemporary high fashion.
                            inspired by the haunting beauty of historical castles,
                            whispered legends, and the rich textures of the night, we bring a modern edge
                            to classic gothic silhouettes. every intricate piece we create acts as armor
                            for the soul—tailored specifically for individuals who embrace
                            their uniqueness instead of blending intp the ordinary.

                        </p>

                    </div>

                </div>

            </div>


           {/* // founder */}
            <section className="founder-message">

                <div className="container">

                    {/* // menampilkan text import dari TextType */}
                    <blockquote>

                        <TextType
                            text={[
                                "ChromixHeart wasn't created to make people look different.",
                                "It was created so people could finally look like themselves."
                            ]}
                            typingSpeed={60}
                            deletingSpeed={35}
                            pauseDuration={2500}
                            showCursor={false}
                            loop
                        />
                    </blockquote>

                    <span>
                        — Founder of ChromixHeart
                    </span>

                </div>

            </section>

            {/* // cal to action video */}
            <section className="brand-cta">

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="cta-video"
                >

                    <source
                        src={ctaVideo}
                        type="video/mp4"
                    />

                </video>

                <div className="cta-overlay"></div>

                <div className="container cta-content">

                    <h2>
                        Become Part Of ChromixHeart
                    </h2>

                    <p>

                        Discover the collection created
                        for modern souls.

                    </p>

                    <Link
                        to="/shop"
                        className="brand-btn"
                    >

                        Explore Collection →

                    </Link>

                </div>

            </section>

        </section>

    );

}

export default BrandAbout;