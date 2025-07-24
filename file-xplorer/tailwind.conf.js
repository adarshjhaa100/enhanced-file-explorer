/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
        colors: {
            primary: '#FF6347', // Custom primary color
            secondary: '#4682B4', // Custom secondary color
        },
    
        fontFamily: {
            sans: ['Inter', 'sans-serif'], // Custom font stack
        },
        // Add other custom theme properties like spacing, breakpoints, etc.
    },
    },
    plugins: [],
};