import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Common/Navbar';
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/carts' element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
