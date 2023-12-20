import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient, Query } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import './styles/chatStyle.scss';
import { AuthContextProvider } from './context/AuthContext.jsx';
import SearchContextProvider from './context/SearchContext.jsx';
import ChatContextProider from './context/ChatContext.jsx';

const client= new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProider>
      <SearchContextProvider>
        <QueryClientProvider client={client}>
        <App />
        </QueryClientProvider>
      </SearchContextProvider>
    </ChatContextProider>
  </AuthContextProvider>,
);
