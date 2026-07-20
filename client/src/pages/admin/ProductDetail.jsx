import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../services/productService";
import "../../styles/product.css";

function ProductDetail() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {

        try {

            const res = await getProduct(id);

            setProduct(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!product) {

        return <h3 style={{marginTop:"150px",textAlign:"center"}}>Loading...</h3>;

    }

    return (

        <div className="detail-card">

            <div className="detail-image">

                <img
                    src={`http://localhost:5000/uploads/products/${product.gambar}`}
                    alt={product.nama_produk}
                />

            </div>

            <div className="detail-content">

                <h2>{product.nama_produk}</h2>

                <div className="detail-info">
                    <span className="detail-label">
                        Kode Produk
                    </span>

                    <span className="detail-value">
                        {product.kode_produk}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">
                        Kategori
                    </span>

                    <span className="detail-value">
                        {product.kategori}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">
                        Harga
                    </span>

                    <span className="detail-value">
                        Rp {Number(product.harga).toLocaleString("id-ID")}
                    </span>
                </div>

                <div className="detail-info">
                    <span className="detail-label">
                        Stok
                    </span>

                    <span className="detail-value">
                        {product.stok}
                    </span>
                </div>

                <div className="detail-description">

                    <h5>Deskripsi</h5>

                    <p>
                        {product.deskripsi}
                    </p>

                </div>

                <Link
                    to="/admin/products"
                    className="btn btn-dark mt-4"
                >
                    ← Kembali
                </Link>

            </div>

        </div>

    );

}

export default ProductDetail;