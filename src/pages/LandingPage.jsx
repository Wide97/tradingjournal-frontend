import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <h1>📈 Trading Journal</h1>
      <p>Il tuo diario per monitorare le performance, strategie e capitale.</p>
      <Link to="/login" className="btn btn-primary me-2">Accedi</Link>
      <Link to="/register" className="btn btn-outline-primary">Registrati</Link>
    </div>
  );
}
