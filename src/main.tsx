import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {LenisProvider} from './motion';
import {ContentProvider} from './providers/contentProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <LenisProvider>
        <App />
      </LenisProvider>
    </ContentProvider>
  </StrictMode>,
);
