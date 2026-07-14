import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import AdminApp from './AdminApp';
import { ContentProvider } from '../providers/contentProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <AdminApp />
    </ContentProvider>
  </StrictMode>
);
