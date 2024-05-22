import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function FuelTypeDistributionChart() {
    const [carData, setCarData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse("/myData.csv", {
            download: true,
            header: true,
            delimiter: ",",  // Ensure correct delimiter
            complete: (result) => {
                console.log("Parsed CSV data:", result.data);
                setCarData(result.data);
            },
        });
    }, []);

    useEffect(() => {
        if (carData.length > 0) {
            const fuelTypeCounts = carData.reduce((acc, car) => {
                const fuelType = car.fuel;
                if (fuelType) {
                    acc[fuelType] = (acc[fuelType] || 0) + 1;
                }
                return acc;
            }, {});

            const sortedFuelTypes = Object.entries(fuelTypeCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5); // Limit to top 5 fuel types

            const otherCount = Object.entries(fuelTypeCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(5)
                .reduce((acc, [, count]) => acc + count, 0);

            if (otherCount > 0) {
                sortedFuelTypes.push(['Other', otherCount]);
            }

            const data = {
                labels: sortedFuelTypes.map(([fuelType]) => fuelType),
                datasets: [{
                    data: sortedFuelTypes.map(([, count]) => count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                }],
            };

            setChartData(data);
        }
    }, [carData]);

    return (
        <div className="fuel-statistics-container">
            <h2 className="fuel-statistics-title">Fuel Type Distribution</h2>
            <div className="fuel-chart">
                {chartData ? (
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        boxWidth: 20,
                                        boxHeight: 20,
                                        padding: 15,
                                        font: {
                                            size: 12,
                                        },
                                    },
                                },
                            },
                        }}
                        height={500} // Increase the height for the chart
                    />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </div>
    );
}

export default FuelTypeDistributionChart;
