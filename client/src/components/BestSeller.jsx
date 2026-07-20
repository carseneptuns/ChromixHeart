import "../styles/bestseller.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import boots from "../assets/shoes.png";
import corset from "../assets/corseet.png";
import ring from "../assets/ring.png";
import bags from "../assets/bags.png";
import hoodie from "../assets/hoodie.png";

function BestSeller() {

    const products = [
        boots,
        corset,
        ring,
        bags,
        hoodie
    ];

    const [center, setCenter] = useState(2);

    const [pause, setPause] = useState(false);

    
    

    useEffect(() => {

        if (pause) return;

        
        const interval = setInterval(() => {

            setCenter(prev => {

                if (prev >= products.length - 1) {
                    return prev; // berhenti di gambar terakhir
                }

                return prev + 1;

            });

        }, 3000);


    
        return () => clearInterval(interval);

    }, [pause]);

    
    const getClass = (index) => {

        const diff = index - center;

        switch (diff) {

            case 0:
                return "center";

            case -1:
                return "left";

            case 1:
                return "right";

            case -2:
                return "far-left";

            case 2:
                return "far-right";

            default:
                return "hidden";

        }

    };

    return (

        <section className="best-seller">

            <div className="container">

                <div className="best-wrapper">

                    {/* LEFT */}

                    <div className="best-left">

                        <span>THE COVEN'S FAVORITES</span>

                        <h2>
                            Chosen By The Night.
                        </h2>

                        <p>
                            Our most desired gothic pieces.
                            Designed for those who embrace elegance,
                            mystery and timeless darkness.
                        </p>

                        <Link
                            to="/shop"
                            className="best-btn"
                        >
                            Explore Collection →
                        </Link>

                    </div>

                    {/* RIGHT */}

                    <div
                    // menjeda slider
                        className="best-right"
                        onMouseEnter={() => setPause(true)}
                        onMouseLeave={() => setPause(false)}
                    >

                        <div className="coverflow">

                            {/* ///pengulangan */}
                            {products.map((item, index) => (

                                <div
                                    key={index}
                                    className={`cover-item ${getClass(index)}`} //settinga efek visaual
                                    onMouseEnter={() => setCenter(index)}
                                    onClick={() => setCenter(index)}
                                >

                                    <img src={item} alt="" />

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default BestSeller;