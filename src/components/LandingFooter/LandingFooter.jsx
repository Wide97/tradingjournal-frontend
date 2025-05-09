import "./LandingFooter.scss";

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Trading Journal — Powered by Marco Widesott</p>
      </div>
    </footer>
  );
}

export default LandingFooter;
