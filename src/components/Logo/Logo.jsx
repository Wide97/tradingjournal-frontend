import { Link } from "react-router-dom";
import logo from "../../assets/ChatGPT Image 9 mag 2025, 18_48_07.png";
import "./Logo.scss";

function Logo() {
  return (
    <Link to="/" className="logo d-flex align-items-center">
      <img src={logo} alt="Trading Journal Logo" className="logo-img me-2" />
      <span className="logo-text">Trading <strong>Journal</strong></span>
    </Link>
  );
}

export default Logo;
