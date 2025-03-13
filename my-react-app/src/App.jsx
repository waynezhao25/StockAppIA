import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Search from '../src/pages/Search';
import Watchlist from '../src/pages/Watchlist';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Search</Link></li>
          <li><Link to="/Watchlist">Watchlist</Link></li>
          <li><Link to="">Account</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/Watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
