# AIRefine Technical Documentation

## Brand Identity

### Colors
Primary color palette in HSL:

```css
Background (Deep Navy):    HSL(222, 47%, 11%)
Card (Darker Navy):       HSL(224, 71%, 4%)
Primary (Neon Green):     HSL(84, 100%, 59%)
Secondary:                HSL(217.2, 32.6%, 17.5%)
Muted:                    HSL(215, 27.9%, 16.9%)
Muted Text:               HSL(217.9, 10.6%, 64.9%)
Foreground:               HSL(210, 40%, 98%)
```

Status Colors:
- Active:     Primary (Neon Green)
- Review:     Yellow (opacity: 20%)
- Completed:  Green (opacity: 20%)
- Unclaimed:  Blue (opacity: 20%)

### Typography
- Font Stack: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif
- Base size: 16px
- Scale:
  - Headings: 2.25rem (h1), 1.5rem (h2), 1.25rem (h3)
  - Body: 1rem
  - Small text: 0.875rem
  - Micro text: 0.75rem

### Border Radius
- Large: 0.5rem (8px)
- Medium: 0.375rem (6px)
- Small: 0.25rem (4px)

## Technical Stack

### Frontend
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Component Library: shadcn/ui
- Icons: Lucide React
- Charts: Recharts
- Form Handling: React Hook Form
- Date Handling: date-fns

### UI Components
Core components built with Radix UI primitives:
- Dialog
- Tabs
- Select
- Button
- Card
- Badge
- Input/Textarea
- Avatar
- Progress

### Layout System
- Responsive grid system using Tailwind's grid classes
- Max width container: 1400px
- Spacing scale:
  - 2: 0.5rem (8px)
  - 4: 1rem (16px)
  - 6: 1.5rem (24px)
  - 8: 2rem (32px)

### Animation
Tailwind CSS animations:
```css
keyframes: {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
}
```

### Gradient
Background gradient:
```css
background: linear-gradient(180deg, hsl(222, 47%, 11%) 0%, hsl(224, 71%, 4%) 100%);
```

## Component Architecture

### Layout Components
- DashboardLayout: Main layout wrapper
- Sidebar: Navigation component
- Navbar: Top bar with user controls
- NotificationsDialog: Notification system

### Page Structure
```
app/
├── business/     # Business user routes
├── editor/       # Editor user routes
├── create/       # Job creation
├── search/       # Job search
└── components/   # Shared components
```

### State Management
- React useState for local state
- React Context for theme/auth state
- URL state for filters/search

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1400px

## Performance Considerations

### Optimizations
- Component code splitting
- Image optimization
- CSS purging
- Tree shaking
- Route prefetching

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast ratios
- Screen reader support

## Development Guidelines

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component naming conventions
- File structure conventions

### Best Practices
- Server/Client component separation
- Proper error handling
- Performance monitoring
- Accessibility testing
- Cross-browser testing