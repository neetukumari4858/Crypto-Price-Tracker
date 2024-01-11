import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api4.binance.com/api/v3/ticker/24hr"
        );
        const newData = response.data.reduce(
          (accumulator, coinItem) => {
            accumulator[coinItem.symbol] = [
              coinItem,
              ...(accumulator[coinItem.symbol] || []),
            ];
            return accumulator;
          },
          { ...data }
        );

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
      <h1>Real-time Crypto Price Tracker</h1>
      <div className="App">
        {Object.keys(data).map((symbol) => (
          <div key={symbol}>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>PriceChange</th>
                </tr>
              </thead>
              <tbody>
                {data[symbol].map((coinItem, index) => (
                  <tr key={index}>
                    <td>{coinItem.symbol}</td>
                    <td>{coinItem.priceChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
