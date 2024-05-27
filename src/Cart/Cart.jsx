import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Header from "../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import dayjs from 'dayjs';

function Cart() {
    const [cartList, setCartList] = useState([]);
    const [note, setNote] = useState("");
    const [couponId, setCouponId] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchData();
        fetchCoupons();
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
            data.forEach(element => {
                element.book.quantity = 0;
                element.book.orderId = element.orderId;
                setCartList(prev => [...prev, element.book]);
            });
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
            setAddress(data.address);
            setPhone(data.phone);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/coupon/getAll`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include'
            });
            const data = await response.json();
            const validCoupons = data.filter(coupon =>
                dayjs(coupon.endTime).isAfter(dayjs()) &&
                coupon.limit > 0
            );
            setCoupons(validCoupons);

        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
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
    const totalPrice = cartList.reduce((total, item) => total + item.quantity * item.price * (item.discountPercent ? 1 - item.discountPercent / 100.0 : 1), 0);

    const getCouponDiscount = () => {
        const coupon = coupons.find(coupon => coupon.id == couponId && totalPrice >= coupon.minPrice);
        if (!coupon) return 0;
        const discount = coupon.discountPercent ? (totalPrice * coupon.discountPercent / 100) : coupon.discountValue;
        return Math.min(discount, coupon.maxDiscount);
    };

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
                    pay: totalPrice - getCouponDiscount()
                }),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === -1) {
                toast.error(data.content);
                return;
            } else {
                navigate('/payment/list');
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const invoiceItems = cartList.filter((item) => item.quantity > 0);

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('../../cart.jpg')" }}
        >
            <Header />
            <ToastContainer />
            {cartList.length === 0 ? (
                <p className="text-center text-5xl text-black mt-8">No items in the cart</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <ul className="border-2 shadow-lg bg-gray-200 rounded-lg m-10 p-10">
                            {cartList.map((item) => (
                                <li key={item.orderId} className="flex justify-between items-center bg-gray-100 mb-10 mt-10 p-5">
                                    <div className="flex items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-32 h-32 mr-4" />
                                        <div>
                                            <h2 className="text-2xl">{item.name}</h2>
                                            <p>{item.price} VND</p>
                                        </div>
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
                        <div className="border-2 shadow-lg bg-gray-200 rounded-lg m-10 p-10 bg-gray-80">
                            <h2 className="text-2xl font-semibold m-10">Invoice</h2>
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
                                <p className="text-lg">Discount: -${getCouponDiscount()}</p>
                                <p className="text-lg">Final Price: ${totalPrice - getCouponDiscount()}</p>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2">
                                    Note:
                                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="border border-gray-400 px-2 py-1 rounded-md w-full" />
                                </label>
                                <label className="block mb-2">
                                    Coupon:
                                    <select value={couponId} onChange={(e) => setCouponId(e.target.value)} className="border border-gray-400 px-2 py-1 rounded-md w-full">
                                        <option value="">Select a coupon</option>
                                        {coupons.map(coupon => (
                                            <option key={coupon.id} value={coupon.id} style={{ overflowX: 'scroll' }}>
                                                {coupon.name} - {coupon.minPrice <= totalPrice ? `Min: $${coupon.minPrice}, Max Discount: ${coupon.maxDiscount}VND------` : `Not eligible`}
                                            </option>

                                        ))}
                                    </select>
                                </label>
                                <label className="block mb-2">Phone: {phone}</label>
                                <label className="block mb-2">Address: {address}</label>
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
