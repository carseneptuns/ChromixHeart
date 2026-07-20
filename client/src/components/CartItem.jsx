import "../styles/cartItem.css";
import { FiTrash2 } from "react-icons/fi";

function CartItem({
    image,
    title,
    category,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onDelete
}) {

    return (

        <div className="cart-item">


            <div className="cart-image">

                <img
                    src={image}
                    alt={title}
                />

            </div>

            <div className="cart-detail">

                <h3>{title}</h3>

                <p>{category}</p>

                <div className="cart-bottom">

                    <span className="cart-price">
                        Rp {Number(price).toLocaleString("id-ID")}
                    </span>

                    <div className="quantity-box">

                        <button onClick={onDecrease}>
                            -
                        </button>

                        <span>{quantity}</span>

                        <button onClick={onIncrease}>
                            +
                        </button>

                    </div>

                </div>

            </div>

            <button
                className="delete-btn"
                onClick={onDelete}
            >
                <FiTrash2 />
            </button>

        </div>

    );

}

export default CartItem;