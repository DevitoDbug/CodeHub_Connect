import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { FC, ReactNode, useContext } from "react";
import { LoginContext } from "./context/AuthContext";
import CurrentPageContexProvider from "./context/CurrentPageContex";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProtectedRouteParam {
  children: ReactNode;
}

export const App: FC = () => {
  // const loginContex = useContext(LoginContext);

  const ProtectedRoute = ({ children }: ProtectedRouteParam): ReactNode => {
    // if (!loginContex.currentUser.uid) {
    // return <Navigate to="/login" />;
    // }

    return children;
  };

  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentPageContexProvider>
        <div className=" flex h-[100svh] w-screen items-center justify-center overflow-hidden">
          <BrowserRouter>
            <Routes>
              <Route path="/*">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </CurrentPageContexProvider>
    </QueryClientProvider>
  );
};
