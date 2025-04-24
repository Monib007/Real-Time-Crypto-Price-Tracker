import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { AppDispatch, RootState } from '../redux/store'; 
import { fetchCryptoData } from '../redux/cryptoSlice'; // Corrected import
import './CryptoTable.css';

const ITEMS_PER_PAGE = 20;

const CryptoTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coins, status } = useSelector((state: RootState) => state.crypto);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCryptoData()); // Fetch top 10 cryptocurrencies
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (coinId: string) => {
    navigate(`/coin/${coinId}`);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to fetch data</p>;

  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h Change</th>
            <th>24h Change</th>
            <th>7d Change</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin: any) => (
            <tr key={coin.id} onClick={() => handleRowClick(coin.id)} style={{ cursor: 'pointer' }}>
              <td><img src={coin.image} alt={coin.name} width="24" height="24" /></td>
              <td>{coin.name}</td>
              <td>${coin.current_price?.toFixed(2) ?? 'N/A'}</td>
              <td className={getColorClass(coin.price_change_percentage_1h_in_currency)}>{formatPercent(coin.price_change_percentage_1h_in_currency)}</td>
              <td className={getColorClass(coin.price_change_percentage_24h_in_currency)}>{formatPercent(coin.price_change_percentage_24h_in_currency)}</td>
              <td className={getColorClass(coin.price_change_percentage_7d_in_currency)}>{formatPercent(coin.price_change_percentage_7d_in_currency)}</td>
              <td>${coin.market_cap?.toLocaleString() ?? 'N/A'}</td>
              <td>${coin.total_volume?.toLocaleString() ?? 'N/A'}</td>
              <td>{coin.circulating_supply?.toLocaleString() ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(10)].map((_, index) => (
          <button
            key={index + 1}
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

const formatPercent = (value: number | null | undefined): string => {
  return value !== null && value !== undefined ? `${value.toFixed(2)}%` : 'N/A';
};

const getColorClass = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return value >= 0 ? 'positive' : 'negative';
};

export default CryptoTable;
