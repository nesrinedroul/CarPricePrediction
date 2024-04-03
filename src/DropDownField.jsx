import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function DatalistOptions({ csvFilePath, column, brand = "" }) {
  const [options, setOptions] = useState([]);
    
  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        let filteredData = result.data;
        if (brand && column === "Model") {
          filteredData = filteredData.filter(row => row.Brand === brand);
        }
        const uniqueOptions = [...new Set(filteredData.map(row => row[column]))];
        setOptions(uniqueOptions);
      },
    });
  }, [csvFilePath, column, brand]);

  return (
    <datalist id={`options-${column}`}>
      {options.map((option, index) => (
        <option key={index} value={option} />
      ))}
    </datalist>
  );
}

export default DatalistOptions;
