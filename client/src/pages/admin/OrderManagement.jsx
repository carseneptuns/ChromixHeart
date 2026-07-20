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
                "http://localhost:5000/api/orders"
            );

            setOrders(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await axios.put(

                `http://localhost:5000/api/orders/${id}`,

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

                                    Rp {Number(order.total).toLocaleString()}

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

                        <p>

                            <strong>Total :</strong>

                            Rp {Number(selectedOrder.total).toLocaleString()}

                        </p>

                        <p>

                            <strong>Payment :</strong>

                            {selectedOrder.payment_method}

                        </p>

                        <p>

                            <strong>Status :</strong>

                            {selectedOrder.status}

                        </p>

                        <p>

                            <strong>Date :</strong>

                            {new Date(
                                selectedOrder.created_at
                            ).toLocaleString()}

                        </p>

                        {selectedOrder.proof_payment && (

                            <>

                                <h4>Bukti Pembayaran</h4>

                                <img

                                    src={`http://localhost:5000/uploads/${selectedOrder.proof_payment}`}

                                    alt="Proof"

                                    style={{
                                        width: "320px",
                                        borderRadius: "12px",
                                        marginTop: "15px"
                                    }}

                                />

                            </>

                        )}

                        <div
                            style={{
                                marginTop: "25px",
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap"
                            }}
                        >

                            <button
                                onClick={() =>
                                    updateStatus(
                                        selectedOrder.id,
                                        "Paid"
                                    )
                                }
                            >
                                Approve
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        selectedOrder.id,
                                        "Rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        selectedOrder.id,
                                        "Shipped"
                                    )
                                }
                            >
                                Ship
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        selectedOrder.id,
                                        "Completed"
                                    )
                                }
                            >
                                Complete
                            </button>

                            <button
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
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