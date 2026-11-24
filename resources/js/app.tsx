import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';

const appName = 'CV. Sevine Indonesia';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  defaults: {
    future: {
      // Wajib untuk membaca <script data-page="app"> dari inertiajs/inertia-laravel v3.x
      useScriptElementForInitialPage: true,
    },
  },
  resolve: (name) => {
    const pages = import.meta.glob<{ default: React.ComponentType }>(
      './Pages/**/*.tsx',
      { eager: true },
    );
    const page = pages[`./Pages/${name}.tsx`];
    if (!page) {
      throw new Error(`Inertia page tidak ditemukan: ./Pages/${name}.tsx`);
    }
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: '#1B2E4B',
  },
});
