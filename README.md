# Numerana Calculator - React Application

A comprehensive numerology calculator application with support for single, couple, and team calculations. Built with React and deployed to GitHub Pages.

**Live Site:** https://hrangel1126.github.io/numerana-calculator/

## Features

- ✅ Single calculator (personal numerology)
- ✅ SingleBasic calculator (simplified version)
- ✅ Couple calculator (relationship numerology)
- ✅ Team calculator (group numerology)
- ✅ Annual, monthly, and daily calculations
- ✅ Visual pinaculo diagrams
- ✅ Multi-language support
- ✅ Responsive design (mobile & desktop)
- ✅ URL-based menu control
- ✅ GitHub Pages deployment with SPA routing

## Quick Links

| Page | URL |
|------|-----|
| Home | https://hrangel1126.github.io/numerana-calculator/ |
| Single | https://hrangel1126.github.io/numerana-calculator/single |
| SingleBasic | https://hrangel1126.github.io/numerana-calculator/singlebasic |
| Couple | https://hrangel1126.github.io/numerana-calculator/couple |
| Team | https://hrangel1126.github.io/numerana-calculator/team |

## Query Parameters

### Menu Control (applies to all pages)

Hide the header menu by adding `?menu=false`:

```
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false
```

| Parameter | Values | Default | Purpose |
|-----------|--------|---------|---------|
| `menu` | `true`, `false` | `true` | Show/hide header menu |

**Examples:**
- Show menu (default): `https://hrangel1126.github.io/numerana-calculator/singlebasic`
- Hide menu: `https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false`
- Explicitly show: `https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=true`

### Embedding in iframes

To embed calculator without menu in an iframe:

```html
<iframe 
  src="https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false"
  width="100%"
  height="600px"
></iframe>
```

## Getting Started

### Prerequisites

- Node.js (14.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:

```bash
npm run build
```

## Implementation Details

The application consists of:

- Utility functions for calculations (converted from Angular services)
- React components using hooks for state management
- SVG visualizations for data representation
- CSS for styling, maintaining the original design

## Deployment & Routing

### GitHub Pages Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions when you push to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`

### SPA Routing on GitHub Pages

The app uses React Router with basename configuration to support SPA routing on a GitHub Pages subfolder:

- **Development:** `http://localhost:3000/` (basename: `/`)
- **Production:** `https://hrangel1126.github.io/numerana-calculator/` (basename: `/numerana-calculator`)

**How it works:**
1. React Router automatically detects environment
2. For routes not found, GitHub Pages serves `public/404.html`
3. 404.html redirects to index.html with path as query parameter
4. React Router handles navigation to correct page
5. User sees clean URL without query parameters

**Technical Details:** See [GITHUB_PAGES_404_ROUTING.md](./GITHUB_PAGES_404_ROUTING.md)

## Implementation Notes

This project includes:

1. **Numerology Calculations** - Complex calculation logic for personal numbers
2. **React Components** - Functional components with hooks
3. **Multi-page Application** - Single, SingleBasic, Couple, Team pages
4. **Responsive Design** - Mobile and desktop optimized
5. **Internationalization** - Language context support
6. **Menu System** - URL parameter control for header visibility
7. **GitHub Pages Integration** - Automatic deployment and SPA routing

## Documentation

Complete documentation is available in the root directory:

- **[DOCUMENTATION_README.md](./DOCUMENTATION_README.md)** - Getting started with docs
- **[SESSION_SUMMARY.md](./SESSION_SUMMARY.md)** - Latest updates
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide
- **[GITHUB_PAGES_404_ROUTING.md](./GITHUB_PAGES_404_ROUTING.md)** - Routing details
- **[MENU_VISIBILITY.md](./MENU_VISIBILITY.md)** - Menu system docs
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Full documentation index
