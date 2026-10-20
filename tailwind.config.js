/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doff: {
          navy: '#1B2E4B',
          navydark: '#132238',
          linen: '#F8F9FA',
          subtle: '#EEF1F5',
          slate: '#475569',
          muted: '#64748B',
          terracotta: '#C27B66',
          gold: '#C5A880',
          border: '#E2E8F0',
        },
        editorial: {
          canvas: '#F6F4F0',
          paper: '#ECE9E2',
          taupe: '#DFDBD2',
          charcoal: '#171715',
          ink: '#2B2A27',
          muted: '#6E6B64',
          terracotta: '#9E4738',
          wine: '#4A1E22',
          sage: '#536251',
          slate: '#5C748A',
          ochre: '#B68642',
          hairline: '#D8D3C8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'doff-sm': '0 1px 3px rgba(27, 46, 75, 0.05)',
        'doff-md': '0 4px 12px rgba(27, 46, 75, 0.08)',
        'doff-lg': '0 8px 24px rgba(27, 46, 75, 0.10)',
      }
    },
  },
  plugins: [],
}
