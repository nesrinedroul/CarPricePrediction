import React from 'react';
import DatalistOptions from './DropDownField';

function FormComponent() {
  const csvFilePath ="/cleaneddata.csv";
  return (
    <form>
      <label htmlFor="Brand">Brand:</label>
      <input list="options-Brand" id="Brand" name="Brand" />
      <DatalistOptions csvFilePath={csvFilePath} column="Brand" />

      <label htmlFor="Model">Model:</label>
      <input list="options-Model" id="Model" name="Model" />
      <DatalistOptions csvFilePath={csvFilePath} column="Model" />

      <label htmlFor="Year">Year:</label>
      <input list="options-Year" id="Year" name="Year" />
      <DatalistOptions csvFilePath={csvFilePath} column="Year" />

      <label htmlFor="Kilometer">Kilometer:</label>
      <input list="options-kilometer" id="kilometer" name="kilometer" />
      <DatalistOptions csvFilePath={csvFilePath} column="kilometer" />

      <label htmlFor="Fuel_type">Fuel_type:</label>
      <input list="options-Fuel_type" id="Fuel_type" name="Fuel_type" />
      <DatalistOptions csvFilePath={csvFilePath} column="Fuel_type" />

      <label htmlFor="Seller_type">Seller_type:</label>
      <input list="options-Seller_type" id="Seller_type" name="Seller_type" />
      <DatalistOptions csvFilePath={csvFilePath} column="Seller_type" />

      <label htmlFor="Transmission">Transmission:</label>
      <input list="options-Transmission" id="Transmission" name="Transmission" />
      <DatalistOptions csvFilePath={csvFilePath} column="Transmission" />

      <label htmlFor="Owner">Owner:</label>
      <input list="options-Owner" id="Owner" name="Owner" />
      <DatalistOptions csvFilePath={csvFilePath} column="Owner" />

      <label htmlFor="Engine">Engine:</label>
      <input list="options-Engine" id="Engine" name="Engine" />
      <DatalistOptions csvFilePath={csvFilePath} column="Engine" />

      <label htmlFor="Max_power">Max_power:</label>
      <input list="options-Max_power" id="Max_power" name="Max_power" />
      <DatalistOptions csvFilePath={csvFilePath} column="Max_power" />

      <label htmlFor="Seats">Seats:</label>
      <input list="options-Seats" id="Seats" name="Seats" />
      <DatalistOptions csvFilePath={csvFilePath} column="Seats" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
