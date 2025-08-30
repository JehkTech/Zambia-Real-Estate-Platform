# PropertyZM Technology Stack Documentation

## Core Framework & Runtime
- **React 18+** - Modern React with hooks and functional components
- **TypeScript 5.x** - Static typing for JavaScript
- **Vite 4.x** - Fast build tool and development server
- **Node.js 18+** - JavaScript runtime environment

## Styling & Design System
- **Tailwind CSS 4.0** - Utility-first CSS framework with modern features
- **CSS Custom Properties** - For theme variables and design tokens
- **Responsive Design** - Mobile-first approach with breakpoints
- **Brand Colors**: 
  - Primary: #52a447 (Green)
  - Secondary: #007786 (Teal) 
  - Background: #ffffff (White)

## UI Component Library
- **Radix UI Primitives** - Unstyled, accessible UI components
- **shadcn/ui** - Pre-built components using Radix UI + Tailwind
  - All components located in `/components/ui/`
  - Includes: Button, Card, Input, Select, Dialog, etc.

## Icon Library
- **Lucide React** - Beautiful & consistent icon library
  - Usage: `import { IconName } from 'lucide-react'`
  - 1000+ SVG icons with consistent styling

## State Management
- **React useState Hook** - Local component state
- **Props Drilling** - State passed via component props
- **Custom Hooks** - Reusable stateful logic (when needed)

## Routing & Navigation
- **Custom Client-Side Routing** - Single-page application
- **State-based Navigation** - Using React state for page switching
- **Page Types**: home | buy | rent | sell | commercial | post-property | account

## Form Handling
- **React Hook Form 7.55.0** - Performant form library
  - Installation: `npm install react-hook-form@7.55.0`
  - Usage: `import { useForm } from 'react-hook-form@7.55.0'`
- **Built-in Validation** - Form validation with error handling
- **Controlled Components** - React controlled form inputs

## Data & API Management
- **Mock Data** - Static data for development/demo
- **Fetch API** - Native browser API for HTTP requests
- **Future: Supabase Integration** - For backend services
  - User authentication
  - Database operations
  - File storage for property images

## Image Handling
- **ImageWithFallback Component** - Custom image component with error handling
- **Placeholder API** - Development placeholder images
- **Future: Cloudinary/S3** - Production image storage and optimization

## Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot reload development

## Component Architecture
```
├── App.tsx (Main application shell)
├── components/
│   ├── ui/ (Reusable UI components)
│   ├── Layout components (Header, Footer)
│   ├── Feature components (HeroSection, PropertyCard)
│   └── figma/ (Custom utility components)
├── pages/ (Page-level components)
├── constants/ (Static data and configuration)
└── styles/ (Global CSS and theme)
```

## Key Dependencies & Versions

### Required Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "lucide-react": "^0.400.0",
  "react-hook-form": "7.55.0",
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-alert-dialog": "^1.0.5",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-hover-card": "^1.0.7",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-progress": "^1.0.3",
  "@radix-ui/react-radio-group": "^1.1.3",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-slider": "^1.1.2",
  "@radix-ui/react-switch": "^1.0.3",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-tooltip": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.0.0",
  "vite": "^4.4.0",
  "tailwindcss": "^4.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "eslint": "^8.45.0",
  "prettier": "^3.0.0"
}
```

## Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features Used**: CSS Grid, Flexbox, Custom Properties, ES6+

## Performance Considerations
- **Code Splitting**: Dynamic imports for pages (future enhancement)
- **Image Optimization**: WebP format support, lazy loading
- **Bundle Size**: Tree-shaking unused code
- **CSS**: Utility-first approach reduces CSS bundle size

## Accessibility Features
- **WCAG 2.1 AA Compliance** - Via Radix UI primitives
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels and roles
- **Focus Management** - Visible focus indicators
- **Color Contrast** - Meets accessibility standards

## Security Considerations
- **Input Sanitization** - XSS prevention
- **Form Validation** - Client and server-side validation
- **Authentication** - JWT tokens (with Supabase)
- **HTTPS Only** - Secure data transmission

## Deployment & Build
- **Build Command**: `npm run build`
- **Preview Command**: `npm run preview`
- **Development**: `npm run dev`
- **Type Checking**: `npm run type-check`

## Future Enhancements
- **PWA Support** - Service workers, offline functionality
- **Internationalization** - Multi-language support
- **Analytics** - User behavior tracking
- **SEO Optimization** - Server-side rendering consideration
- **Testing** - Jest, React Testing Library, Cypress

## Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=your_api_base_url
```