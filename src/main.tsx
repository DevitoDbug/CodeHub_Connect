import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import "./styles/chatStyle.scss";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatContextProider } from "./context/ChatContext.tsx";
import SearchContextProvider from "./context/SearchContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ChatContextProider>
      <SearchContextProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </SearchContextProvider>
    </ChatContextProider>
  </AuthContextProvider>
);
