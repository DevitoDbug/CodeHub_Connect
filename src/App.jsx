import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import { useContext } from 'react';
import { LoginContext } from './context/AuthContext';
import CurrentPageContexProvider from './context/CurrentPageContex';

const App = () => {
  const currentUser = useContext(LoginContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser.currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <CurrentPageContexProvider>
      <div className=" flex h-[100svh] w-screen items-center justify-center">
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
  );
};
export default App;
