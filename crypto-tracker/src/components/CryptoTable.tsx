import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { CryptoAsset } from '../redux/cryptoSlice'

const CryptoTable: React.FC = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets)

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Logo</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>1h %</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>24h Volume</th>
          <th>Circulating Supply</th>
          <th>Max Supply</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset: CryptoAsset, index: number) => (
          <tr key={asset.id}>
            <td>{index + 1}</td>
            <td>
              <img src={asset.image} alt={asset.name} width="30" height="30" />
            </td>
            <td>{asset.name}</td>
            <td>{asset.symbol}</td>
            <td>${asset.current_price.toLocaleString()}</td>
            <td style={{ color: asset.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red' }}>
              {asset.price_change_percentage_1h_in_currency}%
            </td>
            <td style={{ color: asset.price_change_percentage_24h_in_currency > 0 ? 'green' : 'red' }}>
              {asset.price_change_percentage_24h_in_currency}%
            </td>
            <td style={{ color: asset.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red' }}>
              {asset.price_change_percentage_7d_in_currency}%
            </td>
            <td>${asset.market_cap.toLocaleString()}</td>
            <td>${asset.total_volume.toLocaleString()}</td>
            <td>{asset.circulating_supply.toLocaleString()}</td>
            <td>{asset.max_supply ? asset.max_supply.toLocaleString() : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CryptoTable
