/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateAreas: {
        'layout': [
          'header header',
          'nav    main'
        ],
        'layout-no-nav': [
          'header',
          'main'
        ]
      },
      gridTemplateColumns: {
        'layout': '25% 75%',
        'layout-no-nav': '100%'
      },
      gridTemplateRows: {
        'layout': '10% 90% auto',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
