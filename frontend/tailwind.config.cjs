const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /col-span-.+/
    },
    {
      pattern: /bg-card-(one|two)/,
      variants: ['hover']
    }
  ],
  theme: {
    borderWidth: {
      1: '1px',
      2: '2px'
    },
    extend: {
      scale: {
        115: '1.15'
      },
      gridTemplateColumns: {
        'calendar-filters': 'minmax(150px, 15%) auto',
        'calendar-columns': 'minmax(120px, 15%) repeat(auto-fit, minmax(40px, 1fr))',
        'my-page': 'max-content auto',
        'my-page-2': 'max-content calc(50vw - 24px)',
        'my-page-3': 'max-content 50px',
        'my-page-4': 'max-content 624px',
        'my-page-5': 'max-content 620px',
        sections: 'repeat(2, 1fr) repeat(2, min-content)',
        teams: '1fr repeat(2, min-content)',
        'absence-types': 'repeat(4, 1fr) repeat(2, min-content)',
        'absence-types-small': 'repeat(2, 1fr) repeat(2, min-content)',
        'users': 'repeat(4, 1fr) repeat(2, min-content)',
        'users-small': 'repeat(2, min-content) repeat(1, 1fr) repeat(1, min-content)'
      },
      screens: {
        mobile: '400px',
        tablet: '481px'
      },
      height: {
        '1/5-screen': '20vh',
        '1/4-screen': '25vh',
        '3/5-screen': '60vh'
      }
    },
    colors: {
      // Primary
      'primary-dark': '#26023B',
      primary: '#410464',
      'primary-light': '#590689',
      'primary-lighter': '#F6F0F9',
      'primary-contrast': '#FAFAFA',

      // Seondary
      'secondary-dark': '#065149',
      secondary: '#065149',
      'secondary-light': '#09756B',
      'secondary-contrast': '#FAFAFA',

      // Error
      'error-dark': '#940000',
      error: '#BD0000',
      'error-light': '#E50000',
      'error-contrast': '#FAFAFA',

      // Warning
      'warning-dark': '#FFF79E',
      warning: '#FFFAC5',
      'warning-light': '#FFFEF0',
      'warning-contrast': '#383838',

      // Info
      'info-dark': '#8AE0FF',
      info: '#B3EBFF',
      'info-light': '#D9F5FF',
      'info-contrast': '#383838',

      // Card One
      'card-one-dark': '#D8BCE6',
      'card-one': '#E5D3EE',
      'card-one-light': '#F6F0F9',
      'card-one-contrast': '#410464',

      // Card Two
      'card-two-dark': '#B2E1DA',
      'card-two': '#CAEAE6',
      'card-two-light': '#E5F5F3',
      'card-two-contrast': '#410464',

      // Card Three
      'card-three-dark': '#DDB8BA',
      'card-three': '#FFD6D8',
      'card-three-light': '#FEF6F7',
      'card-three-contrast': '#410464',

      // Greyscale
      'grey-darkest': '#383838',
      'grey-darker': '#6D6C69',
      'grey-dark': '#B4B2A7',
      grey: '#D4D3CD',
      'grey-light': '#EEEEE9',
      'grey-lighter': '#F4F4F4',
      'grey-lightest': '#FAFAFA',
      white: '#FFFFFF',
      'disabled-blue': '#F2F2F2'
    },
    fontSize: {
      '2xs': '0.6875rem', // 11px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: [
        '1rem',
        {
          // 16px
          lineHeight: 1.625,
          letterSpacing: '0.00938em'
        }
      ],
      md: '1.125rem', // 18px
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      '2xl': '2rem', // 32px
      '3xl': '3rem' //
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      header: ['Rubik', ...defaultTheme.fontFamily.sans]
    }
  },
  colors: {
    // Primary
    'primary-dark': '#26023B',
    primary: '#410464',
    'primary-light': '#590689',
    'primary-lighter': '#F6F0F9',
    'primary-contrast': '#FAFAFA',

    // Seondary
    'secondary-dark': '#065149',
    secondary: '#065149',
    'secondary-light': '#09756B',
    'secondary-contrast': '#FAFAFA',

    // Error
    'error-dark': '#940000',
    error: '#BD0000',
    'error-light': '#E50000',
    'error-contrast': '#FAFAFA',

    // Warning
    'warning-dark': '#FFF79E',
    warning: '#FFFAC5',
    'warning-light': '#FFFEF0',
    'warning-contrast': '#383838',

    // Info
    'info-dark': '#8AE0FF',
    info: '#B3EBFF',
    'info-light': '#D9F5FF',
    'info-contrast': '#383838',

    // Card One
    'card-one-dark': '#D8BCE6',
    'card-one': '#E5D3EE',
    'card-one-light': '#F6F0F9',
    'card-one-contrast': '#410464',

    // Card Two
    'card-two-dark': '#B2E1DA',
    'card-two': '#CAEAE6',
    'card-two-light': '#E5F5F3',
    'card-two-contrast': '#410464',

    // Card Three
    'card-three-dark': '#DDB8BA',
    'card-three': '#FFD6D8',
    'card-three-light': '#FEF6F7',
    'card-three-contrast': '#410464',

    // Greyscale
    'grey-darkest': '#383838',
    'grey-darker': '#6D6C69',
    'grey-dark': '#B4B2A7',
    grey: '#D4D3CD',
    'grey-light': '#EEEEE9',
    'grey-lighter': '#F4F4F4',
    'grey-lightest': '#FAFAFA',
    white: '#FFFFFF',
    'disabled-blue': '#F2F2F2'
  },
  fontSize: {
    '2xs': '0.6875rem', // 11px
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: [
      '1rem',
      {
        // 16px
        lineHeight: 1.625,
        letterSpacing: '0.00938em'
      }
    ],
    md: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    '2xl': '2rem' // 32px
  },
  fontFamily: {
    sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    header: ['Rubik', ...defaultTheme.fontFamily.sans]
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
};
