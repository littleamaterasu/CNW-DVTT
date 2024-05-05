import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';

function SearchResults({ type }) {
    const { genreName, keyword } = useParams();
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const url = 'http://172.11.0.231:8081';

    useEffect(() => {

        const fetchData = async () => {
            try {
                let searchResults = [];
                if (type === 'genre') {
                    // Thực hiện tìm kiếm theo thể loại
                    searchResults = await searchByGenre(genreName, currentPage);
                } else if (type === 'keyword') {
                    // Thực hiện tìm kiếm theo từ khóa
                    searchResults = await searchByKeyword(keyword, currentPage);
                    console.log(searchResults);
                }
                setResults(searchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [genreName, keyword, type, currentPage]);

    // Hàm tìm kiếm theo thể loại
    const searchByGenre = async (genreName, page) => {
        try {
            const response = await fetch(`${url}/category/getAllProduct?categoryName=${genreName}&page=${page}`);
            const data = await response.json();
            return data; // Assuming 'results' is the array of search results in the response
        } catch (error) {
            console.error('Error searching by genre:', error);
            return [];
        }
    };

    // Hàm tìm kiếm theo từ khóa
    const searchByKeyword = async (genreName, page) => {
        try {
            const response = await fetch(url + '/category/getAllProduct?categoryName=${genreName}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // You don't need to send the keyword in the request body for a GET request
                body: JSON.stringify({ genreName, page })
            });
            const data = await response.json();
            return data; // Assuming 'results' is the array of search results in the response
        } catch (error) {
            console.error('Error searching by keyword:', error);
            return [];
        }
    };

    const NextPage = () => {
        if (results.length > 1) setCurrentPage(prev => prev + 1);
    }

    const PreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    }

    const ShowBook = (id) => {
        navigate(`/book/id/${id}`)
    }

    return (
        <div>
            <Header />
            <h2>Search Results</h2>

            <h2>{currentPage}</h2>
            <button onClick={PreviousPage}>
                Previous Page
            </button>

            <ul>
                {results.map((result, index) => (
                    <li key={index} onClick={() => ShowBook(result.id)}>{result.name}</li>
                ))}
            </ul>

            <button onClick={NextPage}>
                Next Page
            </button>

        </div>
    );
}

export default SearchResults;
