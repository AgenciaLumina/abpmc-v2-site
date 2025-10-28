import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0B2E47',
          dark: '#082135',
          light: '#163B56',
        },
        secondary: {
          DEFAULT: '#22949e',
          dark: '#1d7a82',
          light: '#01C2CE',
        },
      },
      fontSize: {
        // Títulos
        'h1-mobile': ['2.25rem', { lineHeight: '1.25', fontWeight: '700' }], // 36px
        'h1-desktop': ['3rem', { lineHeight: '1.25', fontWeight: '700' }], // 48px
        'h2-mobile': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }], // 30px
        'h2-desktop': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }], // 36px
        'h3-mobile': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }], // 24px
        'h3-desktop': ['1.875rem', { lineHeight: '1.35', fontWeight: '600' }], // 30px
        'h4-mobile': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'h4-desktop': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        
        // Corpo
        'body-lg': ['1.125rem', { lineHeight: '1.625', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.625', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
