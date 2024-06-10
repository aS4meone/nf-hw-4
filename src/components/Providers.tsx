"use client";

import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactNode} from 'react';

const queryClient = new QueryClient();

const Providers: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

const NewProviders: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
