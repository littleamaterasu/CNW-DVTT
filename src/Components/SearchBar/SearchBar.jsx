import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getAll`);
            const jsonData = await response.json();
            setData(jsonData);
            setIsDataFetched(true)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (!isDataFetched) {
            fetchData();
        }
    }, [isDataFetched]);

    const handleInputChange = (event) => {
        const inputKeyword = event.target.value;
        setKeyword(inputKeyword);
    };

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (keyword.trim() !== '') {
            navigate(`/search/keyword/${keyword}`);
        }
    };

    const handleItemClick = (userId) => {
        navigate(`/book/id/${userId}`);
    };

    const filteredData = keyword.length > 0 ? (isDataFetched ? data.filter(item => item.name.includes(keyword)).slice(0, 5) : []) : [];

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="flex items-center">
                <input
                    type="text"
                    placeholder="Nhập từ khóa"
                    value={keyword}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-grow"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                    Search
                </button>
            </form>
            <ul className="mt-2">
                {filteredData.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(item.id)}
                        className="py-2 px-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
