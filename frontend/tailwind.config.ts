import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			electric: {
  				'50': '#e6f7ff',
  				'100': '#bae7ff',
  				'200': '#91d5ff',
  				'300': '#69c0ff',
  				'400': '#40a9ff',
  				'500': '#1890ff',
  				'600': '#096dd9',
  				'700': '#0050b3',
  				'800': '#003a8c',
  				'900': '#002766'
  			},
  			neon: {
  				purple: '#a855f7',
  				pink: '#ec4899',
  				cyan: '#06b6d4',
  				blue: '#3b82f6'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
  			'glass-shine': 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)',
  			'electric-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  			'neon-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  			'cyber-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  			'glass-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.5)',
  			neon: '0 0 20px rgba(168, 85, 247, 0.4)',
  			'neon-lg': '0 0 40px rgba(168, 85, 247, 0.6)',
  			electric: '0 0 30px rgba(24, 144, 255, 0.5)',
  			glow: '0 0 15px rgba(255, 255, 255, 0.3)',
  			'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			glow: 'glow 2s ease-in-out infinite alternate',
  			shimmer: 'shimmer 2.5s linear infinite',
  			tilt: 'tilt 10s infinite linear'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
  				},
  				'100%': {
  					boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			tilt: {
  				'0%, 50%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'25%': {
  					transform: 'rotate(0.5deg)'
  				},
  				'75%': {
  					transform: 'rotate(-0.5deg)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
