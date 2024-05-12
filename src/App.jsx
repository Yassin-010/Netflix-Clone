import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home.js';
import ModalMovie from './components/ModalMovie/ModalMovie.js';
import Navbar from './components/Navbar/Navbar.js';
import FavList from './components/FavList/FavList.js';
import Footer from './components/Footer/Footer.js';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favlist" element={<FavList />} />
          <Route path="/modal" element={
              <ModalMovie />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;