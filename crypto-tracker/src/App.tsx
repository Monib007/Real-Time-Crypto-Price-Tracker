// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoTable from './components/CryptoTable';
import CryptoDetails from './components/CryptoDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        <Route path="/coin/:coinId" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
