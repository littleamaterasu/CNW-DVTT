import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function BoughtProducts() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/getProductSold?page=${page}`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts();
    }, [page]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Bought Products</h2>
            {list.length === 0 && <p>No products</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {list.map(product => (
                    <div key={product.bookId} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={product.coverImage} alt={product.bookName} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.bookName}</h3>
                            <p className="text-gray-600">Price: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={list.length === 0}
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default BoughtProducts;
