# React Calculator

This project is a conversion of an Angular-based calculator application to React. It maintains the same business logic, calculations, and UI design while adapting to React's component model and hooks.

## Features

- User input form for name and birthdate
- Calculation of numerological values based on birthdate
- Visual representation of calculations in a pyramid diagram
- Current and next year calculations
- Responsive design for mobile and desktop

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

## Conversion Notes

This project was converted from an Angular application with special attention to:

1. Preserving business logic and calculations
2. Matching the HTML/CSS design exactly
3. Converting Angular-specific syntax to React equivalents
4. Maintaining separation of logic and presentation
5. Using modern React patterns (hooks, functional components) # react-cal
