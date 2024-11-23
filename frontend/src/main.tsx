import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Components
import App from './App.tsx';
import Header from './components/Header/index.tsx';

// Styles
import './variables.scss';
import './index.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Header />
    <App />
  </QueryClientProvider>
);
