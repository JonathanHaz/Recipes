import React from 'react';
import './Footer.css';
// import facebookLogo from './images/facebook-logo.png';
// import instagramLogo from './images/instagram-logo.png';
// import linkedinLogo from './images/linkedin-logo.png';
// import githubLogo from './images/github-logo.png';
import logo from "../../assets/images/Recipes.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Company Logo" className="company-logo" />
        </div>
        <div className="footer-right">
          <div className="about-column">
            <h3>About Us</h3>
            <p>Recipes</p>
            <p>The Creators</p>
          </div>
          <div className="follow-us-column">
            <h3>Legal</h3>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-icons">
        <i className="fa-brands fa-facebook footer-icon"></i>
        <i className="fa-brands fa-instagram footer-icon"></i>
        <i className="fa-brands fa-linkedin footer-icon"></i>
        <i className="fa-brands fa-github footer-icon"></i>
      </div>
    </footer>
  );
}

export default Footer;
