import { Head, router } from '@inertiajs/react';
import { AuthLoginBrandPanel } from '../../auth/auth-login/AuthLoginBrandPanel';
import { AuthLoginFormCard } from '../../auth/auth-login/AuthLoginFormCard';

interface LoginInertiaPageProps {
  statusMessage?: string;
  errors?: Record<string, string>;
}

/**
 * Inertia Page Entry Point untuk `/login` (`AuthenticatedSessionController@create`).
 * Menggunakan layout Asymmetric Split-Screen (Opsi 1) berbasis identitas brand CV. Sevine Indonesia.
 */
export default function Login({ statusMessage, errors }: LoginInertiaPageProps) {
  return (
    <>
      <Head title="Masuk Backoffice" />
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-doff-linen text-doff-navy antialiased">
        <AuthLoginBrandPanel />
        <AuthLoginFormCard
          statusMessage={statusMessage}
          serverErrors={errors}
          onNavigateHome={() => router.visit('/')}
        />
      </div>
    </>
  );
}
