import './index.css';
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraUiProvider } from './contexts/ChakraUiProvider';
import { GlobalContextProvider } from './contexts/GlobalContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraUiProvider>
      <GlobalContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalContextProvider>
    </ChakraUiProvider>
  </BrowserRouter>
);
