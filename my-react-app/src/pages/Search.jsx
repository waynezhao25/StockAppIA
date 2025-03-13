import {useState, useEffect} from 'react';
import Chart from "../components/Chart";

function Stock() {
    const API_KEY = 'cv2k7h9r01qhefskqk4gcv2k7h9r01qhefskqk50';
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [interval, setTimeInterval] = useState("1");
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(savedWatchlist);

  }, []);
    function handleInput(event){
        setTicker(event.target.value.toUpperCase());
    }
    const fetchStockData = () => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.c) { // if ticker has a matching data and current price then that stock is set
              setStockData(data);
            }})};
            const addToWatchlist = () => {
              if (!ticker) return; // Don't add empty tickers
              const updatedWatchlist = [...watchlist, ticker.toUpperCase()];
              setWatchlist(updatedWatchlist);
              localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
          };
  return (
    <div>
      <h1>Stock Market Data</h1>
      <input 
        type="text" 
        value={ticker} 
        onChange={handleInput} 
        placeholder="Type stock ticker here" 
      />
      <button onClick={fetchStockData}>Fetch Data</button>
      <button onClick={addToWatchlist}>Add to Watchlist</button>
      {stockData && (
        <div>
          <h2>{ticker} Stock Data</h2>
          <p>Current Price: ${stockData.c}</p>
          <p>High: ${stockData.h}</p>
          <p>Low: ${stockData.l}</p>
          <p>Open: ${stockData.o}</p>
          <p>Previous Close: ${stockData.pc}</p>
          <p>Volume: ${stockData.v}</p>
        </div>
      )}
      <select onChange={(event) => setTimeInterval(event.value)} value={interval}>
        <option value="1">1 Min</option>
        <option value="5">5 Min</option>
        <option value="60">1 Hour</option>
        <option value="D">Daily</option>
      </select>
      <Chart ticker={ticker} interval={interval} />
    </div> 
  );
}

export default Stock;
