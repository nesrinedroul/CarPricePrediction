import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import DatalistOptions from './DropDownField'; // Adjust the path as necessary
import { useModal } from './ModalContext';

function FormsInput() {
  const csvFilePath = "/myData.csv";
  const { modalIsOpen, closeModal } = useModal();
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [availableEngines, setAvailableEngines] = useState([]);
  const [availableHorsepower, setAvailableHorsepower] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    kilometer: '',
    engine: '',
    horsepower: '',
    transmission: '',
    fuel: '',
    nb_of_doors: '',
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedAmericanPrice, setPredictedAmericanPrice] = useState(null);
  const [predictedAlgerianPrice, setPredictedAlgerianPrice] = useState(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      brand: selectedbrand,
    }));
    if (selectedbrand) {
      fetchModelData(selectedbrand);
    }
  }, [selectedbrand]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      model: selectedmodel,
    }));
    if (selectedmodel) {
      fetchYearData(selectedmodel);
      fetchEngineData(selectedmodel);
    }
  }, [selectedmodel]);

  const fetchModelData = (brand) => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const models = result.data.filter(row => row.brand === brand).map(row => row.model);
        setAvailableModels([...new Set(models)]);
      },
    });
  };

  const fetchYearData = (model) => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const years = result.data.filter(row => row.model === model).map(row => parseInt(row.year, 10));
        setAvailableYears([...new Set(years)]);
      },
    });
  };

  const fetchEngineData = (model) => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const engines = result.data.filter(row => row.model === model).map(row => row.engine_size);
        const horsepower = result.data.filter(row => row.model === model).map(row => row.horsepower);
        setAvailableEngines([...new Set(engines)]);
        setAvailableHorsepower([...new Set(horsepower)]);
      },
    });
  };

  const handleEngineChange = (e) => {
    const engineSize = e.target.value;
    const selectedEngine = availableEngines.find(engine => engine === engineSize);
    if (selectedEngine) {
      setFormData(prevState => ({
        ...prevState,
        engine: selectedEngine,
        horsepower: '',
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        engine: engineSize,
        horsepower: '',
      }));
    }
  };

  const handleHorsepowerChange = (e) => {
    const horsepower = e.target.value;
    const selectedHorsepower = availableHorsepower.find(hp => hp === horsepower);
    if (selectedHorsepower) {
      setFormData(prevState => ({
        ...prevState,
        horsepower: selectedHorsepower,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        horsepower: horsepower,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.brand) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.model) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year || formData.year < Math.min(...availableYears) || formData.year > currentYear) {
      newErrors.year = `Year must be greater or equal to ${Math.min(...availableYears)}`;
    }

    if (!formData.kilometer || formData.kilometer < 0 || formData.kilometer > 1000000) {
      newErrors.kilometer = 'Kilometer must be a positive number and less than a million km';
    }

    if (!formData.transmission) {
      newErrors.transmission = 'Transmission is required';
    }

    if (!formData.fuel) {
      newErrors.fuel = 'Fuel type is required';
    }

    if (!formData.nb_of_doors || formData.nb_of_doors != 2 && formData.nb_of_doors != 4) {
      newErrors.nb_of_doors = 'Number of doors must be between 2 and 4';
    }

    if (!formData.horsepower || formData.horsepower <= 0 || formData.horsepower > 700) {
      newErrors.horsepower = 'Horsepower must be a positive number and not beyond 700';
    }

    if (!formData.engine || formData.engine <= 0 || formData.engine > 10) {
      newErrors.engine = 'Engine size must be between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, priceType) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const fullData = { ...formData, priceType };

    console.log('Submitting form with data:', fullData);
    
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
      if (priceType === 'american') {
        setPredictedAmericanPrice(parseFloat(responseData.predicted_american_price).toFixed(2));
        setPredictedAlgerianPrice(null);
      } else {
        setPredictedAlgerianPrice(parseFloat(responseData.predicted_algerian_price).toFixed(2));
        setPredictedAmericanPrice(null);
      }
      setSubmittedData(fullData); // Set submitted data to display it later

      console.log('Response data:', responseData);
    } catch (error) {
      console.error('Submission failed', error);
      setResponseMessage(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleClear = () => {
    setFormData({
      brand: '',
      model: '',
      year: '',
      kilometer: '',
      engine: '',
      horsepower: '',
      transmission: '',
      fuel: '',
      nb_of_doors: '',
    });
    setSelectedbrand("");
    setSelectedmodel("");
    setResponseMessage("");
    setErrors({});
    setPredictedAmericanPrice(null);
    setPredictedAlgerianPrice(null);
    setSubmittedData(null);
  };

  const handleBack = () => {
    setPredictedAmericanPrice(null);
    setPredictedAlgerianPrice(null);
    setResponseMessage("");
  };

  return (
    <div>
      <div className={modalIsOpen ? 'myModal' : 'myModal hidden'}>
        <div className="modal-content">
          <div className="close" onClick={closeModal}>&times;</div>
          <h1>PREDICT THE PRICE</h1>
          {submittedData && (predictedAmericanPrice !== null || predictedAlgerianPrice !== null) ? (
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
                  <div>Engine Size: {submittedData.engine}</div>
                </p>
                <p>
                  <div>Door Number: {submittedData.nb_of_doors}</div>
                  <div>Transmission: {submittedData.transmission}</div>
                  <div>Horsepower: {submittedData.horsepower}</div>
                </p>
              </div>
              <div className="price-column">
                {predictedAmericanPrice !== null && <h2>Estimated American Price: {predictedAmericanPrice} $</h2>}
                {predictedAlgerianPrice !== null && <h2>Estimated Algerian Price: {predictedAlgerianPrice} DZD</h2>}
                <div className='button-group'>
                  <button className='clear-btn' onClick={handleClear}>Clear</button>
                  <button className='back-btn' onClick={handleBack}>Back</button>
                </div>
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
                  {errors.brand && <p className="error">{errors.brand}</p>}
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
                  {errors.model && <p className="error">{errors.model}</p>}
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
                    min={Math.min(...availableYears)}
                    max={new Date().getFullYear()} 
                    value={formData.year}
                    required
                    onChange={handleChange} 
                  />
                  {errors.year && <p className="error">{errors.year}</p>}
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
                  {errors.kilometer && <p className="error">{errors.kilometer}</p>}
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
                  {errors.fuel && <p className="error">{errors.fuel}</p>}
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="fuel" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                {/* Engine Size */}
                <div className="form-group">
                  <label htmlFor="engine">Engine Size (L):</label>
                  <input 
                    list="options-engine_size" 
                    id="engine" 
                    name="engine" 
                    value={formData.engine}
                    required
                    onChange={handleEngineChange} 
                  />
                  {errors.engine && <p className="error">{errors.engine}</p>}
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="engine_size" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                {/* Horsepower */}
                <div className="form-group">
                  <label htmlFor="horsepower">Horsepower (HP):</label>
                  <input 
                    list="options-horsepower" 
                    id="horsepower" 
                    name="horsepower" 
                    value={formData.horsepower}
                    required
                    onChange={handleHorsepowerChange}
                  />
                  {errors.horsepower && <p className="error">{errors.horsepower}</p>}
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="horsepower" 
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
                  {errors.transmission && <p className="error">{errors.transmission}</p>}
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
                    type="number"
                    id="nb_of_doors" 
                    name="nb_of_doors" 
                    min="2"
                    max="4"
                    value={formData.nb_of_doors}
                    required
                    onChange={handleChange} 
                  />
                  {errors.nb_of_doors && <p className="error">{errors.nb_of_doors}</p>}
                  <DatalistOptions 
                    csvFilePath={csvFilePath} 
                    column="nb_of_doors" 
                    filter={selectedmodel} 
                    filterColumn="model" 
                  />
                </div>
                {/* Submit Buttons */}
                <div className='button-sub'>
                  <button onClick={(e) => handleSubmit(e, 'american')} id='sub-american' className='estimate-btn'>ESTIMATE AMERICAN</button>
                  <button onClick={(e) => handleSubmit(e, 'algerian')} id='sub-algerian' className='estimate-btn'>ESTIMATE DZ</button>
                </div>
                {submittedData && (
                  <div className='button-clear'>
                   <button type="button" className="clear-btn" onClick={handleClear}>Clear</button> </div>
                )}
              </div>
              {isLoading && <p>Loading...</p>}
              {responseMessage && <p>{responseMessage}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormsInput;
