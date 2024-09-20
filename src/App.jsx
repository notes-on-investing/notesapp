import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the environment variable using process.env
  // const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `${SERVER_URL}/api/test`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>Closing Prices</thead>
          <tbody>
            <tr>
              <td>Date</td>
              {data.map((item, index) => (
                <td key={index} style={{ textAlign: "right" }}>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
              ))}
            </tr>
            <tr>
              <td>Ticker</td>
              {data.map((item, index) => (
                <td key={index} style={{ textAlign: "right" }}>
                  {item.ticker}
                </td>
              ))}
            </tr>
            <tr>
              <td>Close</td>
              {data.map((item, index) => (
                <td key={index} style={{ textAlign: "right" }}>
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: "0",
                    maximumFractionDigits: "0",
                  }).format(item.close)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
