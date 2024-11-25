import { Route, BrowserRouter, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RideOptions from './pages/RideOptions';
import RideHistory from './pages/RideHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opcoes/:customer_id?" element={<RideOptions />} />
        <Route path="/historico" element={<RideHistory />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
