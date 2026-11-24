import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuthLoginForm } from './useAuthLoginForm';
import { AuthLoginFields } from './AuthLoginFields';

interface AuthLoginFormCardProps {
  statusMessage?: string;
  serverErrors?: Record<string, string>;
  onSuccessLogin?: (email: string) => void;
  onNavigateHome?: () => void;
}

export const AuthLoginFormCard: React.FC<AuthLoginFormCardProps> = ({
  statusMessage,
  serverErrors,
  onSuccessLogin,
  onNavigateHome,
}) => {
  const form = useAuthLoginForm({
    serverErrors,
    onSuccessLogin,
  });

  const handleBackHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
      return;
    }
    window.location.href = '/';
  };

  return (
    <main className="flex-1 min-w-0 bg-doff-linen flex flex-col justify-between px-5 py-6 sm:px-10 sm:py-8 lg:px-12 xl:px-16">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-doff-muted hover:text-doff-navy transition-colors py-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website</span>
        </button>
      </div>

      <div className="w-full max-w-[400px] mx-auto my-auto py-8 sm:py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-doff-muted">
            SEVINE / AUTHENTICATION
          </p>
          <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-doff-navy">
            Masuk ke Backoffice
          </h1>
          <p className="text-sm text-doff-slate leading-relaxed">
            Gunakan akun staf aktif untuk mengakses panel manajemen internal.
          </p>
        </div>

        {statusMessage && (
          <div
            role="status"
            className="px-3.5 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-relaxed"
          >
            {statusMessage}
          </div>
        )}

        {form.summaryError && (
          <div
            role="alert"
            className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed"
          >
            {form.summaryError}
          </div>
        )}

        <AuthLoginFields
          email={form.email}
          password={form.password}
          remember={form.remember}
          showPassword={form.showPassword}
          showForgotHelp={form.showForgotHelp}
          processing={form.processing}
          emailError={form.emailError}
          passwordError={form.passwordError}
          onEmailChange={form.handleEmailChange}
          onPasswordChange={form.handlePasswordChange}
          onRememberChange={form.setRemember}
          onToggleShowPassword={form.toggleShowPassword}
          onToggleForgotHelp={form.toggleForgotHelp}
          onSubmit={form.handleSubmit}
        />
      </div>

      <footer className="pt-5 border-t border-doff-border/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-doff-muted">
        <span className="font-mono">Akses Role-Based (RBAC)</span>
        <span>Terbatas untuk staf resmi CV. Sevine Indonesia</span>
      </footer>
    </main>
  );
};
