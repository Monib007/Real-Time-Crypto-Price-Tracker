import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCoinDetails, fetchCoinHistory } from '../redux/cryptoSlice';
import './CryptoDetails.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetails: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { coinDetails, coinHistory, coinDetailsStatus, coinHistoryStatus } = useSelector((state: RootState) => state.crypto);
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

  const data = coinHistory?.prices?.map(([price]: [number, number]) => price);
  const labels = coinHistory?.prices?.map(([timestamp]: [number, number]) =>
    new Date(timestamp).toLocaleDateString()
  );
  

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: 'Price History (USD)',
        data: data || [],
        fill: false,
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        tension: 0.1,
      },
    ],
  };

  if (coinDetailsStatus === 'loading' || coinHistoryStatus === 'loading' || loading) {
    return <p>Loading...</p>;
  }
  
  if (coinDetailsStatus === 'failed' || coinHistoryStatus === 'failed' || !coinDetails) {
    return <p>Failed to fetch coin data. Please try again later.</p>;
  }
  

  return (
    <div className="crypto-details-container">
      <div className="crypto-details-header">
        {coinDetails.image?.small && (
          <img src={coinDetails.image.small} alt={coinDetails.name} width="100" height="100" />
        )}
        <div>
          <h1>{coinDetails.name}</h1>
          <p>{coinDetails.symbol.toUpperCase()} - {coinDetails.id}</p>
        </div>
      </div>

      <div className="crypto-stats">
        <div className="crypto-stat">
          <h3>Price</h3>
          <p>${coinDetails.market_data?.current_price?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
        <div className="crypto-stat">
          <h3>Market Cap</h3>
          <p>${coinDetails.market_data?.market_cap?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
        <div className="crypto-stat">
          <h3>24h Volume</h3>
          <p>${coinDetails.market_data?.total_volume?.usd?.toLocaleString() ?? 'N/A'}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Price Chart (Last 7 Days)</h2>
        {coinHistory?.prices?.length ? (
          <Line data={chartData} />
        ) : (
          <p>No historical data available.</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Crypto List
      </button>
    </div>
  );
};

export default CryptoDetails;
