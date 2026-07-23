import { useEffect, useState } from "react";
import { getUserTransactions } from "../../services/transactionService";
import "../../styles/myOrders.css";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const res = await getUserTransactions(
                user.id
            );

            const grouped = Object.values(

                res.data.data.reduce((acc, item) => {

                    if (!acc[item.id]) {

                        acc[item.id] = {

                            id: item.id,
                            tanggal: item.tanggal,
                            total: item.total,
                            status: item.status,
                            payment_method: item.payment_method,

                            items: []

                        };

                    }

                    acc[item.id].items.push(item);

                    return acc;

                }, {})

            );

            console.log(res.data.data);

            setOrders(grouped);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="orders-page">

            <div className="orders-container">

                <h1>My Orders</h1>

                <p className="orders-subtitle">
                    Every piece tells a story.
                </p>

                {

                    orders.length === 0 ?

                        (

                            <div className="empty-orders">

                                <h3>No Orders Yet</h3>

                                <p>
                                    Your dark collection is still empty.
                                </p>

                            </div>

                        )

                        :

                        orders.map(order => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                <div className="order-header">

                                    <div>

                                        <h3>Order #{order.id}</h3>

                                        <p>
                                            {new Date(order.tanggal).toLocaleDateString("id-ID")}
                                        </p>

                                    </div>

                                    <span
                                        className={
                                            order.status === "Paid"
                                                ? "order-status paid"
                                                : "order-status pending"
                                        }
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                {

                                    order.items.map(item => (

                                        <div
                                            className="order-item"
                                            key={item.nama_produk}
                                        >

                                            <img
                                                src={`https://chromixheart-copy-production.up.railway.app/uploads/products/${item.gambar}`}
                                                alt={item.nama_produk}
                                            />

                                            <div>

                                                <h4>{item.nama_produk}</h4>

                                                <p>{item.kategori}</p>

                                                <p>
                                                    Qty : {item.quantity}
                                                </p>

                                                <p>
                                                    Price :
                                                    {" "}
                                                    Rp {Number(item.harga).toLocaleString("id-ID")}
                                                </p>

                                            </div>

                                        </div>

                                    ))

                                }

                                <div className="order-footer">

                                    <p>

                                        Payment :
                                        {" "}
                                        {order.payment_method || "-"}

                                    </p>

                                    <h2>

                                        Total Order

                                        <br />

                                        Rp {Number(order.total).toLocaleString("id-ID")}

                                    </h2>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default MyOrders;
