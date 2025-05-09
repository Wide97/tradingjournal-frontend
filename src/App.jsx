import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// Qui poi aggiungeremo anche DashboardPage, JournalPage ecc.

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Qui aggiungerai le rotte private tipo Dashboard */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
