import React, { useState, useEffect } from 'react';
import DatalistOptions from './DropDownField';

function FormComponent() {
  const csvFilePath = "/cleaneddata.csv";
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    kilometer: '',
    fuelType: '',
    sellerType: '',
    transmission: '',
    owner: '',
    engine: '',
    maxPower: '',
    seats: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      brand: selectedBrand,
      model: selectedModel,
    }));
  }, [selectedBrand, selectedModel]);

  useEffect(() => {
    setSelectedModel("");
  }, [selectedBrand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can replace the URL with your actual API endpoint
    const apiUrl = 'http://naila04.pythonanywhere.com/';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Here you can handle the success response, e.g., showing a message to the user
    } catch (error) {
      console.error('Error:', error);
      // Here you can handle errors, e.g., showing an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Brand">Brand:</label>
      <input 
        list="options-Brand" 
        id="Brand" 
        name="brand"
        value={selectedBrand}
        required
        onChange={(e) => setSelectedBrand(e.target.value)} 
      />
      <DatalistOptions csvFilePath={csvFilePath} column="Brand" />

      <label htmlFor="Model">Model:</label>
      <input 
        list="options-Model" 
        id="Model" 
        name="model" 
        value={selectedModel}
        required
        onChange={(e) => setSelectedModel(e.target.value)} 
      />
      <DatalistOptions 
        csvFilePath={csvFilePath} 
        column="Model" 
        brand={selectedBrand} 
      />
      {/* Year */}
      <label htmlFor="Year">Year:</label>
      <input
        type="number"
        id="Year"
        name="year"
        min="1980"
        max={new Date().getFullYear()}
        value={formData.year}
        onChange={handleChange}
        required
      />

      {/* Kilometer */}
      <label htmlFor="Kilometer">Kilometer:</label>
      <input
        type="number"
        id="Kilometer"
        name="kilometer"
        min="0"
        value={formData.kilometer}
        onChange={handleChange}
        required
      />

      {/* Fuel Type */}
      <label htmlFor="Fuel_type">Fuel Type:</label>
      <input
        list="options-Fuel_type"
        id="Fuel_type"
        name="fuelType"
        value={formData.fuelType}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="Fuel_type" />

      {/* Seller Type */}
      <label htmlFor="Seller_type">Seller Type:</label>
      <input
        list="options-Seller_type"
        id="Seller_type"
        name="sellerType"
        value={formData.sellerType}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="Seller_type" />

      {/* Transmission */}
      <label htmlFor="Transmission">Transmission:</label>
      <input
        list="options-Transmission"
        id="Transmission"
        name="transmission"
        value={formData.transmission}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="Transmission" />

      {/* Owner */}
      <label htmlFor="Owner">Owner:</label>
      <input
        list="options-Owner"
        id="Owner"
        name="owner"
        value={formData.owner}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="Owner" />

      {/* Engine */}
      <label htmlFor="Engine">Engine:</label>
      <input list="options-Engine" id="Engine" name="Engine" value={formData.Engine}required onChange={handleChange}/>
      <DatalistOptions csvFilePath={csvFilePath} column="Engine" />
      {/* Max Power */}
      <label htmlFor="Max_power">Max Power:</label>
      <input
        type="text"
        id="Max_power"
        name="maxPower"
        value={formData.maxPower}
        onChange={handleChange}
      />
 <DatalistOptions csvFilePath={csvFilePath} column="Max_power" />
      {/* Seats */}
      <label htmlFor="Seats">Seats:</label>
      <input
        type="number"
        id="Seats"
        name="seats"
        min="1"
        max="9"
        value={formData.seats}
        onChange={handleChange}
      />
   <DatalistOptions csvFilePath={csvFilePath} column="Seats" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
