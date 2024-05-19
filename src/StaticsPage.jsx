import React from 'react';
import BrandPriceChart from './BandPriceTable';
import FuelTypeDistributionChart from './FuelTypeDistributionChart';
import FeatureImportanceChart  from './FeaturesImportance';

const featureImportance = {
    'Brand': 0.2,
    'Year': 0.3,
    'Kilometers Driven': 0.25,
    'Fuel Type': 0.1,
    'Engine Size': 0.1,
    'Transmission': 0.05
};


function StatisticsPage() {
    return (
        <div>
            <h1 id='statt'>Car Statistics</h1>
            <div className="statistics-page">
                
                <div className="chart-container">
                    <BrandPriceChart />
                </div>
                <div className="chart-container">
                    <FuelTypeDistributionChart />
                </div>
                <div className="chart-container">
                    <FeatureImportanceChart featureImportance={featureImportance} />
                </div>
               
            </div>
        </div>
    );
}

export default StatisticsPage;
