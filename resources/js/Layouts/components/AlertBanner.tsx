import React from 'react';

interface AlertBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  onClose?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  const styles: Record<string, string> = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  };

  return (
    <div
      className={`px-4 py-2.5 rounded-md border text-xs font-sans flex items-center justify-between shadow-sm ${styles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 font-bold ml-3 cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
};
