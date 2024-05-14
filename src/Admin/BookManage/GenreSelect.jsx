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
        }
    };

    const handleRemoveGenre = (genreName) => {
        setSelectedGenres(selectedGenres.filter(name => name !== genreName));
    };

    const handleCreateNewGenre = (newGenre) => {
        onNewGenre(newGenre);
        setShowGenreCreate(false);
        setSearchTerm(newGenre.name);
    };

    return (
        <div className="genre-select">
            <ToastContainer />
            <div>
                {selectedGenres.map((genre, index) => (
                    <span key={index} onClick={() => handleRemoveGenre(genre)}>
                        {genre} &times;
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search or create genre"
            />
            <ul>
                {filteredGenres.map((genre) => (
                    <li key={genre.id} onClick={() => handleSelectGenre(genre)}>
                        {genre.name}
                    </li>
                ))}
            </ul>
            {searchTerm && !filteredGenres.some(genre => genre.name.toLowerCase() === searchTerm.toLowerCase()) && (
                <button onClick={() => setShowGenreCreate(true)}>Create new genre "{searchTerm}"</button>
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
