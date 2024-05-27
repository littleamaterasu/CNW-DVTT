import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import Book from '../Book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

function Home() {
    const navigate = useNavigate();
    const [top5, setTop5] = useState([]);
    const [id, setId] = useState(null);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role && role.includes('ROLE_ADMIN')) {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTop5Books = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getTopten?page=1`);
                const data = await response.json();
                setTop5(data);
            } catch (error) {
                console.error('Error fetching top 5 books:', error);
            }
        };

        const fetchCouponList = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/coupon/getAll`);
                const data = await response.json();
                const filteredCoupons = data.filter(coupon => dayjs(coupon.endTime).isAfter(dayjs()));
                setCoupons(filteredCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponList();
        fetchTop5Books();
    }, []);

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('../../Bookswall_generated.jpg')" }}>
            <div className="bg-black bg-opacity-50 min-h-screen">
                <Header />
                <div className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Top 10 Bestselling Books</h2>
                    <div className="flex flex-wrap justify-center space-x-6 space-y-6">
                        {top5.map((book, index) => (
                            <div
                                key={book.id}
                                onClick={() => setId(book.id)}
                                className={`flex flex-col ${index === 0 ? 'bg-yellow-500 transform scale-120' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-yellow-800' : 'bg-white'} h-300 rounded-lg shadow-lg p-4 w-64`}
                            >
                                <img
                                    src={book.imageUrl}
                                    alt={book.name}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                                    <p className="text-black flex-grow">Sold: {book.soldCount}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-center mt-12 mb-4 text-white">Available Coupons</h2>
                    <div className="flex flex-wrap justify-center space-x-6 space-y-6">
                        {coupons.map((coupon, index) => (
                            <div key={coupon.id} className={`flex-none ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-yellow-800' : 'bg-white'} rounded-lg shadow-lg p-4 w-64`}>
                                <div className="flex items-center mb-4">
                                    <FontAwesomeIcon icon={faTicketAlt} className="text-black text-3xl mr-2" />
                                    <h3 className="text-xl font-semibold">{coupon.name}</h3>
                                </div>
                                <p className="text-gray-600">ID: {coupon.id}</p>
                                <p className="text-gray-600">Quantity: {coupon.limit}</p>
                                <p className="text-gray-600">Min Order: {coupon.minPrice}VND</p>
                                <p className="text-gray-600">Max Discount: {coupon.maxDiscount}VND</p>
                                <p className="text-gray-600">Expires: {dayjs(coupon.endTime).format('DD-MM-YYYY')}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {id && <Book onClose={() => setId(null)} id={id} />}
            </div>
        </div>



    );
}

export default Home;
