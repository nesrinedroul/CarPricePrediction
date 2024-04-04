import React, { useState, useEffect } from 'react';
import DatalistOptions from './DropDownField';
import './myforrm.css';
function FormComponent() {
  const csvFilePath = "/cleaneddata.csv";
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({
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
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      brand: selectedBrand,
      model: selectedModel,
    }));
  }, [selectedBrand, selectedModel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine formData with brand and model for the submission
    // since formData already includes brand and model, just use formData as is
    const fullData = { ...formData };

    setSubmittedData(fullData); // Optionally display the submitted data

    try {
      const response = await fetch('http://naila04.pythonanywhere.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      setResponseMessage(`Success: ${responseData.message}`);
    } catch (error) {
      console.error('Submission failed', error);
      setResponseMessage(`Submission failed: ${error.message}`);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className='Myform'>
      <div className="form-group">
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
</div>
<div className="form-group">
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
      /></div>
      {/* Year */}
      <div className="form-group">
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
</div>
      {/* Kilometer */}
      <div className="form-group">
      <label htmlFor="Kilometer">Kilometer:</label>
      <input
        type="number"
        id="Kilometer"
        name="kilometer"
        min="0"
        value={formData.kilometer}
        onChange={handleChange}
        required
      /></div>

      {/* Fuel Type */}
      <div className="form-group">
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
</div>
      {/* Seller Type */}
      <div className="form-group">
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
</div>
      {/* Transmission */}
      <div className="form-group">
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
</div>
      {/* Owner */}
      <div className="form-group">
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
</div>
      {/* Engine */}
      <div className="form-group">
      <label htmlFor="Engine">Engine:</label>
      <input list="options-Engine" id="Engine" name="Engine" value={formData.Engine}required onChange={handleChange}/>
      <DatalistOptions csvFilePath={csvFilePath} column="Engine" />
      </div>{/* Max Power */}
      <div className="form-group">
      <label htmlFor="Max_power">Max Power:</label>
      <input
        type="text"
        id="Max_power"
        name="maxPower"
        value={formData.maxPower}
        onChange={handleChange}
      />
 <DatalistOptions csvFilePath={csvFilePath} column="Max_power" />
 </div>
      {/* Seats */}
      <div className="form-group">
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
   </div>
      <button type="submit">Submit</button>
    </form>
      {submittedData && (
        <div>
          <h2>Form Submitted Successfully</h2>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FormComponent;