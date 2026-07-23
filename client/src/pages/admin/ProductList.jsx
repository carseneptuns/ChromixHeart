import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import "../../styles/productList.css";
import { addCart } from "../../services/cartService";
import bannerImage from "../../assets/banner1.png";
import bannerVideo from "../../assets/video/shopVideo.mp4";
import imgo from "../../assets/editorial/photo1.jpg";
import darkCollectionBg from "../../assets/collen.gif";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await addCart({
                user_id: user.id,
                produk_id: product.id,
                quantity: 1
            });
            alert("Produk berhasil ditambahkan ke keranjang 🛒");
        } catch (err) {
            console.log(err);
            alert("Gagal menambahkan ke keranjang");
        }
    };

    // Ambil data user dan status admin di atas sebelum return utama
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    if (loading) {
        return (
            <div className="shop-container">
                <h2 className="shop-title">Dark Collection</h2>
                <p className="loading-text">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="shop-container">
            <section
                className="shop-hero"
                style={{
                    backgroundImage: `
                    linear-gradient(
                        rgba(0,0,0,.45),
                        rgba(0,0,0,.75)
                    ),
                    url(${darkCollectionBg})
                    `
                }}
            >
                <div className="shop-hero-content">
                    <span>CHROMIXHEART COLLECTION</span>
                    <h1>Dark Collection</h1>
                    <p>
                        Where timeless darkness meets contemporary elegance.
                        Designed for souls who wear confidence without compromise.
                    </p>
                </div>
            </section>

            {products.length === 0 ? (
                <div className="empty-product">
                    <h3>No Products Available</h3>
                    <p>There are no products yet.</p>
                </div>
            ) : (
                <>
                    <div className="editorial-grid">
                        <div className="editorial-card video-card">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="editorial-video"
                            >
                                <source src={bannerVideo} type="video/mp4" />
                            </video>
                            <div className="editorial-overlay">
                                <span>EDITORIAL FILM</span>
                                <h3>
                                    Every Shadow
                                    <br />
                                    Tells A Story
                                </h3>
                            </div>
                        </div>

                        <div className="editorial-card">
                            <img src={imgo} alt="Luxury Bag" />
                            <div className="editorial-overlay">
                                <span>ACCESSORIES</span>
                                <h3>
                                    Crafted For
                                    <br />
                                    Modern Elegance
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid dengan Ukuran Seragam */}
                    <div className="product-grid-editorial">
                        {products.map((product) => (
                            <div className="product-card-editorial" key={product.id}>
                                <div className="image-wrapper">
                                    <img
                                        className="shop-product-image"
                                        src={
                                            product.gambar
                                                ? `https://chromixheart-copy-production.up.railway.app/uploads/products/${product.gambar}`
                                                : "/no-image.png"
                                        }
                                        alt={product.nama_produk}
                                    />
                                </div>

                                <div className="product-info">
                                    <span className="category">
                                        {product.kategori}
                                    </span>

                                    <div className="product-hover-trigger">
                                        <h3>{product.nama_produk}</h3>

                                        <div className="product-details-dropdown">
                                            <p className="description">
                                                {product.deskripsi ||
                                                    "A dark elegant piece crafted for your unique style."}
                                            </p>

                                            <div className="product-footer">
                                                <span className="price">
                                                    Rp {Number(product.harga).toLocaleString("id-ID")}
                                                </span>

                                                <div className="product-buttons">
                                                    <Link
                                                        to={`/shop/${product.id}`}
                                                        className="view-btn"
                                                    >
                                                        View More
                                                    </Link>

                                                    {/* Tombol Buy Now & Add to Cart hanya muncul jika BUKAN admin */}
                                                    {!isAdmin && (
                                                        <>
                                                            <Link
                                                                to={`/checkout/${product.id}`}
                                                                className="buy-btn"
                                                            >
                                                                Buy Now
                                                            </Link>

                                                            <button
                                                                className="cart-btn"
                                                                onClick={() => addToCart(product)}
                                                            >
                                                                🛒 Add to Cart
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ================= Banner ================= */}
                    <div
                        className="shop-banner"
                        style={{
                            backgroundImage: `
                            linear-gradient(
                                rgba(0,0,0,.15),
                                rgba(0,0,0,.15)
                            ),
                            url(${bannerImage})
                            `
                        }}
                    >
                        <div className="shop-banner-overlay">
                            <span className="banner-subtitle">
                                DARK COLLECTION
                            </span>
                            <h2 className="banner-title">
                                Fashion That Speaks Before You Do.
                            </h2>
                            <p className="banner-description">
                                Discover timeless silhouettes crafted with premium materials,
                                inspired by gothic elegance and modern sophistication.
                                Designed for those who wear confidence effortlessly.
                            </p>
                            <div className="banner-sign">
                                — ChromixHeart
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductList;