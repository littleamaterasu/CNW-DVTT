import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { Link } from 'react-router-dom';

function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const [showCouponCreate, setShowCouponCreate] = useState(false);
    const fetchCoupons = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/coupon/getAll`, {
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

    useEffect(() => {
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
        <div className="book-list-container bg-gray-900 min-h-screen bg-cover bg-center p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Coupon List</h1>
                <Link to="/admin" className="text-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Admin
                </Link>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleFormToggle}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add New Coupon
            </button>

            <button
                onClick={fetchCoupons}
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
                <FontAwesomeIcon icon={faSync} className="mr-2" />
                Reload
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {coupons.map((coupon, index) => (
                    <div key={index} className="relative bg-white p-6 rounded shadow-lg">
                        <FontAwesomeIcon icon={faTicketAlt} className="absolute top-0 right-0 m-2 text-gray-600" />
                        <h2 className="text-xl font-semibold mb-2">{coupon.name}</h2>
                        <p className="text-gray-700">ID: {coupon.id}</p>
                        <p className="text-gray-700">Limit: {coupon.limit}</p>
                        <p className="text-gray-700">Discount Percent: {coupon.discountPercent}%</p>
                        <p className="text-gray-700">Discount Value: {coupon.discountValue}</p>
                        <p className="text-gray-700">Max Discount: {coupon.maxDiscount}</p>
                        <p className="text-gray-700">Min Price: {coupon.minPrice}</p>
                        <p className="text-gray-700">Start Time: {new Date(coupon.startTime).toLocaleString()}</p>
                        <p className="text-gray-700">End Time: {new Date(coupon.endTime).toLocaleString()}</p>
                        <p className="text-gray-700">Info: {coupon.info}</p>
                    </div>
                ))}
            </div>

            {showCouponCreate && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CouponCreate couponList={coupons} onNewCoupon={handleNewCoupon} onClose={handleFormToggle} />
                    </div>
                </div>
            )}
        </div>

    );
}

function CouponCreate({ onNewCoupon, couponList, onClose }) {
    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !limit || !discountPercent || !discountValue || !maxDiscount || !minPrice || !startTime || !endTime || !info) {
            toast.error('Please complete coupon form!');
            return;
        }

        const newCoupon = {
            name,
            limit: parseInt(limit),
            discountPercent: parseInt(discountPercent),
            discountValue: parseInt(discountValue),
            maxDiscount: parseInt(maxDiscount),
            minPrice: parseInt(minPrice),
            startTime,
            endTime,
            info,
        };

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/coupon/post`, {
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

            setName('');
            setLimit('');
            setDiscountPercent('');
            setDiscountValue('');
            setMaxDiscount('');
            setMinPrice('');
            setStartTime('');
            setEndTime('');
            setInfo('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Limit</label>
                        <input
                            type="number"
                            id="limit"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700">Discount Percent</label>
                        <input
                            type="number"
                            id="discountPercent"
                            value={discountPercent}
                            onChange={(e) => e <= 100 ? (e >= 0 ? setDiscountPercent(e.target.value) : setDiscountPercent(0)) : setDiscountPercent(100)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">Discount Value</label>
                        <input
                            type="number"
                            id="discountValue"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">Max Discount</label>
                        <input
                            type="number"
                            id="maxDiscount"
                            value={maxDiscount}
                            onChange={(e) => setMaxDiscount(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="info" className="block text-sm font-medium text-gray-700">Info</label>
                        <textarea
                            id="info"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className='flex justify-between'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close Form</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CouponList;
