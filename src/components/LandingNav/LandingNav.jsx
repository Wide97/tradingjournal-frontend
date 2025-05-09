import { Link } from "react-router-dom";
import "./LandingNav.scss";
import logo from "../../assets/ChatGPT Image 9 mag 2025, 18_48_07.png"; 
import { useState } from "react";


function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="landing-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo" />
          <span>Trading <strong>Journal</strong></span>
        </Link>

        <div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/login" className="nav-link">Sign In</Link>
          <Link to="/register" className="nav-link btn-link">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
