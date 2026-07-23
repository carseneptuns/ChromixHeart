import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../services/productService";
import "../../styles/product.css";

function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await getProduct(id);

            console.log("Response API:", res.data);
            console.log("Data Produk:", res.data.data);

            setProduct(res.data.data);
        } catch (error) {
            console.log("ERROR GET PRODUCT:", error);
        }
    };

    if (!product) {
        return (
            <h3 style={{ marginTop: "150px", textAlign: "center" }}>
                Loading...
            </h3>
        );
    }

    const imageUrl = `https://chromixheart-copy-production.up.railway.app/uploads/products/${product.gambar}`;

    console.log("Nama gambar :", product.gambar);
    console.log("Image URL   :", imageUrl);

    return (
        <div className="detail-card">

            <div className="detail-image">

                <img
                    src={imageUrl}
                    alt={product.nama_produk}
                    onLoad={() => console.log("✅ Gambar berhasil dimuat")}
                    onError={(e) => {
                        console.log("❌ Gambar gagal dimuat");
                        console.log("URL:", imageUrl);

                        // supaya kelihatan kalau gagal
                        e.target.src = "https://placehold.co/400x500?text=Image+Not+Found";
                    }}
                />

            </div>

            <div className="detail-content">

                <h2>{product.nama_produk}</h2>

                <div className="detail-info">
                    <span className="detail-label">Kode Produk</span>
                    <span className="detail-value">
                        {product.kode_produk}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">Kategori</span>
                    <span className="detail-value">
                        {product.kategori}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">Harga</span>
                    <span className="detail-value">
                        Rp {Number(product.harga).toLocaleString("id-ID")}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">Stok</span>
                    <span className="detail-value">
                        {product.stok}
                    </span>
                </div>

                <div className="detail-description">
                    <h5>Deskripsi</h5>
                    <p>{product.deskripsi}</p>
                </div>

                {/* DEBUG */}
                <hr />
                <p>
                    <strong>Nama File:</strong> {product.gambar}
                </p>

                <p>
                    <strong>URL:</strong><br />
                    {imageUrl}
                </p>

                <Link
                    to="/shop"
                    className="btn btn-dark mt-4"
                >
                    ← Kembali ke Collection
                </Link>

            </div>

        </div>
    );
}

export default ProductDetail;