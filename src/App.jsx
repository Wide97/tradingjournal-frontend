import './styles/custom.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AssetPage from './pages/AssetPage'; 
import CapitalePage from './pages/CapitalePage';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <PrivateRoute>
              <AssetPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/capital"
          element={
            <PrivateRoute>
              <CapitalePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

