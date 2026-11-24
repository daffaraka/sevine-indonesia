import React from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthLoginFieldsProps {
  email: string;
  password: string;
  remember: boolean;
  showPassword: boolean;
  showForgotHelp: boolean;
  processing: boolean;
  emailError: string;
  passwordError: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (checked: boolean) => void;
  onToggleShowPassword: () => void;
  onToggleForgotHelp: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const getInputBorderClass = (hasError: boolean): string =>
  hasError
    ? 'border-red-300 focus:border-red-500'
    : 'border-doff-border focus:border-doff-navy';

export const AuthLoginFields: React.FC<AuthLoginFieldsProps> = ({
  email,
  password,
  remember,
  showPassword,
  showForgotHelp,
  processing,
  emailError,
  passwordError,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onToggleShowPassword,
  onToggleForgotHelp,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="block text-xs font-semibold text-doff-navy">
          Email Staf
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="nama@sevine.co.id"
          aria-invalid={Boolean(emailError)}
          className={`w-full h-11 px-3.5 bg-white text-sm text-doff-navy placeholder:text-slate-400 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-doff-navy/15 ${getInputBorderClass(Boolean(emailError))}`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="login-password" className="block text-xs font-semibold text-doff-navy">
            Kata Sandi
          </label>
          <button
            type="button"
            onClick={onToggleForgotHelp}
            className="text-xs font-medium text-doff-muted hover:text-doff-navy transition-colors cursor-pointer"
          >
            Lupa kata sandi?
          </button>
        </div>

        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Masukkan kata sandi Anda"
            aria-invalid={Boolean(passwordError)}
            className={`w-full h-11 pl-3.5 pr-11 bg-white text-sm text-doff-navy placeholder:text-slate-400 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-doff-navy/15 ${getInputBorderClass(Boolean(passwordError))}`}
            required
          />
          <button
            type="button"
            onClick={onToggleShowPassword}
            className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-doff-muted hover:text-doff-navy transition-colors cursor-pointer"
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {showForgotHelp && (
        <div className="px-3.5 py-2.5 rounded-lg bg-doff-subtle border border-doff-border text-xs text-doff-slate leading-relaxed">
          Pemulihan kata sandi dikelola terpusat. Hubungi Administrator Utama atau tim Digital Marketing CV. Sevine Indonesia untuk pengaturan ulang akses.
        </div>
      )}

      <label className="flex items-center gap-2.5 pt-0.5 cursor-pointer select-none text-xs text-doff-slate">
        <input
          type="checkbox"
          checked={remember}
          onChange={(event) => onRememberChange(event.target.checked)}
          className="w-4 h-4 rounded border-doff-border text-doff-navy focus:ring-doff-navy/20 cursor-pointer"
        />
        <span>Ingat sesi saya di perangkat ini</span>
      </label>

      <button
        type="submit"
        disabled={processing}
        className="w-full h-11 px-4 rounded-lg bg-doff-navy hover:bg-doff-navydark disabled:opacity-60 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{processing ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
      </button>
    </form>
  );
};
