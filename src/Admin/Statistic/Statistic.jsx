import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../config';
import { Link } from 'react-router-dom';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistic() {
    const [statistic, setStatistic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistic = async () => {
            try {
                const id = localStorage.getItem('id');
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/account/statistic?id=${localStorage.getItem('id')}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                        },
                        credentials: 'include',
                    });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setStatistic(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStatistic();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Income',
                data: statistic.income,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Income',
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Statistic</h2>
                <Link to="/admin" className="text-blue-500 hover:underline">Admin Page</Link>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="text-gray-700">Number Sold: {statistic.numberSold}</p>
                <p className="text-gray-700">Number Remaining: {statistic.numberRemain}</p>
                <p className="text-gray-700">Income Per Week: {statistic.incomePerWeek}</p>
                <p className="text-gray-700">Number of Accounts: {statistic.numberAccount}</p>
                <p className="text-gray-700">Number of Products: {statistic.numberProduct}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default Statistic;
