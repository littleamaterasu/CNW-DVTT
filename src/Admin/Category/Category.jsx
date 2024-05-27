import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSync, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/get`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleNewCategory = (newCategory) => {
        const existingCategoryIndex = categories.findIndex(category => category.name === newCategory.name);

        if (existingCategoryIndex !== -1) {
            const updatedCategories = [...categories];
            updatedCategories[existingCategoryIndex].info = newCategory.info;
            setCategories(updatedCategories);
        } else {
            setCategories([...categories, newCategory]);
        }

        setShowForm(false);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setFormType('edit');
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleReload = () => {
        fetchCategories();
    };

    return (
        <div className="p-4 bg-gray-900">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Category List</h1>
                <Link to="/admin" className="text-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Admin
                </Link>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                    setFormType('create');
                    setShowForm(true);
                }}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Category
            </button>
            <button
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleReload}
            >
                <FontAwesomeIcon icon={faSync} className="mr-2" />
                Reload
            </button>
            {showForm && (
                <CategoryForm
                    formType={formType}
                    onCloseForm={handleCloseForm}
                    onNewCategory={handleNewCategory}
                    selectedCategory={selectedCategory}
                />
            )}
            <ul className="mt-4">
                {categories.map((category, index) => (
                    <li key={index} className="mx-20 border-b border-gray-300 py-4">
                        <h1 className="text-white font-semibold mb-2">{category.name}</h1>
                        <p className="text-white">Info: {category.info}</p>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-2"
                            onClick={() => handleEditCategory(category)}
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CategoryForm({ formType, onCloseForm, onNewCategory, selectedCategory }) {
    const [name, setName] = useState(selectedCategory ? selectedCategory.name : '');
    const [info, setInfo] = useState(selectedCategory ? selectedCategory.info : '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !info) {
            toast.error('Please complete category form!');
            return;
        }

        const categoryData = {
            name,
            info,
        };

        try {
            let response;
            if (formType === 'create') {
                response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                    body: JSON.stringify(categoryData),
                });
            } else if (formType === 'edit' && selectedCategory) {
                response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                    body: JSON.stringify(categoryData),
                });
            }

            if (!response.ok) {
                throw new Error(`Failed to ${formType === 'create' ? 'create' : 'update'} category`);
            }

            const result = await response.json();
            toast.success(`Category ${formType === 'create' ? 'created' : 'updated'} successfully!`);

            onNewCategory(result);

            onCloseForm();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            readOnly={formType === 'edit'}
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
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formType === 'create' ? 'Create' : 'Update'}
                        </button>
                        <button type="button" onClick={onCloseForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryList;

