import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RideOptions from './pages/RideOptions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opcoes" element={<RideOptions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
