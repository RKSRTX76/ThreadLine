
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from "@/components/ui/toast";

import { Modals } from './components/organisms/modals/Modals';
import { AppContextProvider } from './context/AppContextProvider';
import { AppRoutes } from './Routes';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <AppContextProvider>
            <AppRoutes />
            <Modals />
        </AppContextProvider>
        <Toaster />
    </QueryClientProvider>
  );
}

export default App
