import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/orderManagement.css";

function OrderManagement() {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "https://chromixheart-copy-production.up.railway.app/api/orders"
            );
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `https://chromixheart-copy-production.up.railway.app/api/orders/${id}`,
                { status }
            );
            fetchOrders();
            setSelectedOrder(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="order-page">
            <h1>Order Management</h1>

            <table className="order-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7">
                                No Orders
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer_name}</td>
                                <td>
                                    Rp {Number(order.total).toLocaleString("id-ID")}
                                </td>
                                <td>{order.payment_method}</td>
                                <td>
                                    <span
                                        className={`status ${order.status}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            setSelectedOrder(order)
                                        }
                                    >
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="order-modal">
                    <div className="order-modal-card">
                        <h2>Order Detail</h2>

                        <p>
                            <strong>ID :</strong> {selectedOrder.id}
                        </p>

                        <p>
                            <strong>Customer :</strong> {selectedOrder.customer_name}
                        </p>

                        {/* ALAMAT PENGIRIMAN */}
                        <div
                            style={{
                                margin: "15px 0",
                                background: "#f8f9fa",
                                padding: "14px",
                                borderRadius: "8px",
                                border: "1px solid #ddd"
                            }}
                        >
                            <p
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                    color: "#222"
                                }}
                            >
                                📦 Alamat Pengiriman
                            </p>

                            <p
                                style={{
                                    margin: 0,
                                    whiteSpace: "pre-wrap",
                                    lineHeight: "1.6",
                                    color: "#444"
                                }}
                            >
                                {selectedOrder.alamat || "Alamat belum tersedia"}
                            </p>
                        </div>

                        <p>
                            <strong>Payment :</strong> {selectedOrder.payment_method}
                        </p>

                        <p>
                            <strong>Status :</strong> {selectedOrder.status}
                        </p>

                        <p>
                            <strong>Date :</strong> {new Date(selectedOrder.created_at).toLocaleString()}
                        </p>

                        {/* ================= BUKTI PEMBAYARAN (QRIS / BANK TRANSFER) ================= */}
                        {(selectedOrder.payment_method === "QRIS" || selectedOrder.payment_method === "Bank Transfer") && (
                            <div style={{ marginTop: "15px" }}>
                                <h4>Bukti Pembayaran</h4>
                                {selectedOrder.proof_payment ? (
                                    <img
                                        src={`https://chromixheart-copy-production.up.railway.app/uploads/${selectedOrder.proof_payment}`}
                                        alt="Proof of Payment"
                                        style={{
                                            width: "280px",
                                            maxHeight: "300px",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                            marginTop: "10px",
                                            border: "1px solid #ccc"
                                        }}
                                    />
                                ) : (
                                    <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                                        *Customer belum mengupload bukti pembayaran.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ================= KETERANGAN CASH ON DELIVERY ================= */}
                        {selectedOrder.payment_method === "Cash On Delivery" && (
                            <div style={{ marginTop: "15px", background: "#fff3cd", padding: "10px", borderRadius: "6px", border: "1px solid #ffeeba" }}>
                                <p style={{ color: "#856404", fontSize: "13px", margin: 0, fontWeight: "500" }}>
                                    ℹ️ Pembayaran Cash On Delivery (COD). Pastikan untuk menagih uang tunai saat pengiriman pesanan.
                                </p>
                            </div>
                        )}

                        <div
                            style={{
                                marginTop: "25px",
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap"
                            }}
                        >
                            <button onClick={() => updateStatus(selectedOrder.id, "Paid")}>
                                Approve
                            </button>
                            <button onClick={() => updateStatus(selectedOrder.id, "Rejected")}>
                                Reject
                            </button>
                            <button onClick={() => updateStatus(selectedOrder.id, "Shipped")}>
                                Ship
                            </button>
                            <button onClick={() => updateStatus(selectedOrder.id, "Completed")}>
                                Complete
                            </button>
                            <button onClick={() => setSelectedOrder(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;
