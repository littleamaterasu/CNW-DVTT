import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenreSelect from './GenreSelect';
import { API_BASE_URL } from '../../config';

function BookEdit({ bookId, setShowBookEdit, onBookUpdated }) {
    const [name, setName] = useState('');
    const [selectedAuthors, setSelectedAuthors] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [weight, setWeight] = useState('');
    const [publisher, setPublisher] = useState('');
    const [writtenYear, setWrittenYear] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [soldCount, setSoldCount] = useState(0);
    const [remainedCount, setRemainedCount] = useState('');
    const [year, setYear] = useState('');
    const [info, setInfo] = useState('');
    const [provider, setProvider] = useState('');
    const [page, setPage] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/get`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await response.json();
                setGenreList(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getOne?id=${bookId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const book = await response.json();
                setName(book.name);
                setSelectedAuthors(book.author);
                setSelectedGenres(book.category);
                setImageUrl(book.imageUrl);
                setWeight(book.weight);
                setPublisher(book.publisher);
                setWrittenYear(book.writtenYear);
                setPrice(book.price);
                setDiscount(book.discount);
                setSoldCount(book.soldCount);
                setRemainedCount(book.remainedCount);
                setYear(book.year);
                setInfo(book.info);
                setProvider(book.provider);
                setPage(book.page);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGenres();
        fetchBookDetails();
    }, [bookId]);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImageToCloudinary = async () => {
        if (!imageFile) return imageUrl;

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmtiz34v1/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.secure_url;
        } catch (error) {
            toast.error('Failed to upload image to Cloudinary');
            return imageUrl;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadedImageUrl = await uploadImageToCloudinary();

        const updatedBook = {
            id: bookId,
            name,
            author: selectedAuthors,
            category: selectedGenres,
            imageUrl: uploadedImageUrl,
            weight,
            price,
            discount,
            soldCount,
            remainedCount,
            year,
            info,
            provider,
            page,
            status: 0
        };

        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(updatedBook),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            const result = await response.json();
            toast.success('Book updated successfully!');
            onBookUpdated(result);
            setTimeout(() => {
                setShowBookEdit(false);
            }, 2000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCloseForm = () => {
        setShowBookEdit(false);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <ToastContainer />
            <div className='bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                        <input
                            type="text"
                            id="id"
                            value={bookId}
                            readOnly
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Book Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="authorList" className="block text-sm font-medium text-gray-700">Author(s)</label>
                        <input
                            type="text"
                            id="authorList"
                            value={selectedAuthors}
                            onChange={(e) => setSelectedAuthors(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genres" className="block text-sm font-medium text-gray-700">Genres</label>
                        <GenreSelect
                            selectedGenres={selectedGenres}
                            setSelectedGenres={setSelectedGenres}
                            genreList={genreList}
                            onNewGenre={(newGenre) => setGenreList([...genreList, newGenre])}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Image File</label>
                        <input
                            type="file"
                            id="imageFile"
                            onChange={handleImageChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (g)</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="soldCount" className="block text-sm font-medium text-gray-700">Sold Count</label>
                        <input
                            type="number"
                            id="soldCount"
                            value={soldCount}
                            onChange={(e) => setSoldCount(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="remainedCount" className="block text-sm font-medium text-gray-700">Remained Count</label>
                        <input
                            type="number"
                            id="remainedCount"
                            value={remainedCount}
                            onChange={(e) => setRemainedCount(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="text"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="info" className="block text-sm font-medium text-gray-700">Info</label>
                        <textarea
                            id="info"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Provider</label>
                        <input
                            type="text"
                            id="provider"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="page" className="block text-sm font-medium text-gray-700">Page</label>
                        <input
                            type="number"
                            id="page"
                            value={page}
                            onChange={(e) => setPage(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
                        <button type="button" onClick={handleCloseForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookEdit;
