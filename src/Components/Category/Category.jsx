import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function Category() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/get`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                console.log(data)
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const ShowBooksInCategory = (category) => {
        navigate(`/search/genre/${category}`);
    }

    const splitCategoriesIntoColumns = (categories, itemsPerColumn) => {
        const columns = [];
        for (let i = 0; i < categories.length; i += itemsPerColumn) {
            columns.push(categories.slice(i, i + itemsPerColumn));
        }
        return columns;
    };

    const columns = splitCategoriesIntoColumns(categories, 7);

    return (
        <div className="flex flex-wrap justify-center">
            {columns.map((column, columnIndex) => (
                <ul key={columnIndex} className="w-1/3 p-4">
                    {column.map(category => (
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
    );
}

export default Category;
