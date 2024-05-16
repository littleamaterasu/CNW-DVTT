import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Preview from '../Components/Preview/Preview';
import { API_BASE_URL } from '../config';

function SearchResults({ type }) {
    const { genreName, keyword } = useParams();
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResult, setSelectedResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let searchResults = [];
                if (type === 'genre') {
                    searchResults = await searchByGenre(genreName, currentPage);
                } else if (type === 'keyword') {
                    searchResults = await searchByKeyword(keyword, currentPage);
                }
                console.log('ok');
                setResults(searchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [genreName, keyword, type, currentPage]);

    const searchByGenre = async (genreName, page) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}`);           // API
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching by genre:', error);
            return [];
        }
    };

    const searchByKeyword = async (keyword, page) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getWithKeyword`, {          // API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword, page })
            });
            const data = await response.json();
            return data;
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

    const HandleClosePreview = () => {
        setSelectedResult(null);
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
                    <li key={index} onClick={() => setSelectedResult(result)}>{result.name}</li>
                ))}
            </ul>

            <button onClick={NextPage}>
                Next Page
            </button>

            {selectedResult && (
                <Preview result={selectedResult} onClose={HandleClosePreview} />
            )}
        </div>
    );
}

export default SearchResults;
