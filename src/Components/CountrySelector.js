import React, { useState } from "react";

const CountrySelector = ({ onSelect }) => {
  const countries = ["United States", "Kenya", "Nigeria", "United Kingdom", "Germany"];

  const [selectedCountries, setSelectedCountries] = useState(["United States", "Kenya"]);

  const handleChange = (index, event) => {
    const newSelection = [...selectedCountries];
    newSelection[index] = event.target.value;
    setSelectedCountries(newSelection);
    onSelect(newSelection);
  };

  return (
    <div className="selector-container">
      <select onChange={(e) => handleChange(0, e)} value={selectedCountries[0]}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleChange(1, e)} value={selectedCountries[1]}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
