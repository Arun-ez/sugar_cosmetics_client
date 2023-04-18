import './App.css';
import Navbar from './components/Navbar/Navbar';
import RouteProvider from './routes/RouteProvider';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {

  let AuthData = useSelector((store) => {
    return store.AuthReducer;
  })

  useEffect(() => {
    console.log(AuthData);
  }, [])

  // console.log(localStorage.getItem("sugar_token"));

  let [ad_display, set_ad_display] = useState("flex");

  return (
    <div className="App">
      <Navbar ad_display={ad_display} set_ad_display={set_ad_display} />
      <RouteProvider ad_display={ad_display} />
      <Footer />
    </div>
  );
}

export default App;
