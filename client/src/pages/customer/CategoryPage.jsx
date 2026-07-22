import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "../../styles/categoryPage.css";

import heroVideo from "../../assets/video/categoryHero.mp4";
import editorial1 from "../../assets/editorial/editorial1.jpg";
import editorial6 from "../../assets/editorial/editorial6.jpg";

function CategoryPage({

    category,
    title,
    subtitle

}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const res = await getProducts();

            const filtered = res.data.data.filter(
                item =>
                    item.kategori?.trim().toLowerCase() ===
                    category?.trim().toLowerCase()
            );

            setProducts(filtered);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="category-page">

            {/* ================= HERO ================= */}

            <section className="category-hero">

                <video
                    className="category-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src={heroVideo}
                        type="video/mp4"
                    />
                </video>

                <div className="category-overlay">

                    <div className="category-content">

                        <h1>{title}</h1>

                        <p>{subtitle}</p>

                    </div>

                </div>

            </section>

            {/* ================= BRAND STORY ================= */}

            <section className="brand-story">

                <span className="brand-story-subtitle">

                    CHROMIXHEART WOMAN

                </span>

                <h2 className="brand-story-title">

                    Gothic Elegance for Modern Women

                </h2>

                <p className="brand-story-text">

                    More than fashion, ChromixHeart is an expression of confidence,
                    mystery, and individuality. Inspired by timeless gothic aesthetics,
                    every silhouette is crafted to celebrate women who embrace elegance
                    without following ordinary trends. Our collections blend luxurious
                    textures, dramatic details, and refined craftsmanship into wearable
                    statements that embody strength, beauty, and sophistication.

                </p>

            </section>

            {/* ================= EDITORIAL ================= */}

            <section className="editorial-section">

                <div className="editorial-grid">

                    <div className="editorial-card">

                        <img
                            src={editorial1}
                            alt="Woman Gothic"
                        />

                        <span className="editorial-caption">

                            Gothic Woman

                        </span>

                    </div>

                    <div className="editorial-card">

                        <img
                            src={editorial6}
                            alt="Luxury Accessories"
                        />

                        <span className="editorial-caption">

                            Luxury Accessories

                        </span>

                    </div>

                </div>

            </section>

            {/* ================= PRODUCTS ================= */}

            <section className="category-products">

                <div className="collection-heading">

                    <span>
                        CHROMIXHEART COLLECTION
                    </span>

                    <h2 className="category-title">
                        Explore Collection
                    </h2>

                </div>
                {products.length === 0 ? (

                    <div className="category-empty">

                        <h3>No Products</h3>

                        <p>
                            There are no products available.
                        </p>

                    </div>

                ) : (

                    <>




                        {/* Product Grid */}

                        <div className="category-grid">

                            {products.map((product) => (
                                <div
                                    className="category-card"
                                    key={product.id}
                                >

                                    <img
                                        src={`https://chromixheart-production-6072.up.railway.app/uploads/products/${product.gambar}`}
                                        alt={product.nama_produk}
                                    />

                                    <div className="category-info">

                                        <span className="product-category">
                                            {product.kategori}
                                        </span>

                                        <h3 className="category-name">
                                            {product.nama_produk}
                                        </h3>

                                        <p className="category-price">
                                            Rp {Number(product.harga).toLocaleString("id-ID")}
                                        </p>

                                    </div>
                                </div>

                            ))}

                        </div>

                    </>

                )}

            </section>

        </div>

    );

}

export default CategoryPage;
