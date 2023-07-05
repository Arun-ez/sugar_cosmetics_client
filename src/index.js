import './index.css';
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalContextProvider from './contexts/GlobalContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <GlobalContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
