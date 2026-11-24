import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'ghost'
  | 'import'
  | 'export';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeStyles = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-doff-navy text-white hover:bg-doff-navydark border border-doff-navydark shadow-sm transition-colors font-medium',
    secondary:
      'bg-white text-doff-navy hover:bg-doff-subtle border border-doff-border shadow-sm transition-colors font-medium',
    outline:
      'bg-transparent text-doff-slate hover:text-doff-navy hover:bg-doff-subtle border border-doff-border shadow-sm transition-colors font-medium',
    danger:
      'bg-white text-red-700 hover:bg-red-50 border border-red-200 shadow-sm transition-colors font-medium',
    import:
      'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shadow-sm transition-colors font-medium',
    export:
      'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 shadow-sm transition-colors font-medium',
    ghost:
      'bg-transparent text-doff-slate hover:text-doff-navy hover:bg-doff-subtle transition-colors',
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-md font-sans tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-doff-navy/20 disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
