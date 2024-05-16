import React, { useState } from "react";
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

    if (!isDataFetched) fetchData();

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
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Nhập từ khóa" value={keyword} onChange={handleInputChange} />
                <input type="submit" />
                <ul>
                    {filteredData.map((item, index) => (
                        <li key={index}
                            onClick={() => handleItemClick(item.id)}
                            style={{
                                cursor: 'pointer' // Đổi con trỏ chuột
                            }}>{item.name}</li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default SearchBar;
