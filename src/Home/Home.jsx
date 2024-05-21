import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import Book from '../Book/Book';

function Home() {
    const navigate = useNavigate();
    const [top5, setTop5] = useState([]);
    const [id, setId] = useState(null);

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

        fetchTop5Books();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Top 5 Bestselling Books</h2>
                <div className="flex flex-wrap justify-center space-x-6 space-y-6">
                    {top5.map((book, index) => (
                        <div key={book.id} onClick={() => setId(book.id)} className={`flex-none bg-white rounded-lg shadow-lg p-4 w-64 ${index > 2 ? 'mt-6' : ''}`}>
                            <img src={book.imageUrl} alt={book.name} className="w-full h-48 object-cover mb-4 rounded" />
                            <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                            <p className="text-gray-600">Sold: {book.soldCount}</p>
                        </div>
                    ))}
                </div>
            </div>
            {id && <Book onClose={() => setId(null)} id={id} />}
        </div>
    );
}

export default Home;
