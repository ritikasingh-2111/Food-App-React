import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export const Header = () => {

  const [btnNameReact, setBtnNameReact] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnline = useOnlineStatus();

  return (
    <div className="header">
      <div>
        <img className="logo" src={LOGO_URL} />
      </div>

      <button
        className="hamburger-btn"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>

      <div className={"nav-items" + (menuOpen ? " nav-items-open" : "")}>
        <ul>
          <li>Online Status:{isOnline ? "✅" : "❌"}</li>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>

          <li>
            <button
              className="login-btn"
              onClick={() => {
                btnNameReact === "Login"
                  ? setBtnNameReact("Logout")
                  : setBtnNameReact("Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>

          <li>
            <i className="ri-shopping-cart-2-line"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const FakeHeader = () => {
  return <div className="fakeheader"></div>;
};