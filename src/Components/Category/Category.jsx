import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function Category({ toggleCategory, categories }) {
    const navigate = useNavigate();

    const ShowBooksInCategory = (category) => {
        toggleCategory(false);
        navigate(`/search/genre/${category}`);
    };

    const splitCategoriesIntoColumns = (categories, itemsPerColumn) => {
        const columns = [];
        for (let i = 0; i < categories.length; i += itemsPerColumn) {
            columns.push(categories.slice(i, i + itemsPerColumn));
        }
        return columns;
    };

    const columns = splitCategoriesIntoColumns(categories, 7);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
                <button
                    onClick={() => toggleCategory(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <div className="flex flex-wrap justify-center">
                    {columns.map((column, columnIndex) => (
                        <ul key={columnIndex} className="w-1/3 p-4">
                            {column.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() => ShowBooksInCategory(category.name)}
                                    className="cursor-pointer hover:text-blue-500"
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
