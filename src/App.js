import './App.css';
import Navbar from './components/Navbar/Navbar';
import RouteProvider from './routes/RouteProvider';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <Navbar />
      <RouteProvider />
      <Footer />
    </div>
  );
}

export default App;
