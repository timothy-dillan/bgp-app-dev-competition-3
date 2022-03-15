import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import ReactLanding from './pages/defaultreact'
import Products from './pages/product';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={ <ReactLanding />} />
      <Route path="landing" element={<LandingPage /> } />
      <Route path="product/*" element={<Products />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
   </div>
  );
}

export default App;
