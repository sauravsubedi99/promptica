/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-light': '#DBEAFE',
        secondary: '#10B981',
        neutral: '#F9FAFB',
        surface: '#FFFFFF',
        'primary-content': '#1F2937',
        'secondary-content': '#6B7280',
        warning: '#F59E0B',
        error: '#EF4444',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
};
