import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight, Compass } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <a href="#home" className="brand-logo" onClick={closeMenu}>
            <div className="logo-icon-badge">
              <Compass size={22} className="logo-icon" />
            </div>
            <span className="logo-text">
              BUILD<span className="gold-text">CRAFT</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <a href="#home" className="nav-item">Home</a>
            <a href="#about" className="nav-item">About</a>
            <a href="#services" className="nav-item">Services</a>
            <a href="#projects" className="nav-item">Projects</a>
            <a href="#estimator" className="nav-item estimator-nav">
              <span className="pulse-dot"></span> Estimator
            </a>
            <a href="#process" className="nav-item">Process</a>
            <a href="#contact" className="nav-item">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="navbtions">
            <a href="tel:+919876543210" className="phone-cta">
              <Phone size={15} />
              <span>+91 98765 43210</span>
            </a>

            <button 
              className="gold-btn navbar-quote-btn"
              onClick={onOpenQuote}
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={closeMenu}></div>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="brand-logo">
              <div className="logo-icon-badge">
                <Compass size={20} className="logo-icon" />
              </div>
              <span className="logo-text">BUILD<span className="gold-text">CRAFT</span></span>
            </div>
            <button className="mobile-drawer-close" onClick={closeMenu}>
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-links-list">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#projects" onClick={closeMenu}>Featured Projects</a>
            <a href="#estimator" onClick={closeMenu}>Cost Estimator (Live)</a>
            <a href="#process" onClick={closeMenu}>Our Process</a>
            <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a href="#contact" onClick={closeMenu}>Contact & Site Visits</a>
          </nav>

          <div className="mobile-drawer-footer">
            <button 
              className="gold-btn w-full"
              onClick={() => {
                closeMenu();
                onOpenQuote();
              }}
            >
              Request Free Estimate
            </button>
            <p className="mobile-phone-txt">
              Direct Desk: <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
