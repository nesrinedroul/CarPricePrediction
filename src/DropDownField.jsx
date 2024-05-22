import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function DatalistOptions({ csvFilePath, column, filter, filterColumn }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        let filteredOptions = result.data;
        if (filter && filterColumn) {
          filteredOptions = filteredOptions.filter(row => row[filterColumn] === filter);
        }
        let uniqueOptions = [...new Set(filteredOptions.map(row => row[column]))];

        if (column === 'engine_size' || column === 'horsepower') {
          uniqueOptions = uniqueOptions.map(option => {
            const match = option.match(/\d+(\.\d+)?/);
            return match ? parseFloat(match[0]) : null;
          }).filter(option => option !== null);
        }

        setOptions(uniqueOptions);
      },
    });
  }, [csvFilePath, column, filter, filterColumn]);

  return (
    <datalist id={`options-${column}`}>
      {options.map((option, index) => (
        <option key={index} value={option} />
      ))}
    </datalist>
  );
}

export default DatalistOptions;

