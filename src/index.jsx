import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/chatStyle.scss';
import { AuthContextProvider } from './context/AuthContext.jsx';
import SearchContextProvider from './context/SearchContext.jsx';
import ChatContextProider from './context/ChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </ChatContextProider>
  </AuthContextProvider>,
);
