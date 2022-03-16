import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './pages/landing'
import LoginPage from './pages/Login'
import SignupPage from './pages/SignUp';
import ReactLanding from './pages/defaultreact'
import Products from './pages/product';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={ <ReactLanding />} />
      <Route path="landing" element={<LandingPage /> } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />      
      <Route path="product/*" element={<Products />} />
    </Routes>
   </div>
  );
}

export default App;
