import React, { useState, useEffect } from 'react';
import DatalistOptions from './DropDownField';
import { useModal } from './ModalContext';
import "/myforrm.css";
function FormsInput() {
  const csvFilePath = "/newdata.csv";
  const { modalIsOpen, closeModal } = useModal();
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [formData, setFormData] = useState({
    brand: '',
   model: '',
    engine: '',
    nb_of_doors:'',
    year:'',
    transmission: '',
    fuel: '',
   kilometer: '',
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  

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
  console.log("Modal is open:", modalIsOpen); // Add this inside your component
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
    setIsLoading(true);
    setError('');
    const results = await someAsyncOperation();
    setSubmittedData(results);
  } catch (error) {
    setError('An error occurred.');
  } finally {
    setIsLoading(false);
  }
    // Combine formData with brand and model for the submission
    // since formData already includes brand and model, just use formData as is
    const fullData = { ...formData };

    setSubmittedData(fullData); // Optionally display the submitted data
// request

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
    <div> 
       <div className={modalIsOpen ? 'myModal' : 'myModal hidden'}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
            <h1>PREDICT THE PRICE</h1>
            {!submittedData ? (
            <form onSubmit={handleSubmit}  action='#'>
              <div className="details">
          <div className="form-group">
      <label htmlFor="brand">brand:</label>
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
<div className="form-group">
      <label htmlFor="model">model:</label>
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
      /></div>
      {/* engine */}
      <div className="form-group">
      <label htmlFor="engine">engine:</label>
      <input list="options-engine" id="engine" name="engine" value={formData.engine}required onChange={handleChange}/>
      <DatalistOptions csvFilePath={csvFilePath} column="engine" />
      </div>
      {/* nb_of_doors */}
      <div className="form-group">
      <label htmlFor="nb_of_doors">nb_of_doors:</label>
      <input
        list="options-nb_of_doors"
        id="nb_of_doors"
        name="nb_of_doors"
        value={formData.nb_of_doors}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="nb_of_doors" />
</div>
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
{/* transmission */}
      <div className="form-group">
      <label htmlFor="transmission">transmission:</label>
      <input
        list="options-transmission"
        id="transmission"
        name="transmission"
        value={formData.transmission}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="transmission" />
</div>
      

      {/* Fuel Type */}
      <div className="form-group">
      <label htmlFor="fuel">Fuel Type:</label>
      <input
        list="options-fuel"
        id="fuel"
        name="fuelType"
        value={formData.fuelType}
        onChange={handleChange}
        required
      />
      <DatalistOptions csvFilePath={csvFilePath} column="fuel" />
</div>
{/* kilometer */}
      <div className="form-group">
      <label htmlFor="kilometer">kilometer:</label>
      <input
        type="number"
        id="kilometer"
        name="kilometer"
        min="0"
        value={formData.kilometer}
        onChange={handleChange}
        required
      /></div>
      
   <div className='button-sub' >
      <input type="submit" value='ESTIMATE'id='sub'></input>
      </div>
   </div> </form>): (
      <div>
        <p>Results: {JSON.stringify(submittedData)}</p>
        <div className="close-container"></div>
        <button className='close-btn' onClick={() => setSubmittedData(null)}>Close</button>
      </div>
    )}
  </div>
</div></div>
    );
}
export default FormsInput;