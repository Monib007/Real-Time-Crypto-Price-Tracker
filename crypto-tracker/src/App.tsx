import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { fetchCryptoData } from './redux/cryptoSlice'
import CryptoTable from './components/CryptoTable'
import './styles.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Dispatch the fetchCryptoData action to load initial data
    dispatch(fetchCryptoData())

    // Simulate price updates every 5 seconds (optional, if you'd like to keep it real-time)
    const interval = setInterval(() => {
      dispatch(fetchCryptoData()) // Refresh data every 5 seconds from CoinMarketCap
    }, 5000)

    return () => clearInterval(interval) // Cleanup the interval on unmount
  }, [dispatch])

  return (
    <div>
      <h1>Crypto Tracker</h1>
      <CryptoTable />
    </div>
  )
}

export default App
