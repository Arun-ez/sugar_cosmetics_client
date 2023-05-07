import './App.css';
import Navbar from './components/Navbar/Navbar';
import RouteProvider from './routes/RouteProvider';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { token_login } from './redux/auth/actions';
import { BottomBar } from './components/BottomBar/BottomBar';

function App() {

  let dispatch = useDispatch();

  let token = useSelector((store) => {
    return store.AuthReducer.token;
  })

  useEffect(() => {
    if (token) {
      dispatch(token_login);
    }
  }, [])

  let [ad_display, set_ad_display] = useState("flex");

  return (
    <div className="App">
      <Navbar ad_display={ad_display} set_ad_display={set_ad_display} />
      <RouteProvider ad_display={ad_display} />

      <Footer />
      <BottomBar />
    </div>
  );
}

export default App;
