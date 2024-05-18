import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenreCreate from './GenreCreate';

function GenreSelect({ selectedGenres, setSelectedGenres, genreList, onNewGenre }) {
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showGenreCreate, setShowGenreCreate] = useState(false);

    useEffect(() => {
        setFilteredGenres(genreList);
    }, [genreList]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredGenres(
                genreList.filter(genre => genre.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredGenres(genreList);
        }
    }, [searchTerm, genreList]);

    const handleSelectGenre = (genre) => {
        if (!selectedGenres.includes(genre.name)) {
            setSelectedGenres([...selectedGenres, genre.name]);
            setFilteredGenres(filteredGenres.filter(g => g !== genre));
        }
    };

    const handleRemoveGenre = (genreName) => {
        setSelectedGenres(selectedGenres.filter(name => name !== genreName));
        const genre = genreList.find(g => g.name === genreName);
        if (genre) {
            setFilteredGenres([...filteredGenres, genre]);
        }
    };

    const handleCreateNewGenre = (newGenre) => {
        onNewGenre(newGenre);
        setShowGenreCreate(false);
        setSearchTerm(newGenre.name);
    };

    // Phân chia genres thành các dòng, mỗi dòng tối đa 5 thể loại
    const rows = [];
    for (let i = 0; i < filteredGenres.length; i += 5) {
        rows.push(filteredGenres.slice(i, i + 5));
    }

    return (
        <div className="genre-select flex flex-col items-start">
            <ToastContainer />
            <div className="mb-2">
                {selectedGenres.map((genre, index) => (
                    <span key={index} onClick={() => handleRemoveGenre(genre)} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-black hover:text-white hover:border hover:border-transparent hover:rounded-full transition duration-300">
                        {genre} &times;
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search or create genre"
                className="p-2 border border-gray-300 rounded-md mb-2"
            />
            <ul className="mb-2">
                {rows.map((row, index) => (
                    <li key={index} className="flex space-x-2">
                        {row.map(genre => (
                            <div key={genre.id} onClick={() => handleSelectGenre(genre)} className="cursor-pointer text-gray-700 hover:text-white hover:bg-black hover:border hover:border-transparent hover:rounded-md p-2 transition duration-300">
                                {genre.name}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
            {searchTerm && !filteredGenres.some(genre => genre.name.toLowerCase() === searchTerm.toLowerCase()) && (
                <button onClick={() => setShowGenreCreate(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create new genre "{searchTerm}"</button>
            )}
            {showGenreCreate && (
                <GenreCreate
                    genreList={genreList}
                    setShowGenreCreate={setShowGenreCreate}
                    onNewGenre={handleCreateNewGenre}
                />
            )}
        </div>
    );
}

export default GenreSelect;
