import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  const goToAssets = () => {
    navigate('/assets');
  };

  return (
    <div className="container mt-5">
      <h1>Benvenuto nella Dashboard!</h1>
      <p>Qui ci sarà il riepilogo dei tuoi trade e del capitale.</p>

      <button className="btn mt-3" onClick={goToAssets}>
        Vai alla pagina Asset
      </button>
    </div>
  );
}
