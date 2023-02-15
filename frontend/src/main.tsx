import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
//import { msalConfig } from "./authConfig";
const msalConfig = require('./authConfig');

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);
