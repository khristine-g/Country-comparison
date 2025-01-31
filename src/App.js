import React, { useState, useEffect } from "react";
import CountrySelector from "./Components/CountrySelector";
import { Line } from "react-chartjs-2";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState(["United States", "Kenya"]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (countries.length === 2) {
      fetchData();
    }
  }, [countries]);

  const fetchData = async () => {
    const [country1, country2] = countries;
    const apiKey = process.env.REACT_APP_API_KEY; // Api Key
    const url = `https://api.tradingeconomics.com/historical/country/${country1},${country2}/indicator/GDP?c=${apiKey}&f=json`;
  
    try {
      const response = await fetch(url);
  
      if (response.status === 403) {
        console.error("Access forbidden. Please check your API key or account permissions.");
        return;
      }
  
      const result = await response.json();
      const labels = result.map((item) => item.Date);
      const values1 = result.filter((item) => item.Country === country1).map((item) => item.Value);
      const values2 = result.filter((item) => item.Country === country2).map((item) => item.Value);
  
      setChartData({
        labels,
        datasets: [
          {
            label: country1,
            data: values1,
            borderColor: "blue",
            fill: false,
          },
          {
            label: country2,
            data: values2,
            borderColor: "red",
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className="container">
      <h1>Country GDP Comparison</h1>
      <CountrySelector onSelect={setCountries} />
      {chartData ? (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
