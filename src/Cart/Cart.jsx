import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import Header from "../Components/Header/Header";

function Cart() {
    const [cartList, setCartList] = useState([]);
    const [note, setNote] = useState("");
    const [couponId, setCouponId] = useState("");
    const [page, setPage] = useState(1);
    const [address, setAdress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/getCart?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data)
            data.forEach(element => {
                element.book.quantity = 0;
                element.book.orderId = element.orderId;
                setCartList(prev => [...prev, element.book]);
            });
            console.log(cartList)

        } catch (error) {
            console.error("Error fetching cart items:", error);
        }

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/getUser?id=${localStorage.getItem('id')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include'
            });
            const data = await response.json();
            setAdress(data.address);
            setPhone(data.phone);

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
    };

    const totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartList.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({
                    orderList: cartList.filter(item => item.quantity > 0).map(item => ({ orderId: item.orderId, quantity: item.quantity })),
                    note: note,
                    address: address,
                    phone: phone,
                    couponId: couponId,
                    pay: totalPrice
                }),
                credentials: 'include'
            });
            const data = await response.json();
            console.log("Order placed:", data);
        } catch (error) {
            console.error("Error placing order:", error);
        }
        console.log(cartList.filter(item => item.quantity > 0).map(item => ({ orderId: item.id, quantity: item.quantity })))
    };

    const invoiceItems = cartList.filter((item) => item.quantity > 0);

    return (
        <div className="container mx-auto">
            <Header />
            {cartList.length === 0 ? (
                <p className="text-center text-lg mt-8">No items in the cart</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
                        <ul>
                            {cartList.map((item) => (
                                <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4">
                                    <div className="flex items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-32 h-32 mr-4" />
                                        <span>{item.name}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleIncrement(item.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">+</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleDecrement(item.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2">-</button>
                                        <button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-1">
                        <div className>
                            <h2 className="text-2xl font-semibold mb-4">Invoice</h2>
                            <ul>
                                {invoiceItems.map((item) => (
                                    <li key={item.id}>
                                        {item.name} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <p className="text-lg">Total Quantity: {totalQuantity}</p>
                                <p className="text-lg">Total Price: ${totalPrice}</p>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2">
                                    Note:
                                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="border border-gray-400 px-2 py-1 rounded-md w-full" />
                                </label>
                                <label className="block mb-2">
                                    Coupon ID:
                                    <input type="text" value={couponId} onChange={(e) => setCouponId(e.target.value)} className="border border-gray-400 px-2 py-1 rounded-md w-full" />
                                </label>
                                <label className="block mb-2">Phone: {phone}</label>
                                <label className="block mb-2">Adress: {address}</label>
                            </div>
                            <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
