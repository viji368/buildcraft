import { useState } from 'react';
import { X, MapPin, Calendar, Maximize2, IndianRupee, Check, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onInquire }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Bar */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="project-category-badge">{project.category}</span>
            <h3 className="modal-project-title">{project.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Gallery View */}
          <div className="modal-gallery-pane">
            <div className="main-display-img-wrap">
              <img 
                src={images[activeImageIndex] || project.image} 
                alt={`${project.title} view ${activeImageIndex + 1}`} 
                className="main-display-img"
              />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-strip">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="Thumbnail preview" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs & Description Pane */}
          <div className="modal-info-pane">
            
            {/* Meta Grid */}
            <div className="specs-grid">
              <div className="spec-card">
                <MapPin size={16} className="gold-text" />
                <div>
                  <span className="spec-label">Location</span>
                  <span className="spec-val">{project.location}</span>
                </div>
              </div>

              <div className="spec-card">
                <Maximize2 size={16} className="gold-text" />
                <div>
                  <span className="spec-label">Built-up Area</span>
                  <span className="spec-val">{project.area}</span>
                </div>
              </div>

              <div className="spec-card">
                <Calendar size={16} className="gold-text" />
                <div>
                  <span className="spec-label">Timeline / Year</span>
                  <span className="spec-val">{project.duration} ({project.year})</span>
                </div>
              </div>

              <div className="spec-card">
                <IndianRupee size={16} className="gold-text" />
                <div>
                  <span className="spec-label">Project Value</span>
                  <span className="spec-val">{project.budget}</span>
                </div>
              </div>
            </div>

            {/* Architectural Narrative */}
            <div className="modal-narrative">
              <h4>Architectural Narrative</h4>
              <p>{project.description}</p>
            </div>

            {/* Key Features */}
            {project.features && (
              <div className="modal-features">
                <h4>Signature Innovations</h4>
                <div className="features-tags">
                  {project.features.map((feat, i) => (
                    <div key={i} className="feature-chip">
                      <Check size={14} className="gold-text" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="modal-footer-cta">
              <button 
                className="gold-btn w-full"
                onClick={() => {
                  onClose();
                  onInquire(project);
                }}
              >
                <span>Inquire About a Similar Build</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
