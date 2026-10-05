import { useState } from 'react';
import { X, Send, Sparkles, ShieldCheck } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialData, onSubmitSuccess }) {
  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    serviceType: initialData?.serviceType || initialData?.category || 'Residential Construction',
    area: initialData?.area ? `${initialData.area}` : '',
    budget: initialData?.estimatedTotal || initialData?.budget || '',
    timeline: initialData?.timeline || 'Within 3 Months',
    message: initialData?.title 
      ? `Inquiring about project specifications similar to "${initialData.title}".` 
      : ''
  }));

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setLoading(true);
    // Simulate real-time API dispatch
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(`Thank you ${formData.name}! Your customized quotation proposal and blueprint schedule have been registered. Our senior structural director will contact you within 2 hours.`);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quote-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge-pill">
              <Sparkles size={13} className="gold-text" />
              <span>OFFICIAL CONSULTATION</span>
            </span>
            <h3 className="modal-project-title">Request Bespoke Quotation</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="quote-form">
          <div className="form-two-col">
            <div className="form-group-field">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Reddy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group-field">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98400 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-two-col">
            <div className="form-group-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. vikram@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group-field">
              <label>Project Type</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              >
                <option value="Residential Construction">Residential Custom Villa</option>
                <option value="Commercial Development">Commercial Office / Hub</option>
                <option value="Structural Renovation">Renovation & Heritage Retrofit</option>
                <option value="Interior Architecture">Luxury Interior & Fitouts</option>
              </select>
            </div>
          </div>

          <div className="form-two-col">
            <div className="form-group-field">
              <label>Estimated Area / Plot Size</label>
              <input
                type="text"
                placeholder="e.g. 3,500 sq.ft or 2 Grounds"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>

            <div className="form-group-field">
              <label>Expected Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              >
                <option value="Immediately (Within 30 Days)">Immediately (Within 30 Days)</option>
                <option value="Within 3 Months">Within 3 Months</option>
                <option value="Planning for next 6 Months">Planning for next 6 Months</option>
                <option value="Soil testing & Approval stage">Soil testing & Approval stage</option>
              </select>
            </div>
          </div>

          <div className="form-group-field">
            <label>Project Site Location & Details</label>
            <textarea
              rows={3}
              placeholder="Tell us about your plot location, architectural inspirations, or specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <div className="quote-guarantee-note">
            <ShieldCheck size={18} className="gold-text flex-shrink-0" />
            <span>Strict privacy: No spam. 100% confidential architectural assessment by certified civil engineers.</span>
          </div>

          <button type="submit" className="gold-btn w-full btn-large" disabled={loading}>
            {loading ? (
              <span>Preparing Proposal...</span>
            ) : (
              <>
                <span>Submit & Receive Detailed BoQ Breakdown</span>
                <Send size={18} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
