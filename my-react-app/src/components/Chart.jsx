import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ ticker }) { 
  const [stockData, setStockData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "5396fb94ef704bf6805308137609e24e";

  useEffect(() => {
    if (!ticker) return; // if ticker is empty then data is not fetched

const fetchStockData = async () => {
  const response = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1h&outputsize=30&apikey=${API_KEY}`
  );
  const data = await response.json();

  if (data.values && data.status !== "error") {
    const times = data.values.reverse().map(entry => 
      new Date(entry.datetime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit" })
    );
    
    const prices = data.values.map(entry => +entry.close);
    
    setStockData(prices);
    setLabels(times);
    setError(null);
  } else {
    setError(`Error: ${data.message || "No stock data available."}`);
  }
};
    fetchStockData();
    const interval = setInterval(fetchStockData, 10000); // updates every 10 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [ticker]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${ticker} Stock Price`,
        data: stockData,
        borderColor: "rgb(0, 255, 200)",
        backgroundColor: "rgba(0, 255, 200, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: "600px", margin: "auto", textAlign: "center" }}>
      <h2>{ticker} Live Stock Chart</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : <Line data={chartData} />}
    </div>
  );
}

export default Chart;
