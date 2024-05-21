import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const [showCouponCreate, setShowCouponCreate] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch('', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch coupons');
                }
                const data = await response.json();
                setCoupons(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchCoupons();
    }, []);

    const handleNewCoupon = (newCoupon) => {
        setCoupons([...coupons, newCoupon]);
        setShowCouponCreate(false);
    };

    const handleFormToggle = () => {
        setShowCouponCreate(!showCouponCreate);
    };

    return (
        <div className="p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Coupon List</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleFormToggle}
            >
                {showCouponCreate ? 'Hide Form' : 'Add Coupon'}
            </button>
            {showCouponCreate && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleFormToggle}>Close</button>
                        <CouponCreate couponList={coupons} onNewCoupon={handleNewCoupon} />
                    </div>
                </div>
            )}
            <ul>
                {coupons.map((coupon, index) => (
                    <li key={index} className="border-b border-gray-300 py-4">
                        <h2 className="text-xl font-semibold mb-2">{coupon.code}</h2>
                        <p className="text-gray-700">Discount: {coupon.discount}%</p>
                        <p className="text-gray-700">Expiry Date: {coupon.expiryDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CouponCreate({ onNewCoupon }) {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCoupon = {
            code,
            discount,
            expiryDate,
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(newCoupon),
            });

            if (!response.ok) {
                throw new Error('Failed to create coupon');
            }

            const createdCoupon = await response.json();
            toast.success('Coupon created successfully!');
            onNewCoupon(createdCoupon);

            setCode('');
            setDiscount('');
            setExpiryDate('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                        type="date"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CouponList;
