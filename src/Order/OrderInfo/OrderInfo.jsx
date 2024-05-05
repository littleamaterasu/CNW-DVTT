import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Header/Header';

function OrderInfo() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BASE_API_URL + '/...', {  //
                    method: '...',                                                          //
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order.');
                }
                const orderData = await response.json();
                setOrder(orderData);
            } catch (error) {
                console.error('Error fetching order:', error);
                toast.error('Failed to fetch order.');
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Order not found.</div>;
    }

    return (
        <div>
            <ToastContainer />
            <Header />
            <h2>Order Information</h2>
            <p>Order ID: {order.id}</p>
        </div>
    );
}

export default OrderInfo;
