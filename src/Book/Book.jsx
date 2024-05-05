import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';

function Book() {
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://172.11.0.231:8081/product/getOne?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    if (!data) {
        return (
            <div>
                <Header />
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <p>{data.name}</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    )
}

export default Book;
