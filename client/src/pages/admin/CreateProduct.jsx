import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";

function CreateProduct() {

    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        kode_produk: "",
        nama_produk: "",
        kategori: "",
        harga: "",
        stok: "",
        gambar: null,
        deskripsi: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
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
        } else {
            setPreview(null);
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

            const res = await createProduct(data);

            alert(res.data.message);

            navigate("/admin/products");

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Gagal menambahkan produk"
            );

        }

    };

    return (

        <div className="container mt-4">

            <h2>Create Product</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label>Kode Produk</label>

                    <input
                        type="text"
                        name="kode_produk"
                        className="form-control"
                        value={formData.kode_produk}
                        onChange={handleChange}
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                    />

                </div>
                <div className="mb-3">

                    <label>Gambar</label>

                    <input
                        type="file"
                        name="gambar"
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
                        className="form-control"
                        rows="5"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                >
                    Simpan Produk
                </button>

            </form>

        </div>

    );

}

export default CreateProduct;