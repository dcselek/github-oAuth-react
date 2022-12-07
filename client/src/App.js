import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './Context/authContext';
import Layout from './components/Layout';
import Home from './pages/Home';

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

