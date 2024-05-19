import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Book() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getOne?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleGoBack = () => {
        window.history.back();
    };

    const addToCart = async (productId, price) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({ productId: productId, price: price }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const result = await response.json();
            toast.success('Added to cart successfully!');
        } catch (error) {
            toast.error('Error adding to cart');
            console.error("Error adding to cart:", error);
        }
    };

    if (!data) {
        return (
            <div>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <ToastContainer />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                        <img src={data.imageUrl} alt={data.name} className="w-full h-auto object-cover" />
                    </div>
                    <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
                        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
                        <p className="text-xl font-semibold text-gray-700 mb-2">${data.price} <span className="text-sm text-red-500">{data.discount ? `(Discount: ${data.discount}%)` : ''}</span></p>
                        <p className="text-gray-600 mb-2">Sold: {data.soldCount}</p>
                        <p className="text-gray-600 mb-2">In Stock: {data.remainedCount}</p>
                        <p className="text-gray-600 mb-2">Year: {data.year}</p>
                        <p className="text-gray-600 mb-2">Authors: {data.author}</p>
                        <p className="text-gray-600 mb-2">Categories: {data.category.join(', ')}</p>
                        <p className="text-gray-600 mb-2">Provider: {data.provider}</p>
                        <p className="text-gray-600 mb-2">Pages: {data.page}</p>
                        <p className="text-gray-600 mb-2">Cover: {data.cover}</p>
                        <p className="text-gray-600 mb-2">Weight: {data.weight}g</p>
                        <p className="text-gray-600 mb-2">Info: {data.info}</p>
                        <div className="flex space-x-4 mt-4">
                            <button onClick={() => addToCart(data.id, data.price)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Add to Cart</button>
                            <button onClick={handleGoBack} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;
