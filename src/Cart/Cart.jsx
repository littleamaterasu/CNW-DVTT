import React, { useEffect, useState } from "react";

function Cart() {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // API nháp
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            const cartItems = data.map(item => ({ ...item, quantity: 0 }));
            setCartList(cartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cartList.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartList(updatedCart);
    };

    const handleIncrement = (id) => {
        const updatedCart = cartList.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartList(updatedCart);
    };

    const handleDecrement = (id) => {
        const updatedCart = cartList.map((item) => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartList(updatedCart);
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartList.map((item) => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: 0 };
            }
            return item;
        });
        setCartList(updatedCart);
    }

    const totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartList.reduce((total, item) => total + item.quantity * item.id, 0);

    const handleCheckout = () => {
        // Chuyển sang giao diện thanh toán
    };

    const invoiceItems = cartList.filter((item) => item.quantity > 0);

    return (
        <div>
            {cartList.length === 0 ? (
                <p>No items in the cart</p>
            ) : (
                <div>
                    <h2>Cart</h2>
                    <ul>
                        {cartList.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <button onClick={() => handleIncrement(item.id)}>+</button>
                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                                <div>
                                    <label>
                                        Quantity:{" "}
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </label>
                                    <span>Price: ${item.id}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
            <div>
                <h2>Invoice</h2>
                <ul>
                    {invoiceItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
                <div>
                    <p>Total Quantity: {totalQuantity}</p>
                    <p>Total Price: ${totalPrice}</p>
                </div>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
