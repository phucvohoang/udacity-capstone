import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Routing from './routing';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const Routing = makeAuthRouting();
root.render(
  <React.StrictMode>
    {/* <Routing /> */}
    <BrowserRouter>
      <Routing />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'react-hot-toast' }} />
    </BrowserRouter>

    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
