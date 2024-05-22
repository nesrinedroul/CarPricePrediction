import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function BrandPriceChart() {
    const [carData, setCarData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse("/myData.csv", {
            download: true,
            header: true,
            complete: (result) => {
                console.log("Parsed CSV data:", result.data);
                setCarData(result.data);
            },
        });
    }, []);

    useEffect(() => {
        if (carData.length > 0) {
            const brandPrices = carData
                .map(car => {
                    const priceString = car.price;
                    const brand = car.brand;

                    if (typeof priceString !== 'string' || priceString.trim() === '') {
                        console.log(`Skipping invalid price: ${priceString}`);
                        return null;
                    }

                    // Remove any non-numeric characters (e.g., currency symbols, commas)
                    const priceNumber = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
                    if (isNaN(priceNumber) || priceNumber <= 0) {
                        console.log(`Skipping invalid price: ${priceString} => ${priceNumber}`);
                        return null;
                    }

                    return { brand, price: priceNumber };
                })
                .filter(car => car !== null)
                .reduce((acc, curr) => {
                    if (!acc[curr.brand]) {
                        acc[curr.brand] = [];
                    }
                    acc[curr.brand].push(curr.price);
                    return acc;
                }, {});

            const averagePrices = Object.entries(brandPrices).map(([brand, prices]) => ({
                brand,
                averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
            }));

            averagePrices.sort((a, b) => a.averagePrice - b.averagePrice);

            const data = {
                labels: averagePrices.map(entry => entry.brand),
                datasets: [{
                    label: 'Average Price',
                    data: averagePrices.map(entry => entry.averagePrice),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            };

            setChartData(data);
        }
    }, [carData]);

    return (
        <div className="statistics-container">
            <h2 className="statistics-title">Brand Prices</h2>
            <div className="chart">
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    beginAtZero: true,
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            return value.toLocaleString();
                                        }
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </div>
    );
}

export default BrandPriceChart;
