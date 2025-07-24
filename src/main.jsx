import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from '@components/ui/provider.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from './components/ui/toaster.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
