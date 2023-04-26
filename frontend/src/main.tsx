import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { setDefaultOptions } from 'date-fns';
import { enUS, nb } from 'date-fns/locale';
import './index.css';

setDefaultOptions({
  locale: /en(-(gb|us))?/i.test(navigator.language) ? enUS : nb,
  weekStartsOn: 1
});

const msalInstance = new PublicClientApplication(msalConfig);

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
