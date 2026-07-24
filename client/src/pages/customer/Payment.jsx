import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../../styles/payment.css";
import paymentBanner from "../../assets/payment-banner.png";
import qrisImage from "../../assets/qris.png";
import {
    getTransaction,
    confirmPayment
} from "../../services/transactionService";

function Payment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [proofImage, setProofImage] = useState(null);

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const res = await getTransaction(id);
            setTransaction(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert("Pilih metode pembayaran!");
            return;
        }

        if ((paymentMethod === "QRIS" || paymentMethod === "Bank Transfer") && !proofImage) {
            alert("Harap upload bukti pembayaran terlebih dahulu!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("payment_method", paymentMethod);
            if (proofImage) {
                formData.append("proof_payment", proofImage);
            }

            await axios.put(`https://chromixheart-copy-production.up.railway.app/api/transactions/${id}/pay`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Payment Success");
            navigate("/my-orders");

        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Payment Failed"
            );
        }
    };

    if (!transaction) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="payment-page">
            <div className="payment-wrapper">
                {/* LEFT */}
                <div className="payment-left">
                    <h1 className="payment-logo">
                        ChromixHeart
                    </h1>
                    <img
                        className="payment-banner"
                        src={paymentBanner}
                        alt="banner"
                    />
                </div>

                {/* RIGHT */}
                <div className="payment-right">
                    <h2>Payment</h2>
                    <div className="payment-divider"></div>

                    <h4>Order Summary</h4>
                    <div className="payment-order-list">
                        {transaction.items.map((item) => (
                            <div
                                className="payment-order-item"
                                key={item.produk_id}
                            >
                                <div>
                                    <p>{item.nama_produk}</p>
                                    <small>
                                        Qty : {item.quantity}
                                    </small>
                                </div>
                                <span>
                                    Rp {Number(item.subtotal).toLocaleString("id-ID")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="payment-total">
                        <span>Total</span>
                        <strong>
                            Rp {Number(transaction.total).toLocaleString("id-ID")}
                        </strong>
                    </div>

                    {/* ================= ALAMAT PENGIRIMAN ================= */}
                    <h4 style={{ marginTop: "25px" }}>
                        Shipping Address
                    </h4>
                    <div
                        style={{
                            background: "#121111",
                            padding: "15px",
                            borderRadius: "10px",
                            marginBottom: "20px"
                        }}
                    >
                        <p style={{ marginBottom: "15px" }}>
                            {transaction.alamat || "Alamat belum tersedia"}
                        </p>

                        {transaction.latitude && transaction.longitude && (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${transaction.latitude},${transaction.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-block",
                                    padding: "10px 15px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: "500"
                                }}
                            >
                                Lihat Lokasi di Google Maps 🗺️
                            </a>
                        )}
                    </div>

                    {/* ================= PAYMENT METHOD ================= */}
                    <h4>Payment Method</h4>
                    <div className="payment-method-box">
                        <label>
                            <input
                                type="radio"
                                value="Bank Transfer"
                                checked={paymentMethod === "Bank Transfer"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Bank Transfer
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="QRIS"
                                checked={paymentMethod === "QRIS"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            QRIS
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Cash On Delivery"
                                checked={paymentMethod === "Cash On Delivery"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash On Delivery
                        </label>
                    </div>

                    {/* ================= KONDISI JIKA PILIH BANK TRANSFER ================= */}
                    {paymentMethod === "Bank Transfer" && (
                        <div className="payment-info-box">
                            <p className="payment-info-title">Silakan transfer ke nomor rekening berikut:</p>
                            <p className="payment-bank-number">BCA: 1234567890 a.n ChromixHeart</p>

                            <p className="payment-warning">
                                *Masukkan nominal harga sesuai dengan harganya, jika tidak, pemesanan tidak akan diproses.
                            </p>

                            <label className="payment-upload-label">Upload Bukti Transfer:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProofImage(e.target.files[0])}
                                className="payment-upload-input"
                            />
                        </div>
                    )}

                    {/* ================= KONDISI JIKA PILIH QRIS ================= */}
                    {paymentMethod === "QRIS" && (
                        <div className="payment-info-box payment-qris-box">
                            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Scan QR Code di bawah ini:</p>

                            <img
                                src={qrisImage}
                                alt="QRIS"
                                className="payment-qris-image"
                            />

                            <p style={{ color: "red", fontSize: "13px", fontWeight: "bold", marginBottom: "10px" }}>
                                *Masukkan nominal harga sesuai dengan harganya, jika tidak, pemesanan tidak akan diproses.
                            </p>
                            <label className="payment-upload-label">Upload Bukti Pembayaran QRIS:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProofImage(e.target.files[0])}
                               className="payment-upload-input"
                            />
                        </div>
                    )}

                    {/* ================= KONDISI JIKA PILIH CASH ON DELIVERY ================= */}
                    {paymentMethod === "Cash On Delivery" && (
                       <div className="payment-info-box">
                            <p className="payment-cod-text">
                                Siapkan uang sesuai dengan harganya, jika pesanan akan datang
                            </p>
                        </div>
                    )}

                    <button
                        className="confirm-payment"
                        onClick={handlePayment}
                        style={{ marginTop: "20px" }}
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
