/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            // changed default breakpoints for container
            screens: {
                sm: "600px",
                md: "728px",
                lg: "984px",
                xl: "1040px",
                "2xl": "1196px",
            },
            center: "true",
            padding: "1rem"
        },
        extend: {},
    },
    plugins: [],
};
