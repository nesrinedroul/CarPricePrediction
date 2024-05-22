import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function FeatureImportanceChart({ featureImportance }) {
    const data = {
        labels: Object.keys(featureImportance),
        datasets: [{
            label: 'Importance',
            data: Object.values(featureImportance),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="feature-importance-container">
            <h2 className="feature-importance-title">Feature Importance</h2>
            <div className="feature-importance-chart">
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Features'
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Importance'
                                },
                            }
                        }
                    }}
                    height={500} // Increase the height for the chart
                />
            </div>
        </div>
    );
}

export default FeatureImportanceChart;
