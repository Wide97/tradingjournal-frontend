import { Link } from 'react-router-dom';
import LandingNav from "../components/LandingNav/LandingNav";
import LandingFooter from "../components/LandingFooter/LandingFooter";
import "../styles/pages/LandingPage.scss"; 

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNav />
      <main className="landing-main">
        <div className="container text-center">
          <h1>📈 Trading Journal</h1>
          <p>Il tuo diario per monitorare le performance, strategie e capitale.</p>
          <Link to="/login" className="btn btn-primary me-2">Accedi</Link>
          <Link to="/register" className="btn btn-outline-primary">Registrati</Link>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
