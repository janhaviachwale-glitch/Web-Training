# Web Training – Styling Paradigms

This repository contains two exercises exploring different approaches to styling React applications.

## Exercises

### Exercise 1: Responsive Product Dashboard using Tailwind CSS

**Folder:** `styling-paradigms/exercise-1-tailwind-dashboard`

Built a responsive product dashboard using React, TypeScript and Tailwind CSS.

**Key features:**
- Responsive product dashboard layout.
- Reusable components for the header, sidebar, product grid and product cards.
- Product details with prices and stock status.
- Responsive layouts for mobile, tablet and desktop screens.
- Interactive buttons, hover effects and keyboard focus states.

**Technologies:** React, TypeScript, Vite, Tailwind CSS.

### Exercise 2: Reusable Component Library using Vanilla Extract

**Folder:** `styling-paradigms/exercise-2-vanilla-extract`

Built a reusable component showcase using React, TypeScript and Vanilla Extract.

**Key features:**
- Shared theme contract with design tokens for colors, spacing, typography and border radius.
- Reusable Button component with primary, secondary and danger variants.
- Small and large button sizes.
- Disabled and hover states with keyboard focus styling.
- Reusable Card component with consistent spacing, borders and shadows.
- Badge component with success, warning and error variants.
- Type-safe styling using Vanilla Extract.

**Technologies:** React, TypeScript, Vite, Vanilla Extract.

## Project Structure

```text
web-training/
├── README.md
└── styling-paradigms/
    ├── exercise-1-tailwind-dashboard/
    └── exercise-2-vanilla-extract/
```

## Getting Started

Each exercise is an independent Vite application.

### Exercise 1

```bash
cd styling-paradigms/exercise-1-tailwind-dashboard
npm install
npm run dev
```

### Exercise 2

```bash
cd styling-paradigms/exercise-2-vanilla-extract
npm install
npm run dev
```

Open the local URL displayed in the terminal to view the application.

## Validation

Run the following commands from the respective exercise directory:

```bash
npm run lint
npm run build
```

Both exercises were checked using linting and production builds.