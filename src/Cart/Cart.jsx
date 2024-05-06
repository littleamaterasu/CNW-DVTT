import React, { useEffect, useState } from "react";

function Cart() {
    const [cartList, setCartList] = useState([]);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [couponId, setCouponId] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Lấy danh sách sản phẩm từ API nháp
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            const cartItems = data.map(item => ({ ...item, quantity: 0 }));
            setCartList(cartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }

        // Lấy thông tin mặc định về địa chỉ và số điện thoại từ máy chủ
        try {
            const defaultInfoResponse = await fetch("https://yourserver.com/default-info");
            const defaultInfo = await defaultInfoResponse.json();
            setAddress(defaultInfo.address);
            setPhone(defaultInfo.phone);
        } catch (error) {
            console.error("Error fetching default info:", error);
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

    const handleCheckout = async () => {
        try {
            // Gửi yêu cầu đặt hàng lên máy chủ
            const response = await fetch("https://yourserver.com/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderList: cartList.filter(item => item.quantity > 0).map(item => ({ orderId: item.id, quantity: item.quantity })),
                    address: address,
                    phone: phone,
                    note: note,
                    couponId: couponId,
                    pay: totalPrice // Giả sử pay là tổng giá tiền của các sản phẩm trong giỏ hàng
                })
            });
            const data = await response.json();
            console.log("Order placed:", data);
        } catch (error) {
            console.error("Error placing order:", error);
        }
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
                <div>
                    <label>
                        Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <label>
                        Note:
                        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                    </label>
                    <label>
                        Coupon ID:
                        <input type="text" value={couponId} onChange={(e) => setCouponId(e.target.value)} />
                    </label>
                </div>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
