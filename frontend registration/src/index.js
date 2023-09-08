import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleReCaptchaProvider reCaptchaKey="6LfaJuMlAAAAALDDnChPEGR4zUeuuB2SPNRpkeIs">
    <App />
  </GoogleReCaptchaProvider>
    
  </React.StrictMode>
);

