import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed-toast">
      <div className="toast-content">
        <CheckCircle2 className="toast-icon" size={22} />
        <div>
          <h4 className="toast-title">Request Received Successfully!</h4>
          <p className="toast-desc">{message}</p>
        </div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={18} />
      </button>
    </div>
  );
}
