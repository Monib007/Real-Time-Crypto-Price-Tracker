// src/components/CryptoTable.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCryptoData } from '../redux/cryptoSlice';
import './CryptoTable.css';

const CryptoTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { coins, coinListStatus } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData(currentPage));
  }, [dispatch, currentPage]);

  const handleRowClick = (coinId: string) => navigate(`/coin/${coinId}`);
  const handlePageChange = (page: number) => setCurrentPage(page);

  if (coinListStatus === 'loading') return <p>Loading...</p>;
  if (coinListStatus === 'failed') return <p>Failed to fetch data</p>;

  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>Supply</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => (
            <tr key={coin.id} onClick={() => handleRowClick(coin.id)} style={{ cursor: 'pointer' }}>
              <td><img src={coin.image} alt={coin.name} width="24" /></td>
              <td>{coin.name}</td>
              <td>${coin.current_price.toFixed(2)}</td>
              <td className={getColorClass(coin.price_change_percentage_1h_in_currency)}>{formatPercent(coin.price_change_percentage_1h_in_currency)}</td>
              <td className={getColorClass(coin.price_change_percentage_24h_in_currency)}>{formatPercent(coin.price_change_percentage_24h_in_currency)}</td>
              <td className={getColorClass(coin.price_change_percentage_7d_in_currency)}>{formatPercent(coin.price_change_percentage_7d_in_currency)}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              <td>{coin.circulating_supply.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const formatPercent = (value: number | null | undefined) => value != null ? `${value.toFixed(2)}%` : 'N/A';
const getColorClass = (value: number | null | undefined) => value == null ? '' : value >= 0 ? 'positive' : 'negative';

export default CryptoTable;
