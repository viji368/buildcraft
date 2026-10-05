import { useState } from 'react';
import Navbar from './components/Navbar';
import CostEstimator from './components/CostEstimator';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ProjectModal from './components/ProjectModal';
import QuoteModal from './components/QuoteModal';
import Toast from './components/Toast';
import { PROJECTS, SERVICES, TESTIMONIALS, FAQS } from './data/projectData';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Clock,
  Compass,
  Building,
  CheckCircle,
  Home,
  Building2,
  Wrench,
  Palette,
  Layers,
  MapPin,
  Calendar,
  Maximize2,
  ChevronDown,
  Mail,
  Phone,
  Send,
  Star
} from 'lucide-react';
import './App.css';

// Icon map helper for dynamic services
const iconMap = {
  Home: Home,
  Building2: Building2,
  Wrench: Wrench,
  Palette: Palette,
  ShieldCheck: ShieldCheck,
  Clock: Clock
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Residential Construction',
    message: ''
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenQuoteWithData = (data) => {
    setQuoteInitialData(data);
    setIsQuoteOpen(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setToastMessage(`Thank you ${contactForm.name}. Your site visit request has been scheduled. Our project lead will reach out shortly.`);
      setContactForm({
        name: '',
        phone: '',
        email: '',
        service: 'Residential Construction',
        message: ''
      });
    }, 700);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setToastMessage(`Subscribed! ${newsletterEmail} has been added to our quarterly Architectural Journal.`);
    setNewsletterEmail('');
  };

  return (
    <div className="app-root">
      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Quote Request Modal */}
      <QuoteModal
        key={quoteInitialData ? JSON.stringify(quoteInitialData) : (isQuoteOpen ? 'open' : 'closed')}
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          setQuoteInitialData(null);
        }}
        initialData={quoteInitialData}
        onSubmitSuccess={(msg) => setToastMessage(msg)}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={(proj) => handleOpenQuoteWithData(proj)}
      />

      {/* Announcement Top Bar */}
      <div className="announcement-bar">
        <div className="announcement-container">
          <div className="announcement-badge">NOTICE</div>
          <span className="announcement-text">
            🏆 Awarded "Best Sustainable Luxury Builder 2024" • Certified ISO 9001:2015 • Now onboarding Q3/Q4 construction projects in South India.
          </span>
          <a href="#estimator" className="announcement-link">
            Calculate Project Cost →
          </a>
        </div>
      </div>

      {/* Sticky Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuoteWithData(null)} />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section" id="home">
        <div className="hero-backdrop-glow"></div>
        <div className="hero-container">
          
          <div className="hero-badge-wrap">
            <span className="badge-pill">
              <span className="live-dot"></span>
              <span>PREMIUM ARCHITECTURE & TURNKEY CONSTRUCTION</span>
            </span>
          </div>

          <h1 className="hero-headline">
            BUILDING YOUR <br />
            <span className="gold-gradient-text">BOLD VISION.</span>
          </h1>

          <p className="hero-subtext">
            We engineer bespoke architectural homes, commercial headquarters, and high-impact structural transformations. Every square foot is executed with structural rigor, master craftsmanship, and transparent pricing.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="gold-btn btn-large">
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </a>

            <a href="#estimator" className="secondary-btn btn-large">
              <span>Instant Cost Calculator</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="hero-metrics-grid">
            <div className="metric-item">
              <span className="metric-number">15<span className="gold-text">+</span></span>
              <span className="metric-label">Years of Engineering Excellence</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">120<span className="gold-text">+</span></span>
              <span className="metric-label">Delivered Projects Across India</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">1.4M<span className="gold-text">+</span></span>
              <span className="metric-label">Sq.Ft Precision Built Space</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">10<span className="gold-text">Yr</span></span>
              <span className="metric-label">Comprehensive Structural Warranty</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PARTNERS / BRANDS BANNER ================= */}
      <div className="partners-ribbon">
        <div className="partners-container">
          <span className="partners-label">BUILT WITH CERTIFIED TIER-1 MATERIALS:</span>
          <div className="partners-tags">
            <span className="partner-tag">TATA TISCON 550D</span>
            <span className="partner-dot">•</span>
            <span className="partner-tag">ULTRATECH SUPER CEMENT</span>
            <span className="partner-dot">•</span>
            <span className="partner-tag">SAINT-GOBAIN GLASS</span>
            <span className="partner-dot">•</span>
            <span className="partner-tag">SCHNEIDER ELECTRIC</span>
            <span className="partner-dot">•</span>
            <span className="partner-tag">KOHLER & GROHE</span>
          </div>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section" id="about">
        <div className="about-container">
          
          <div className="about-visuals-col">
            <div className="about-img-main-wrap">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85" 
                alt="Architect reviewing construction blueprint" 
                className="about-main-img"
              />
              <div className="about-experience-card">
                <span className="exp-years">15+</span>
                <span className="exp-text">Years Building Exceptional Structures</span>
              </div>
            </div>
          </div>

          <div className="about-text-col">
            <div className="badge-pill">
              <Award size={14} className="gold-text" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="section-title">
              We Build More Than Structures. <br />
              <span className="gold-text">We Craft Legacies.</span>
            </h2>

            <p className="about-paragraph">
              At <strong>BuildCraft</strong>, we redefine the relationship between architectural daring and uncompromising civil engineering. Since 2010, our integrated team of architects, chartered structural engineers, and master craftsmen have delivered visionary projects with zero compromise on safety or quality.
            </p>

            {/* Core Values Pillars */}
            <div className="about-pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon">
                  <ShieldCheck size={22} className="gold-text" />
                </div>
                <div>
                  <h4>Zero-Compromise Safety</h4>
                  <p>Adherence to IS 456 & seismic compliance codes with independent lab testing for every cement & steel batch.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <Clock size={22} className="gold-text" />
                </div>
                <div>
                  <h4>Milestone-Guaranteed Timeline</h4>
                  <p>Weekly drone inspections, real-time client mobile dashboard, and penalty-backed handover schedules.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <Compass size={22} className="gold-text" />
                </div>
                <div>
                  <h4>Transparent Escrow Billing</h4>
                  <p>Fixed-rate Itemized Bill of Quantities (BoQ) with zero hidden escalations throughout the project lifecycle.</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <button 
                className="gold-btn"
                onClick={() => handleOpenQuoteWithData({ serviceType: 'Consultation & Site Review' })}
              >
                Schedule Site Evaluation
              </button>
              <a href="#services" className="link-arrow-btn">
                <span>Explore Full Capabilities</span>
                <ArrowRight size={16} />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="services-section" id="services">
        <div className="services-container">
          
          <div className="section-header-centered">
            <div className="badge-pill">
              <Layers size={14} className="gold-text" />
              <span>OUR EXPERTISE</span>
            </div>
            <h2 className="section-title">
              Architectural & Construction <span className="gold-text">Services</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive turnkey solutions from land survey and 3D architectural design to structural execution and interior fitouts.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((srv) => {
              const IconComp = iconMap[srv.iconName] || Building;
              return (
                <div key={srv.id} className="service-card">
                  <div className="service-card-top">
                    <span className="service-num">{srv.number}</span>
                    <div className="service-icon-box">
                      <IconComp size={24} className="gold-text" />
                    </div>
                  </div>

                  <h3 className="service-card-title">{srv.title}</h3>
                  <p className="service-card-tagline">{srv.tagline}</p>
                  <p className="service-card-desc">{srv.description}</p>

                  <ul className="service-bullets">
                    {srv.bullets.map((b, idx) => (
                      <li key={idx}>
                        <CheckCircle size={14} className="gold-text flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="service-inquire-btn"
                    onClick={() => handleOpenQuoteWithData({ serviceType: srv.title })}
                  >
                    <span>Request Proposal</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= REAL-TIME COST ESTIMATOR ================= */}
      <CostEstimator onBookEstimate={handleOpenQuoteWithData} />

      {/* ================= FEATURED PROJECTS SECTION ================= */}
      <section className="projects-section" id="projects">
        <div className="projects-container">
          
          <div className="projects-header-flex">
            <div>
              <div className="badge-pill">
                <Building2 size={14} className="gold-text" />
                <span>PORTFOLIO SHOWCASE</span>
              </div>
              <h2 className="section-title">
                Featured <span className="gold-text">Landmarks</span>
              </h2>
              <p className="section-subtitle">
                Explore a curation of residential villas, corporate complexes, and bespoke renovations built across South India.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="category-filter-tabs">
              {['All', 'Residential', 'Commercial', 'Renovation', 'Interior'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => setActiveProject(project)}
              >
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-category-tag">{project.category}</div>
                  <div className="project-hover-overlay">
                    <span className="view-details-btn">
                      View Blueprint & Specs <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>

                <div className="project-info-box">
                  <div className="project-meta-row">
                    <span className="project-loc">
                      <MapPin size={13} className="gold-text" /> {project.location}
                    </span>
                    <span className="project-area">
                      <Maximize2 size={13} className="gold-text" /> {project.area}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-short-desc">{project.description}</p>

                  <div className="project-footer-row">
                    <span className="project-duration">
                      <Calendar size={13} /> {project.duration}
                    </span>
                    <span className="project-learn-more">
                      Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BEFORE & AFTER SLIDER ================= */}
      <BeforeAfterSlider />

      {/* ================= PROCESS SECTION ================= */}
      <section className="process-section" id="process">
        <div className="process-container">
          
          <div className="section-header-centered">
            <div className="badge-pill">
              <Compass size={14} className="gold-text" />
              <span>THE BUILDCRAFT ADVANTAGE</span>
            </div>
            <h2 className="section-title">
              Our 4-Step <span className="gold-text">Execution Framework</span>
            </h2>
            <p className="section-subtitle">
              A transparent, engineering-driven process from the initial architectural sketch to the final white-glove handover.
            </p>
          </div>

          <div className="process-steps-grid">
            
            <div className="process-step-card">
              <div className="step-number-glow">01</div>
              <div className="step-time-badge">Weeks 1 - 2</div>
              <h3 className="step-title">Vision & Soil Feasibility</h3>
              <p className="step-desc">
                Detailed site survey, geotechnical soil test, zoning clearance, and architectural requirements workshops to understand your lifestyle and aesthetic aspirations.
              </p>
              <div className="step-deliverable">
                <CheckCircle size={14} className="gold-text" />
                <span>Soil Report & Space Matrix</span>
              </div>
            </div>

            <div className="process-step-card">
              <div className="step-number-glow">02</div>
              <div className="step-time-badge">Weeks 3 - 6</div>
              <h3 className="step-title">3D BIM & Approvals</h3>
              <p className="step-desc">
                Detailed 3D virtual walkthroughs, structural finite-element engineering calculations, CMDA/DTCP municipal approvals, and locked-in itemized BoQ.
              </p>
              <div className="step-deliverable">
                <CheckCircle size={14} className="gold-text" />
                <span>3D Walkthrough & Permit Clearance</span>
              </div>
            </div>

            <div className="process-step-card">
              <div className="step-number-glow">03</div>
              <div className="step-time-badge">Months 2 - 12</div>
              <h3 className="step-title">Precision Construction</h3>
              <p className="step-desc">
                Continuous on-site supervision by licensed structural engineers. Rigorous batch testing of concrete cube strength, MEP integration, and weekly video progress updates.
              </p>
              <div className="step-deliverable">
                <CheckCircle size={14} className="gold-text" />
                <span>Weekly Drone Scans & Quality Logs</span>
              </div>
            </div>

            <div className="process-step-card">
              <div className="step-number-glow">04</div>
              <div className="step-time-badge">Final Month</div>
              <h3 className="step-title">Handover & 10-Yr Warranty</h3>
              <p className="step-desc">
                420-point quality snagging audit, deep architectural cleaning, delivery of as-built blueprints, MEP operation manuals, and signed 10-Year Structural Guarantee.
              </p>
              <div className="step-deliverable">
                <CheckCircle size={14} className="gold-text" />
                <span>10-Yr Warranty Deed & Keys</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-container">
          
          <div className="section-header-centered">
            <div className="badge-pill">
              <Star size={14} className="gold-text" />
              <span>CLIENT EXPERIENCES</span>
            </div>
            <h2 className="section-title">
              What Our <span className="gold-text">Patrons Say</span>
            </h2>
            <p className="section-subtitle">
              Read authentic feedback from prominent homeowners, business owners, and developers who trusted us with their landmark projects.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="author-avatar" />
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                    <span className="author-loc">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="faq-section" id="faq">
        <div className="faq-container">
          
          <div className="section-header-centered">
            <div className="badge-pill">
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="section-title">
              Everything You Need to <span className="gold-text">Know</span>
            </h2>
            <p className="section-subtitle">
              Have questions regarding permits, timelines, warranties, or payment schedules? Here are clear, upfront answers.
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <button className="faq-question-btn" type="button">
                    <span>{faq.question}</span>
                    <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= CONTACT & CONSULTATION SECTION ================= */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          
          <div className="contact-grid">
            
            {/* Left Contact Information */}
            <div className="contact-info-col">
              <div className="badge-pill">
                <span>CONNECT WITH OUR ENGINEERS</span>
              </div>
              <h2 className="section-title">
                Let's Build Something <br />
                <span className="gold-text">Extraordinary.</span>
              </h2>
              <p className="contact-lead-text">
                Whether you have an empty plot ready for construction, an existing building needing expansion, or require an architectural consultation, our senior engineers are here to advise you.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-icon-circle">
                    <Phone size={20} className="gold-text" />
                  </div>
                  <div>
                    <span className="contact-label">Direct Client Helpline</span>
                    <a href="tel:+919876543210" className="contact-val">+91 98765 43210 / +91 98400 98765</a>
                    <span className="contact-sub">Available Mon - Sat, 9:00 AM - 7:30 PM</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon-circle">
                    <Mail size={20} className="gold-text" />
                  </div>
                  <div>
                    <span className="contact-label">Architectural Inquiries</span>
                    <a href="mailto:hello@buildcraft.com" className="contact-val">hello@buildcraft.com</a>
                    <span className="contact-sub">Average response time: 2 Business Hours</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon-circle">
                    <MapPin size={20} className="gold-text" />
                  </div>
                  <div>
                    <span className="contact-label">Headquarters Studio</span>
                    <p className="contact-val">BuildCraft Tower, 4th Floor, Anna Salai, Chennai, TN - 600002</p>
                    <span className="contact-sub">Regional studios in Bangalore & Hyderabad</span>
                  </div>
                </div>
              </div>

              {/* Working Hours box */}
              <div className="working-hours-card">
                <Clock size={18} className="gold-text" />
                <span>Site visit slots available this Saturday & Sunday. Prior appointment required.</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3 className="form-card-title">Schedule a Site Consultation</h3>
                <p className="form-card-subtitle">Fill out the quick form below and our lead engineer will get in touch with you.</p>

                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group-field">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karthik Sundaram"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-two-col">
                    <div className="form-group-field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="       "
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="karthik@domain.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-field">
                    <label>Service Category</label>
                    <select
                      value={contactForm.service}
                      onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    >
                      <option value="Residential Construction">Residential Custom Villa</option>
                      <option value="Commercial Development">Commercial Hub / Office</option>
                      <option value="Structural Renovation">Renovation & Heritage Retrofit</option>
                      <option value="Interior Architecture">Luxury Interior Fitouts</option>
                      <option value="Plot Consultation">Plot Survey & Feasibility Study</option>
                    </select>
                  </div>

                  <div className="form-group-field">
                    <label>Plot / Project Details</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your location, plot size, timeline, or key questions..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="gold-btn w-full btn-large"
                    disabled={contactSubmitting}
                  >
                    {contactSubmitting ? (
                      <span>Scheduling Consultation...</span>
                    ) : (
                      <>
                        <span>Confirm Consultation Request</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                  <p className="privacy-assurance">
                    🔒 We respect your privacy. No unwanted sales calls.
                  </p>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer-root">
        <div className="footer-main-container">
          
          <div className="footer-columns-grid">
            
            {/* Column 1: Brand */}
            <div className="footer-brand-col">
              <a href="#home" className="brand-logo footer-logo">
                <div className="logo-icon-badge">
                  <Compass size={22} className="logo-icon" />
                </div>
                <span className="logo-text">
                  BUILD<span className="gold-text">CRAFT</span>
                </span>
              </a>
              <p className="footer-bio">
                BuildCraft is an award-winning architecture and construction enterprise delivering turnkey residential, commercial, and interior landmarks across South India since 2010.
              </p>
              <div className="footer-badges-row">
                <span className="iso-badge">ISO 9001:2015</span>
                <span className="iso-badge">IGBC Certified</span>
                <span className="iso-badge">10-Yr Guarantee</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-nav-col">
              <h4 className="footer-heading">NAVIGATION</h4>
              <ul className="footer-links-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Our Studio</a></li>
                <li><a href="#services">Our Capabilities</a></li>
                <li><a href="#estimator">Cost Calculator</a></li>
                <li><a href="#projects">Project Portfolio</a></li>
                <li><a href="#process">Construction Process</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-nav-col">
              <h4 className="footer-heading">SERVICES</h4>
              <ul className="footer-links-list">
                <li><a href="#services">Residential Architecture</a></li>
                <li><a href="#services">Commercial Buildings</a></li>
                <li><a href="#services">Heritage Renovation</a></li>
                <li><a href="#services">Bespoke Interior Fitouts</a></li>
                <li><a href="#services">Structural Engineering</a></li>
                <li><a href="#estimator">Instant BoQ Estimates</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-newsletter-col">
              <h4 className="footer-heading">ARCHITECTURAL JOURNAL</h4>
              <p className="newsletter-desc">
                Subscribe for quarterly architectural insights, floor plan design breakdowns, and real estate construction trends.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <Send size={16} />
                </button>
              </form>
              <span className="newsletter-note">Zero spam. Unsubscribe anytime.</span>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              © 2026 BuildCraft Constructions & Infrastructure Pvt. Ltd. All rights reserved.
            </p>
            <div className="footer-bottom-right">
              <span className="portfolio-tag">Interactive Portfolio Demonstration</span>
              <a href="#home" className="back-to-top-btn">Back to top ↑</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}