import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeroUIProvider>
            <ToastProvider placement="top-right" toastOffset={120} />
            <main className="text-foreground bg-background">
                <App />
            </main>
        </HeroUIProvider>
    </StrictMode>,
);