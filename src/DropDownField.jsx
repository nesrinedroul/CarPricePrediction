import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function DatalistOptions({ csvFilePath, column }) {
  const [options, setOptions] = useState([]);
    
  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const uniqueOptions = [...new Set(result.data.map((row) => row[column]))];
        setOptions(uniqueOptions);
      },
    });
  }, [csvFilePath, column]);

  return (
    
    <datalist id={`options-${column}`}>
      {options.map((option, index) => (
        <option key={index} value={option} />
      ))}
    </datalist>
  );
}

export default DatalistOptions;
 
 