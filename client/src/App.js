import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import Dashboard from './pages/Dashboard';
import './App.css';
import { useEffect } from 'react';
import { useAuth } from './Context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './Context/authContext';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

function Home() {

  const { token } = useAuth();

  useEffect(() => {
    let code = new URLSearchParams(window.location.search).get('code');
    if (code && (token === null || undefined)) {
      async function fetchToken() {
        let response = await fetch(`http://localhost:5000/auth?code=${code}`);
        let data = await response.json();
        localStorage.setItem('token', data.access_token);
        window.history.pushState({}, null, '/');
        window.location.reload();
      }

      fetchToken();
    }
  }, []);

  return (
    <div>
      <LoginButton />
      {token && <Navigate to="/dashboard" />}
    </div>
  );
}

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}