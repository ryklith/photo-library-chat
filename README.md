# Photo Library Chat

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
cd photo-library-chat
```

2. Install dependencies:
```bash
npm install
```

3. **Environment Setup** (see section below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Environment Configuration

### Quick Setup

**Option 1: Automated Setup (Recommended)**
```bash
npm run setup-env
```

**Option 2: Manual Setup**
1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Edit `.env.local` and fill in your configuration values.

### Environment Files

The application uses the following environment files (in order of priority):

- `.env.local` - Local development (not committed to git)
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env` - Default fallback

**Note**: All `.env*` files are excluded from source control for security.

### Required Environment Variables

These variables are required for the application to function:

```bash
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Photo Library Chat
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Optional Environment Variables

The following variables are optional and have sensible defaults:

#### API Configuration
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

#### Database Configuration
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/photo_library_chat
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=photo_library_chat
DATABASE_USER=username
DATABASE_PASSWORD=password
```

#### Authentication & Security
```bash
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
SESSION_SECRET=your_session_secret_here
SESSION_MAX_AGE=2592000
```

#### File Storage
```bash
STORAGE_PROVIDER=local
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

#### Feature Flags
```bash
ENABLE_CHAT_HISTORY=true
ENABLE_FILE_UPLOAD=true
ENABLE_USER_AUTHENTICATION=false
ENABLE_ANALYTICS=false
```

#### Chat Configuration
```bash
CHAT_MAX_MESSAGE_LENGTH=1000
CHAT_HISTORY_LIMIT=100
CHAT_AUTO_SCROLL=true
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
UPLOAD_DIRECTORY=uploads
```

### Using Environment Variables in Code

The application provides a type-safe environment configuration utility:

```typescript
import { env } from '@/lib/env';

// Access environment variables
const apiUrl = env.getApiUrl();
const isDevelopment = env.isDevelopment;
const maxMessageLength = env.CHAT_MAX_MESSAGE_LENGTH;

// Get configuration objects
const dbConfig = env.getDatabaseConfig();
const storageConfig = env.getStorageConfig();
```

### Environment Validation

The application automatically validates required environment variables in development mode. If any required variables are missing, you'll see helpful error messages in the console.

### Security Best Practices

1. **Never commit `.env.local` or any `.env*` files** to version control
2. **Use strong, unique secrets** for production environments
3. **Rotate secrets regularly** in production
4. **Use different values** for development, staging, and production
5. **Limit access** to production environment variables

### Production Deployment

For production deployments:

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Use strong, randomly generated secrets
3. Enable only the features you need
4. Configure proper CORS and security headers
5. Set up monitoring and error tracking

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
│   ├── utils.ts         # Common utilities
│   └── env.ts           # Environment configuration
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
