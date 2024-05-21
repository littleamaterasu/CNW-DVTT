import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Book from "../../Book/Book";

function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestedItems, setSuggestedItems] = useState([]);

    const inputRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getAll?page=1`);
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

        // Filter suggestions based on input
        const filteredItems = inputKeyword.length > 0 ? data.filter(item => item.name.includes(inputKeyword)).slice(0, 5) : [];
        setSuggestedItems(filteredItems);

        // Show suggestions
        setShowSuggestions(true);
    };

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (keyword.trim() !== '') {
            navigate(`/search/keyword/${keyword}`);
        }
    };

    const handleItemClick = (itemId) => {
        setId(itemId);
        setShowSuggestions(false);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={inputRef}>
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
            {showSuggestions && (
                <ul className="mt-2" style={{ position: 'fixed', top: '50px', left: '39%', zIndex: '999', backgroundColor: '#fff', width: '20%' }}>
                    {suggestedItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(item.id)}
                            className="py-2 px-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            {id && <Book onClose={() => setId(null)} id={id} />}
        </div>
    );
}

export default SearchBar;
