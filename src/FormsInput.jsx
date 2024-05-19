import React, { useState, useEffect } from 'react';
import DatalistOptions from './DropDownField';
import { useModal } from './ModalContext';


function FormsInput() {
  const csvFilePath = "/myData.csv";
  const { modalIsOpen, closeModal } = useModal();
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [formData, setFormData] = useState({
    brand:'',
    model:'',
    year:'',
    kilometer:'',
    engine :'',
    transmission:'',
    fuel :'',
    nb_of_doors:'', 
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);

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

    // Log form data before submitting
    console.log('Submitting form with data:', fullData);

    // Mocking the backend response
    try {
      setIsLoading(true); // Set loading state
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response data
      const responseData = {
        message: 'Mock submission successful!',
        predicted_price: "25.000$" // Example predicted price
      };
      setResponseMessage(`Success: ${responseData.message}`);
      setPredictedPrice(responseData.predicted_price);
      setSubmittedData(fullData); // Set submitted data to display it later

      console.log('Mock response data:', responseData);

    } catch (error) {
      console.error('Submission failed', error);
      setResponseMessage(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div> 
      <div className={modalIsOpen ? 'myModal' : 'myModal hidden'}>
        <div className="modal-content">
          <div className="close" onClick={closeModal}>&times;</div>
          <h1>PREDICT THE PRICE</h1>
          {submittedData ? (
            <div className="results-container">
              <div className="data-column">
                <h3>Chosen Data</h3>
              <p>
    <div>Brand: {submittedData.brand}</div>
    <div>Model: {submittedData.model}</div>
  </p>
  <p>
    <div>Year: {submittedData.year}</div>
    <div>Kilometer: {submittedData.kilometer}</div>
  </p>
  <p>
    <div>Fuel: {submittedData.fuel}</div>
    <div>Engine: {submittedData.engine}</div>
  </p>
  <p>
    <div>Door's number {submittedData.nb_of_doors}</div>
    <div>Transmission: {submittedData.transmission}</div>
  </p>
              
                <button className='close-btn' onClick={() => setSubmittedData(null)}>Close</button>
              </div>
              <div className="price-column">
                <h2>Estimated Price: {predictedPrice}</h2>
              </div>
            </div>
          ) : (
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
                    filter={selectedbrand} 
                    filterColumn="brand" 
                  />
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
                {/* Driven Kilometer */}
                <div className="form-group">
                  <label htmlFor="kilometer">Driven Kilometer:</label>
                  <input 
                    type="number"
                    id="kilometer" 
                    name="kilometer" 
                    min="0" 
                    value={formData.kilometer}
                    required
                    onChange={handleChange} 
                  />
                </div>  
                {/* Fuel Type */}
                <div className="form-group">
                  <label htmlFor="fuel">Fuel Type:</label>
                  <input 
                    list="options-fuel" 
                    id="fuel" 
                    name="fuel" 
                    value={formData.fuel}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="fuel" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                 {/* Engine */}
                 <div className="form-group">
                  <label htmlFor="Engine">Engine :</label>
                  <input 
                    list="options-engine" 
                    id="engine" 
                    name="engine" 
                    value={formData.engine}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="engine" 
                    filter={selectedmodel} 
                    filterColumn="model" 
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
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="transmission" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                 {/* Numbers of doors */}
                 <div className="form-group">
                  <label htmlFor="nb_of_doors">Door's number:</label>
                  <input 
                    list="options-nb_of_doors" 
                    id="nb_of_doors" 
                    name="nb_of_doors" 
                    value={formData.nb_of_doors}
                    required
                    onChange={handleChange} 
                  />
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="nb_of_doors" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                {/* Submit Button */}
                <div className='button-sub'>
                  <input type="submit" value='ESTIMATE' id='sub' />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormsInput;
