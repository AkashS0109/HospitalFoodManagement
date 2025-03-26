import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'
import { store,persistor} from './redux/store.js'; 

import { Provider } from 'react-redux'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>

    <App />
    </PersistGate>
    </Provider>
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
)
