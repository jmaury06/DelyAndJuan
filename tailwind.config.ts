import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				romantic: {
					DEFAULT: 'hsl(var(--romantic))',
					foreground: 'hsl(var(--romantic-foreground))'
				},
				elegant: {
					DEFAULT: 'hsl(var(--elegant))',
					foreground: 'hsl(var(--elegant-foreground))'
				},
				spring: {
					50: '#F5FAF8',
					100: '#EBF4F0',
					200: '#D8E9E2',
					300: '#C4DED4',
					400: '#AED3C5',
					500: '#98C8B6',
					600: '#7DB39E',
					700: '#649080',
					800: '#4F7366',
					900: '#3E5B51'
				},
				coral: {
					50: '#FFF8F9',
					100: '#FFEFF0',
					200: '#FEE0E2',
					300: '#F5C7C7',
					400: '#FEB7BB',
					500: '#F5A3A7',
					600: '#E88B8F',
					700: '#D97176',
					800: '#B85D61',
					900: '#8F494C'
				},
				sage: {
					50: '#f6f7f6',
					100: '#e3e8e3',
					200: '#c7d2c7',
					300: '#9fb09f',
					400: '#7a8f7a',
					500: '#5d735d',
					600: '#4a5c4a',
					700: '#3d4b3d',
					800: '#343e34',
					900: '#2d352d'
				},
				lavender: {
					50: '#FAF7FB',
					100: '#F5EEFB',
					200: '#EAE0F5',
					300: '#E0D1EF',
					400: '#D5C2E9',
					500: '#C8B3E3',
					600: '#B299D5',
					700: '#987DC2',
					800: '#7C649D',
					900: '#63507D'
				},
				mauve: {
					50: '#FAF6FB',
					100: '#F3EAF7',
					200: '#E4D4EE',
					300: '#CDB5DD',
					400: '#A98BBE',
					500: '#8F70A6',
					600: '#7A5C92',
					700: '#634A77',
					800: '#4D3A5C',
					900: '#3A2C46'
				},
				cream: '#FBF8F3',
				peach: {
					50: '#FEF9F5',
					100: '#FDF3EB',
					200: '#FCE7D7',
					300: '#FAD7B9',
					400: '#F8C99B',
					500: '#F5BA7D',
					600: '#E5A566',
					700: '#CF8D4F',
					800: '#A87140',
					900: '#865A33'
				},
				sunshine: {
					50: '#FEFDFB',
					100: '#FDF9F3',
					200: '#FBF3E7',
					300: '#F5E9C7',
					400: '#F0DFA7',
					500: '#EBD587',
					600: '#DEC36F',
					700: '#C9AC5A',
					800: '#A38B48',
					900: '#826F39'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				elegant: ['Playfair Display', 'serif'],
				script: ['Dancing Script', 'cursive'],
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
