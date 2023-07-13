import './App.css';
import Navbar from './components/Navbar/Navbar';
import RouteProvider from './routes/RouteProvider';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { token_login } from './redux/auth/actions';
import { BottomBar } from './components/BottomBar/BottomBar';
import { ToastContainer } from 'react-toastify';

const App = () => {

  let dispatch = useDispatch();

  let { token, user } = useSelector((store) => {
    return store.AuthReducer;
  })

  useEffect(() => {
    if (token && !user.email) {
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
      <ToastContainer
        position="bottom-left"
        theme='dark'
        autoClose={2000}
        pauseOnFocusLoss={false}
        style={{ width: "250px" }}
        pauseOnHover={false}
        progressStyle={{ backgroundColor: "#917EF2" }}
      />
    </div>
  );
}

export { App };
