import { useState } from "react";
import facebookIcon from "../Assets/Facebook.png";
import twitterIcon from "../Assets/Twitter.png";
import instaIcon from "../Assets/Instagram.jpeg";
import linkedIcon from "../Assets/Linkedin.png";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <footer style={footerStyle}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
      <div style={{marginLeft:"15%", marginTop:"3%"}}>
      <div style={socialMediaContainerStyle}>
        <a
          href="https://www.facebook.com"
          onMouseEnter={() => setHoveredIcon('facebook')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img
            src={facebookIcon}
            alt="Facebook"
            style={{ ...socialMediaIconStyle, ...(hoveredIcon === 'facebook' && iconHoverStyle) }}
          />
        </a>
        <a
          href="https://www.twitter.com"
          onMouseEnter={() => setHoveredIcon('twitter')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img
            src={twitterIcon}
            alt="Twitter"
            style={{ ...socialMediaIconStyle, ...(hoveredIcon === 'twitter' && iconHoverStyle) }}
          />
        </a>
        <a
          href="https://www.instagram.com"
          onMouseEnter={() => setHoveredIcon('instagram')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img
            src={instaIcon}
            alt="Instagram"
            style={{ ...socialMediaIconStyle, ...(hoveredIcon === 'instagram' && iconHoverStyle) }}
          />
        </a>
        <a
          href="https://www.linkedin.com"
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img
            src={linkedIcon}
            alt="LinkedIn"
            style={{ ...socialMediaIconStyle, ...(hoveredIcon === 'linkedin' && iconHoverStyle) }}
          />
        </a>
      </div>

      <div style={footerContentStyle}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '10px' }}>
          <h4 style={{ color: "#87cefa" }}>info@blooddonationwebsite.com</h4>
          <h4 style={{ color: "#87cefa" }}>+1 (555) 123-4567</h4>
        </div>
        <h5 style={{ color: "#87cefa", textAlign: 'center' }}>123 Blood Donation St, Lifesaver City, USA</h5>
      </div>

      <div style={footerContentStyle}>
        <ul style={quickLinksStyle}>
          <li><a href="/about" style={linkStyle}>About Us</a></li>
          <li><span style={separatorStyle}>|</span><a href="/donate" style={linkStyle}>Donate Blood</a></li>
          <li><span style={separatorStyle}>|</span><a href="/services" style={linkStyle}>Services</a></li>
          <li><span style={separatorStyle}>|</span><a href="/contact" style={linkStyle}>Contact Us</a></li>
        </ul>
      </div>
      </div>

      <div className="footer-form-container" style={footerFormContainerStyle}>
        <div className="footer-form">
          <div className="form-card">
            <div className="form-title">
              <h4 style={{ color: "black" }}>Quick Message</h4>
            </div>
            <div className="form-body">
              <input type="text" placeholder="Enter Name" className="form-control" style={{ marginBottom: 10 }} />
              <input type="text" placeholder="Enter Mobile no" className="form-control" style={{ marginBottom: 10 }} />
              <input type="text" placeholder="Enter Email Address" className="form-control" style={{ marginBottom: 10 }} />
              <input type="text" placeholder="Your Message" className="form-control" style={{ marginBottom: 10 }} />
              <button className="btn btn-sm btn-primary w-100" style={{ backgroundColor: "#3ca5dc", borderColor: "#3ca5dc", marginTop: 10 }}>Send Request</button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div style={footerContentStyle}>
        <p style={{ textAlign: 'center' }}>
          "We are dedicated to saving lives by connecting donors with those in need of blood. Your donation can make a difference.
          Blood Donation Website acknowledges the support of various organizations and community partners.
          The views expressed on this website are those of the Blood Donation Website and do not necessarily reflect
          those of our supporters. We also recognize the vital contributions of our dedicated volunteers and staff who make our mission possible."
        </p>
      </div>

      

      <div style={{ marginTop: '20px', color: "skyblue" }}>
        <hr style={{ border: '1px solid skyblue', marginBottom: '20px' }} />
        <p>&copy; 2024 TrustBlu. All rights reserved.</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#192841',
  color: 'white',
  textAlign: 'center',
  padding: '1rem',
  bottom: 0,
  width: '100%',
  position: 'relative',
  height: 'auto'
};

const socialMediaContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  marginBottom: 30
};

const socialMediaIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: 10
};

const iconHoverStyle = {
  transform: 'scale(1.2)'
};

const quickLinksStyle = {
  listStyleType: 'none',
  padding: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: 'wrap',
  gap: '10px'
};

const footerContentStyle = {
  margin: '20px 0'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#3ca5dc',
  margin: 10
};

const separatorStyle = {
  margin: '0 10px',
  color: '#3ca5dc'
};

const footerFormContainerStyle = {
  backgroundColor: "#87cefa",
  margin: '20px auto',
  width: '80%',
  maxWidth: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
  borderRadius: '8px',
  padding: '20px',
  position: 'relative'
};

export default Footer;
