import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { API_BASE_URL } from '../config';
import Book from '../Book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

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
                console.log('Data fetching successful');
                setResults(searchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [genreName, keyword, type, currentPage]);

    const searchByGenre = async (genreName, page) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/getAllProduct?categoryName=${genreName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching by genre:', error);
            return [];
        }
    };

    const searchByKeyword = async (keyword, page) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getWithKeyword`, {
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

    const handleClosePreview = () => {
        setSelectedResult(null);
    }

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('../../Bookswall_generated.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='relative'><Header /></div>
            <div className="relative container mx-auto py-8 px-4">

                <h2 className="relative text-3xl font-bold text-white mb-4">Search Results</h2>

                {genreName ? <></> : <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={PreviousPage}
                        disabled={currentPage <= 1}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        Previous Page
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={NextPage}
                    >
                        Next Page
                        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                    </button>
                </div>}

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {results.map((result, index) => (
                        <li key={index} onClick={() => setSelectedResult(result)} className="cursor-pointer">
                            <div className="bg-gray-100 p-4 rounded h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{result.name}</h3>
                                    <img src={result.imageUrl} alt="Product" className="w-full mb-2 h-48 object-cover" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold mb-2">${result.price}</p>
                                    <p className="text-sm">Sold: {result.soldCount || 0}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className='relative'>{selectedResult && (
                    <Book id={selectedResult.id} onClose={handleClosePreview} />
                )}</div>

            </div>
        </div>
    );
}

export default SearchResults;
