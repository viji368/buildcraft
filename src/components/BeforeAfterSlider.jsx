import { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="before-after-section">
      <div className="before-after-container">
        
        <div className="section-header-centered">
          <div className="badge-pill">
            <SlidersHorizontal size={14} className="gold-text" />
            <span>REAL TRANSFORMATION SHOWCASE</span>
          </div>
          <h2 className="section-title">
            From Blueprint to <span className="gold-text">Breathtaking Reality</span>
          </h2>
          <p className="section-subtitle">
            Drag the interactive slider to view the structural evolution of the Emerald Bay Villa project.
          </p>
        </div>

        <div 
          className="slider-wrapper"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER IMAGE (Background) */}
          <div className="image-after">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85" 
              alt="Completed Luxury Villa by BuildCraft" 
            />
            <div className="image-badge after-badge">
              <Sparkles size={14} className="gold-text" />
              <span>COMPLETED ARCHITECTURE</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped on top) */}
          <div 
            className="image-before" 
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85" 
              alt="Initial Structural Construction by BuildCraft" 
            />
            <div className="image-badge before-badge">
              <span>RAW STRUCTURAL PHASE</span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div 
            className="slider-divider" 
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-handle">
              <span className="handle-arrow">◀</span>
              <span className="handle-arrow">▶</span>
            </div>
          </div>
        </div>

        {/* Transformation Highlights */}
        <div className="transformation-highlights">
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="gold-text" />
            <span>Cast-in-situ Cantilevered RCC Framework</span>
          </div>
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="gold-text" />
            <span>Thermal Double-Glazed Curtain Walls</span>
          </div>
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="gold-text" />
            <span>Delivered 2 Weeks Ahead of Milestone Schedule</span>
          </div>
        </div>

      </div>
    </section>
  );
}
