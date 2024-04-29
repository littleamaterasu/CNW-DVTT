import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';

function SearchResults({ type }) {
    const { genreName, keyword } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let searchResults = [];
                if (type === 'genre') {
                    // Thực hiện tìm kiếm theo thể loại
                    searchResults = await searchByGenre(genreName);
                } else if (type === 'keyword') {
                    // Thực hiện tìm kiếm theo từ khóa
                    searchResults = await searchByKeyword(keyword);
                }
                setResults(searchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [genreName, keyword, type]);

    // Hàm tìm kiếm theo thể loại
    const searchByGenre = async (genreName) => {
        // API
        return [

        ];
    };

    // Hàm tìm kiếm theo từ khóa
    const searchByKeyword = async (keyword) => {
        // API
        return [

        ];
    };

    return (
        <div>
            <Header />
            <h2>Search Results</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{/* Hiển thị kết quả tìm kiếm */}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
