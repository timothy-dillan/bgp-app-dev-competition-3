import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './pages/landing'
import ReactLanding from './pages/defaultreact'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={ <ReactLanding />} />
      <Route path="/landing" element={<LandingPage /> } />
    </Routes>
   </div>
  );
}

export default App;
