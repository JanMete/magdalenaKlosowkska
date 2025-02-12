import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './views/layout/Layout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Layout />
  </QueryClientProvider>
);
