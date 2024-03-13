/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "3xl": "1900px"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xxl: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { scale: 0, opacity: 0 },
          to: { scale: 1, opacity: 1 },
        },
        "glitch" : {
          '2%, 64%': {
            transform: "translate(2px, 0) skew(0deg)",
          },
          '4%, 60%': {
            transform: "translate(-2px, 0) skew(0deg)",
          },
          '62%': {
            transform: "translate(0, 0) skew(5deg)",
          },
        },
        "glitch-top" : {
          '2%, 64%': {
            transform: "translate(2px, -2px)",
          },
          '4%, 60%': {
            transform: "translate(-2px, 2px)",
          },
          '62%': {
            transform: "translate(13px, -1px) skew(-13deg)",
          },
        },
        "glitch-bottom" : {
          '2%, 64%': {
            transform: "translate(-2px, 0)",
          },
          '4%, 60%': {
            transform: "translate(-2px, 0)",
          },
          '62%': {
            transform: "translate(-22px, 5px) skew(21deg)",
          },
        },
        "rocket-movement": {
          "0%": {
            transform: "translateX(-100%) translateY(0)",
          },
          '100%': {
            transform: "translateX(90vw) translateY(-90vh)",
          }
        },
        "astronaut-movement": {
          "100%": {
            transform: "translate(-15vw, -15vh)",
          }
        },
        "astronaut-rotate": {
          "100%": {
            transform: "rotate(-720deg)",
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s forwards",
        "glitch": "glitch 1s linear infinite",
        "glitch-top": "glitch-top 1s linear infinite",
        "glitch-bottom": "glitch-bottom 1.5s linear infinite",
        "rocket-movement": "rocket-movement 50s infinite linear both running",
        "astronaut-movement": "astronaut-movement 50s infinite linear both alternate",
        "astronaut-rotate": "astronaut-rotate 100s infinite linear both alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}