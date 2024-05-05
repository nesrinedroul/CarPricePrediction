import React, { useState, useEffect } from 'react';
import DatalistOptions from './DropDownField';
import { useModal } from './ModalContext';
import "/myforrm.css";

function FormsInput() {
  const csvFilePath = "/final_concat5.csv";
  const { modalIsOpen, closeModal } = useModal();
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    engine_type: '',
    nb_of_doors:'',
    year:'',
    transmission: '', 
    fuel_type: '' ,
    driven_kilometer: ''
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Declare isLoading state
  const [predictedPrice, setPredictedPrice] = useState(null); // Declare predictedPrice state
  const [showPredictedPrice, setShowPredictedPrice] = useState(false); // Flag to show predicted price
  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      brand: selectedbrand,
      model: selectedmodel,
    }));
  }, [selectedbrand, selectedmodel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullData = { ...formData };
    
    try {
      setIsLoading(true); // Start loading
      const response = await fetch('https://naila04.pythonanywhere.com/api/myview/', {
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
      setPredictedPrice(responseData.predicted_price); // Update predictedPrice state

  
    } catch (error) {
      console.error('Submission failed', error);
      setResponseMessage(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  console.log(`${predictedPrice}`);
  return (
    <div> 
    <div className={modalIsOpen ? 'myModal' : 'myModal hidden'}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h1>PREDICT THE PRICE</h1>
        {!submittedData ? (
          <form onSubmit={handleSubmit} action='#'>
              <div className="details">
                {/* Brand */}
                <div className="form-group">
                  <label htmlFor="brand">Brand:</label>
                  <input 
                    list="options-brand" 
                    id="brand" 
                    name="brand"
                    value={selectedbrand}
                    required
                    onChange={(e) => setSelectedbrand(e.target.value)} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="brand" />
                </div>
                {/* Model */}
                <div className="form-group">
                  <label htmlFor="model">Model:</label>
                  <input 
                    list="options-model" 
                    id="model" 
                    name="model" 
                    value={selectedmodel}
                    required
                    onChange={(e) => setSelectedmodel(e.target.value)} 
                  />
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="model" 
                    brand={selectedbrand} 
                  />
                </div>
                {/* Engine Type */}
                <div className="form-group">
                  <label htmlFor="engine_type">Engine Type:</label>
                  <input 
                    list="options-engine_type" 
                    id="engine_type" 
                    name="engine_type" 
                    value={formData.engine_type}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="engine_type" />
                </div>
                {/* Number of Doors */}
                <div className="form-group">
                  <label htmlFor="nb_of_doors">Number of Doors:</label>
                  <input 
                    list="options-nb_of_doors" 
                    id="nb_of_doors" 
                    name="nb_of_doors" 
                    value={formData.nb_of_doors}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="nb_of_doors" />
                </div>
                {/* Year */}
                <div className="form-group">
                  <label htmlFor="year">Year:</label>
                  <input 
                    type="number" 
                    id="year" 
                    name="year" 
                    min="1980" 
                    max={new Date().getFullYear()} 
                    value={formData.year}
                    required
                    onChange={handleChange} 
                  />
                </div>
                {/* Transmission */}
                <div className="form-group">
                  <label htmlFor="transmission">Transmission:</label>
                  <input 
                    list="options-transmission" 
                    id="transmission" 
                    name="transmission" 
                    value={formData.transmission}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="transmission" />
                </div>
                {/* Fuel Type */}
                <div className="form-group">
                  <label htmlFor="fuel_type">Fuel Type:</label>
                  <input 
                    list="options-fuel_type" 
                    id="fuel_type" 
                    name="fuel_type" 
                    value={formData.fuel_type}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="fuel_type" />
                </div>
                {/* Driven Kilometer */}
                <div className="form-group">
                  <label htmlFor="driven_kilometer">Driven Kilometer:</label>
                  <input 
                    id="driven_kilometer" 
                    name="driven_kilometer" 
                    min="0" 
                    value={formData.driven_kilometer}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions csvFilePath={csvFilePath} column="driven_kilometer" />
                </div> 
                 <p>Estimated Price: {predictedPrice}</p>
                {/* Submit Button */}
                <div className='button-sub' >
                  <input type="submit" value='ESTIMATE' id='sub'></input>
                </div>
              </div>
            </form>
          ) : (
            <div>
                <div>
                
                </div>
              <div className="close-container"></div>
              <button className='close-btn' onClick={() => setSubmittedData(null)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormsInput;

