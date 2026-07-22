import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProduct,
    updateProduct
} from "../../services/productService";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        kode_produk: "",
        nama_produk: "",
        kategori: "",
        harga: "",
        stok: "",
        gambar: null,
        deskripsi: ""
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {

        try {

            const res = await getProduct(id);

            const product = res.data.data;

            setFormData({
                ...product,
                gambar: null
            });

            setPreview(
                `https://chromixheart-production-6072.up.railway.app/uploads/products/${product.gambar}`
            );

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        setFormData({
            ...formData,
            gambar: file
        });

        if (file) {
            setPreview(URL.createObjectURL(file));
        }

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("kode_produk", formData.kode_produk);
            data.append("nama_produk", formData.nama_produk);
            data.append("kategori", formData.kategori);
            data.append("harga", formData.harga);
            data.append("stok", formData.stok);
            data.append("deskripsi", formData.deskripsi);

            if (formData.gambar) {
                data.append("gambar", formData.gambar);
            }

            const res = await updateProduct(id, data);

            alert(res.data.message);

            navigate("/admin/products");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Gagal update produk"
            );

        }

    };

    return (

        <div className="container mt-4">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Kode Produk</label>

                    <input
                        type="text"
                        name="kode_produk"
                        className="form-control"
                        value={formData.kode_produk}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Nama Produk</label>

                    <input
                        type="text"
                        name="nama_produk"
                        className="form-control"
                        value={formData.nama_produk}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Kategori</label>

                    <input
                        type="text"
                        name="kategori"
                        className="form-control"
                        value={formData.kategori}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Harga</label>

                    <input
                        type="number"
                        name="harga"
                        className="form-control"
                        value={formData.harga}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Stok</label>

                    <input
                        type="number"
                        name="stok"
                        className="form-control"
                        value={formData.stok}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">

                    <label>Gambar Baru (Opsional)</label>

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    {preview && (

                        <div style={{ marginTop: "20px" }}>

                            <img
                                src={preview}
                                alt="Preview"
                                style={{
                                    width: "220px",
                                    height: "220px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    border: "2px solid #8b0000",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.2)"
                                }}
                            />

                        </div>

                    )}

                </div>

                <div className="mb-3">
                    <label>Deskripsi</label>

                    <textarea
                        name="deskripsi"
                        rows="5"
                        className="form-control"
                        value={formData.deskripsi}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning"
                >
                    Update Produk
                </button>

            </form>

        </div>

    );

}

export default EditProduct;
