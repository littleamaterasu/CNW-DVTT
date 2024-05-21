import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Header/Header';

function OrderInfo({ order, onclose }) {
    const status = ['Removed', 'Awaiting payment', 'On delivering', 'Delivered'];

    if (!order) {
        return <div>Order not found.</div>;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <div className="flex justify-end">
                    <button onClick={onclose} className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-3xl font-bold mb-6">Order Information</h2>
                <div className="flex flex-col space-y-4">
                    <p><span className="font-bold text-lg">Order ID:</span> {order.orderId}</p>
                    <p><span className="font-bold text-lg">Book Name:</span> {order.book.name}</p>
                    <p><span className="font-bold text-lg">Book Price:</span> {order.book.price}</p>
                    <p><span className="font-bold text-lg">Book Image:</span> <img src={order.book.imageUrl} alt={order.book.name} className="w-32 h-auto" /></p>
                    <p><span className="font-bold text-lg">Sold Count:</span> {order.book.soldCount}</p>
                    <p><span className="font-bold text-lg">Status:</span> {status[order.status]}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;
