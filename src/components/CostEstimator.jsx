import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Building, Clock, ShieldCheck } from 'lucide-react';

export default function CostEstimator({ onBookEstimate }) {
  const [area, setArea] = useState(3200);
  const [projectType, setProjectType] = useState('residential');
  const [tier, setTier] = useState('premium');
  const [floors, setFloors] = useState(2);

  // Rates per sq.ft based on type and tier
  const calculation = useMemo(() => {
    let baseRate = 2400; // residential silver

    if (projectType === 'residential') {
      if (tier === 'standard') baseRate = 2300;
      if (tier === 'premium') baseRate = 3250;
      if (tier === 'luxury') baseRate = 4600;
    } else if (projectType === 'commercial') {
      if (tier === 'standard') baseRate = 2600;
      if (tier === 'premium') baseRate = 3600;
      if (tier === 'luxury') baseRate = 5100;
    } else if (projectType === 'renovation') {
      if (tier === 'standard') baseRate = 1600;
      if (tier === 'premium') baseRate = 2400;
      if (tier === 'luxury') baseRate = 3500;
    } else if (projectType === 'interior') {
      if (tier === 'standard') baseRate = 1400;
      if (tier === 'premium') baseRate = 2200;
      if (tier === 'luxury') baseRate = 3400;
    }

    // Floor factor
    const floorMultiplier = floors > 2 ? 1 + (floors - 2) * 0.05 : 1;
    const totalCost = Math.round(area * baseRate * floorMultiplier);

    // Approximate breakdown
    const civilShare = Math.round(totalCost * 0.52);
    const mepShare = Math.round(totalCost * 0.28);
    const finishesShare = totalCost - civilShare - mepShare;

    // Timeline calculation
    let calculatedMonths;
    if (area < 2000) {
      calculatedMonths = 8;
    } else if (area < 4500) {
      calculatedMonths = 12;
    } else if (area < 8000) {
      calculatedMonths = 16;
    } else {
      calculatedMonths = 20;
    }

    if (projectType === 'interior') {
      calculatedMonths = Math.max(3, Math.round(calculatedMonths * 0.5));
    }
    if (projectType === 'renovation') {
      calculatedMonths = Math.max(4, Math.round(calculatedMonths * 0.65));
    }

    return {
      ratePerSqFt: Math.round(baseRate * floorMultiplier),
      totalCost,
      civilShare,
      mepShare,
      finishesShare,
      timelineMonths: calculatedMonths
    };
  }, [area, projectType, tier, floors]);

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  return (
    <section className="estimator-section" id="estimator">
      <div className="estimator-container">
        
        {/* Header */}
        <div className="section-header-centered">
          <div className="badge-pill">
            <Calculator size={14} className="gold-text" />
            <span>REAL-TIME BUDGET CALCULATOR</span>
          </div>
          <h2 className="section-title">
            Instant Construction <span className="gold-text">Cost Estimator</span>
          </h2>
          <p className="section-subtitle">
            Configure your project parameters to get an instant, transparent ballpark cost breakdown and projected timeline.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="estimator-card">
          {/* Controls Column */}
          <div className="estimator-controls">
            
            {/* Project Type */}
            <div className="form-group-custom">
              <label className="input-label">1. Select Project Type</label>
              <div className="type-selector-grid">
                {[
                  { id: 'residential', label: 'Residential Villa' },
                  { id: 'commercial', label: 'Commercial Hub' },
                  { id: 'renovation', label: 'Structural Renovation' },
                  { id: 'interior', label: 'Luxury Interior' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`type-btn ${projectType === item.id ? 'active' : ''}`}
                    onClick={() => setProjectType(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div className="form-group-custom">
              <div className="slider-header">
                <label className="input-label">2. Built-up Area (Sq.Ft)</label>
                <div className="area-badge">
                  <span>{area.toLocaleString()}</span> sq.ft
                </div>
              </div>
              <input
                type="range"
                min="800"
                max="12000"
                step="100"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-limits">
                <span>800 sq.ft</span>
                <span>5,000 sq.ft</span>
                <span>12,000+ sq.ft</span>
              </div>
            </div>

            {/* Quality Tier */}
            <div className="form-group-custom">
              <label className="input-label">3. Finishing & Material Specification</label>
              <div className="tier-selector-grid">
                {[
                  { id: 'standard', name: 'Essential Silver', desc: 'High quality branded materials & durable fittings' },
                  { id: 'premium', name: 'Premium Gold', desc: 'Imported tiles, premium woodwork, smart lighting' },
                  { id: 'luxury', name: 'Bespoke Platinum', desc: 'Italian marble, automation, bespoke German fixtures' }
                ].map((t) => (
                  <div
                    key={t.id}
                    className={`tier-card ${tier === t.id ? 'active' : ''}`}
                    onClick={() => setTier(t.id)}
                  >
                    <div className="tier-radio">
                      <span className="radio-dot"></span>
                    </div>
                    <div>
                      <div className="tier-name">{t.name}</div>
                      <div className="tier-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floors */}
            <div className="form-group-custom">
              <label className="input-label">4. Number of Levels / Floors</label>
              <div className="floors-btn-row">
                {[1, 2, 3, 4].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`floor-btn ${floors === f ? 'active' : ''}`}
                    onClick={() => setFloors(f)}
                  >
                    {f === 4 ? 'G + 3 Floors' : f === 1 ? 'Ground Only' : `G + ${f - 1} Floors`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="estimator-summary">
            <div className="summary-header">
              <span className="summary-tag">ESTIMATED PROJECTION</span>
              <div className="total-display">
                <span className="currency-symbol">EST.</span>
                <span className="total-amount">{formatCurrency(calculation.totalCost)}</span>
              </div>
              <p className="rate-hint">
                Approx. <strong>₹{calculation.ratePerSqFt.toLocaleString()}</strong> / sq.ft (inclusive of design & execution)
              </p>
            </div>

            {/* Cost Breakdown */}
            <div className="breakdown-list">
              <div className="breakdown-item">
                <div className="breakdown-meta">
                  <div className="color-indicator civil"></div>
                  <span>Civil, Foundation & Superstructure (52%)</span>
                </div>
                <strong>{formatCurrency(calculation.civilShare)}</strong>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-meta">
                  <div className="color-indicator mep"></div>
                  <span>MEP, Electrical, Plumbing & Glass (28%)</span>
                </div>
                <strong>{formatCurrency(calculation.mepShare)}</strong>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-meta">
                  <div className="color-indicator finishes"></div>
                  <span>Flooring, Joinery, Paints & Fixtures (20%)</span>
                </div>
                <strong>{formatCurrency(calculation.finishesShare)}</strong>
              </div>
            </div>

            {/* Timeline & Guarantee Highlights */}
            <div className="summary-features">
              <div className="feature-mini">
                <Clock size={16} className="gold-text" />
                <span>Estimated Time: <strong>{calculation.timelineMonths} - {calculation.timelineMonths + 2} Months</strong></span>
              </div>
              <div className="feature-mini">
                <ShieldCheck size={16} className="gold-text" />
                <span>Includes <strong>10-Year Structural Guarantee</strong></span>
              </div>
              <div className="feature-mini">
                <Building size={16} className="gold-text" />
                <span>Complimentary 3D Architectural Elevation</span>
              </div>
            </div>

            {/* Call to action */}
            <button
              className="gold-btn w-full btn-large"
              onClick={() => onBookEstimate({
                area: `${area.toLocaleString()} sq.ft`,
                projectType,
                tier,
                floors,
                estimatedTotal: formatCurrency(calculation.totalCost),
                timeline: `${calculation.timelineMonths} - ${calculation.timelineMonths + 2} Months`
              })}
            >
              <span>Lock in This Estimate & Book Site Visit</span>
              <ArrowRight size={18} />
            </button>
            <p className="disclaimer-text">
              *Preliminary estimate based on current market rates. Final contract quotation provided after detailed soil test & blueprint review.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
