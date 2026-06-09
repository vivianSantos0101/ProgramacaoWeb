import { useEffect, useState } from 'react';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
  exiting?: boolean;
}

let toastId = 0;
const listeners: Set<(t: ToastMessage) => void> = new Set();

export function showToast(text: string, type: 'success' | 'error' = 'success') {
  const msg: ToastMessage = { id: ++toastId, text, type };
  listeners.forEach((fn) => fn(msg));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      // Start exit animation after 2.5s
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === msg.id ? { ...t, exiting: true } : t))
        );
        // Remove after exit animation
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== msg.id));
        }, 300);
      }, 2500);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type} ${t.exiting ? 'toast-exit' : ''}`}>
          <span className="toast-icon">
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}
