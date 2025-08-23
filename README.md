# Memojo Chat

A modern, fast, and scalable web application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS Support** - Advanced CSS preprocessing with variables, mixins, and nesting
- **ESLint** - Code linting and formatting
- **Lucide React** - Beautiful icons
- **Modern UI Components** - Reusable Button and Card components
- **Dark Mode Support** - Automatic dark/light theme switching
- **Responsive Design** - Mobile-first approach

## 📦 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge
- **Linting**: ESLint

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd memojo-chat
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles (includes SCSS)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── components/        # Components showcase
│   └── scss-demo/         # SCSS demo page
├── components/            # Reusable components
│   └── ui/               # UI components
│       ├── button.tsx    # Button component
│       ├── card.tsx      # Card component
│       └── index.ts      # Component exports
├── lib/                  # Utility functions
│   └── utils.ts         # Common utilities
├── styles/               # SCSS styles
│   ├── variables.scss    # SCSS variables and design tokens
│   ├── components.scss   # SCSS component styles
│   └── main.scss        # Main SCSS file
└── types/               # TypeScript type definitions
```

## 🎨 Components

### Button Component
A flexible button component with multiple variants and sizes:
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon

### Card Component
A card component with header, content, and footer sections:
- CardHeader, CardTitle, CardDescription
- CardContent
- CardFooter

## 🎨 SCSS Features

### Variables & Design Tokens
- Color palette with HSL values
- Spacing scale
- Typography settings
- Breakpoints for responsive design
- Z-index management

### Mixins
- `@mixin dark-mode` - Dark mode media query
- `@mixin responsive($breakpoint)` - Responsive breakpoints
- `@mixin focus-ring` - Focus state styling
- `@mixin button-base` - Base button styles

### Component Classes
- `.scss-button` - SCSS-styled buttons with variants
- `.scss-card` - SCSS-styled cards with BEM methodology
- `.scss-alert` - Alert components with different types
- `.scss-grid` - Responsive grid system
- `.scss-spinner` - Loading spinner animation

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌙 Dark Mode

The application automatically detects and applies the user's preferred color scheme. The design system includes comprehensive CSS variables for both light and dark themes.

## 📱 Responsive Design

Built with a mobile-first approach using Tailwind CSS responsive utilities. The layout adapts seamlessly across all device sizes.

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Other Platforms
You can deploy to any platform that supports Node.js applications. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide React Icons](https://lucide.dev)
