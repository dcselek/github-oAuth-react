import {Routes, Route, Outlet} from 'react-router-dom';
import LoginButton from './components/LoginButton';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

function Home() {
  return (
    <div>
      <LoginButton />
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