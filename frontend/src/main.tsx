import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Reducer
import reducers from './redux/reducers/reducer.ts';

// Components
import App from './App.tsx';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';

// Styles
import './variables.scss';
import './index.scss';

const queryClient = new QueryClient();
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// biome-ignore lint/style/noNonNullAssertion: <Vite Config>
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer draggable={false} />
      <Header />
      <App />
      <Footer />
    </QueryClientProvider>
  </Provider>,
);
