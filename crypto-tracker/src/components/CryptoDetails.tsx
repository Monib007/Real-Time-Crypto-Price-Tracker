import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchCoinDetails, fetchCoinHistory } from '../redux/cryptoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import './CryptoDetails.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoDetails = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { coinDetails, coinHistory, status } = useSelector((state: RootState) => state.crypto);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coinId) {
      dispatch(fetchCoinDetails(coinId));
      dispatch(fetchCoinHistory(coinId));
    }
  }, [dispatch, coinId]);

  useEffect(() => {
    if (coinDetails && coinHistory) {
      setLoading(false);
    }
  }, [coinDetails, coinHistory]);

  // Safely access the prices and labels with optional chaining
  const data = coinHistory?.prices?.map((price: [number, number]) => price[1]);
  const labels = coinHistory?.prices?.map((price: [number, number]) => new Date(price[0]).toLocaleDateString());

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price History',
        data,
        fill: false,
        borderColor: '#007bff',
        tension: 0.1,
      },
    ],
  };

  if (status === 'loading' || loading) return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to fetch data</p>;

  return (
    <div className="crypto-details-container">
      <div className="crypto-details-header">
        {/* Check if coinDetails is not null */}
        {coinDetails?.image?.small && (
          <img src={coinDetails.image.small} alt={coinDetails.name} width="100" height="100" />
        )}
        <div>
          <h1>{coinDetails?.name}</h1>
          <p>{coinDetails?.symbol.toUpperCase()} - {coinDetails?.id}</p>
        </div>
      </div>

      <div className="crypto-stats">
        <div className="crypto-stat">
          <h3>Price</h3>
          <p>${coinDetails?.market_data?.current_price?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
        <div className="crypto-stat">
          <h3>Market Cap</h3>
          <p>${coinDetails?.market_data?.market_cap?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
        <div className="crypto-stat">
          <h3>24h Volume</h3>
          <p>${coinDetails?.market_data?.total_volume?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Price Chart (Last 7 Days)</h2>
        {coinHistory?.prices && coinHistory.prices.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>No historical data available.</p>
        )}
      </div>

      <a href="/" className="back-button">Back to Crypto List</a>
    </div>
  );
};

export default CryptoDetails;
