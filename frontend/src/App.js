import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';
import LandingPage from './pages/landing';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Products from './pages/product';
import BidsPage from './pages/bids';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="product/*" element={<Products />} />
        <Route path="/bids" element={<BidsPage />} />
      </Routes>
    </div>
  );
}

export default App;
