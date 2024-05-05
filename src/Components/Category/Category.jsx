import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Category() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://172.11.0.231:8081/category/get");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
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

    return (
        <div>
            <ul>
                {categories.map(category => (
                    <li key={category.id} onClick={() => ShowBooksInCategory(category.name)}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
