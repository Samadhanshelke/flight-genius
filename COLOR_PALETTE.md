# Flight Genius Color Palette

This document describes the custom color palette for the Flight Genius website.

## Primary Color Scale - "Genius Blue"

Based on the logo's vibrant blue color, here's the complete genius color scale:

| Color | Variable | Hex Code | Usage |
|-------|----------|----------|-------|
| genius-50 | `--genius-50` | #eff6ff | Very light blue - backgrounds, hover states |
| genius-100 | `--genius-100` | #dbeafe | Light blue - subtle backgrounds |
| genius-200 | `--genius-200` | #bfdbfe | Lighter blue - borders, dividers |
| genius-300 | `--genius-300` | #93c5fd | Light accent - secondary buttons |
| genius-400 | `--genius-400` | #60a5fa | Medium light - interactive elements |
| **genius-500** | `--genius-500` | **#3b82f6** | **PRIMARY - Logo Blue** |
| genius-600 | `--genius-600` | #2563eb | Darker blue - primary button hover |
| genius-700 | `--genius-700` | #1d4ed8 | Dark blue - headings, emphasis |
| genius-800 | `--genius-800` | #1e40af | Very dark blue - strong text |
| genius-900 | `--genius-900` | #1e3a8a | Deepest blue - dark backgrounds |
| genius-950 | `--genius-950` | #172554 | Almost black blue - high contrast |

## Accent Colors

Special accent colors for specific use cases:

| Color | Variable | Hex Code | Usage |
|-------|----------|----------|-------|
| genius-sky | `--genius-sky` | #0ea5e9 | Lighter sky blue - highlights, badges |
| genius-ocean | `--genius-ocean` | #0284c7 | Deep ocean blue - secondary actions |
| genius-sunset | `--genius-sunset` | #f59e0b | Warm orange - CTAs, important actions |
| genius-cloud | `--genius-cloud` | #f0f9ff | Very light blue - card backgrounds |
| genius-night | `--genius-night` | #0c4a6e | Dark blue - headers, footers |

## Functional Colors

Status and feedback colors:

| Color | Variable | Hex Code | Usage |
|-------|----------|----------|-------|
| genius-success | `--genius-success` | #10b981 | Success messages, confirmations |
| genius-warning | `--genius-warning` | #f59e0b | Warnings, alerts |
| genius-error | `--genius-error` | #ef4444 | Errors, critical messages |
| genius-info | `--genius-info` | #3b82f6 | Information, tips |

## Usage Examples

### In Tailwind CSS Classes

```tsx
// Primary button
<button className="bg-genius-500 hover:bg-genius-600 text-white">
  Book Flight
</button>

// Secondary button
<button className="bg-genius-100 hover:bg-genius-200 text-genius-700">
  Learn More
</button>

// Card with gradient
<div className="bg-gradient-to-br from-genius-500 to-genius-700">
  Content
</div>

// Text colors
<h1 className="text-genius-900">Flight Genius</h1>
<p className="text-genius-600">Find your perfect flight</p>

// Background
<section className="bg-genius-cloud">
  Light background section
</section>

// Border
<div className="border-2 border-genius-300">
  Bordered content
</div>

// Accent actions
<button className="bg-genius-sunset hover:bg-orange-600 text-white">
  Special Offer!
</button>
```

### In CSS Variables

```css
.custom-element {
  background-color: var(--genius-500);
  color: var(--genius-50);
  border: 2px solid var(--genius-300);
}

.gradient-bg {
  background: linear-gradient(135deg, var(--genius-500), var(--genius-700));
}
```

## Dark Mode

The color palette automatically adjusts for dark mode with inverted scales for better contrast and readability.

## Design Guidelines

1. **Primary Actions**: Use `genius-500` (main blue) with `genius-600` for hover
2. **Secondary Actions**: Use `genius-100` or `genius-200` with darker text
3. **Headers**: Use `genius-700` to `genius-900` for strong headings
4. **Body Text**: Use `genius-600` or `genius-700` for readable text
5. **Backgrounds**: Use `genius-50`, `genius-100`, or `genius-cloud` for light sections
6. **CTAs/Special Actions**: Use `genius-sunset` (orange) to stand out
7. **Borders/Dividers**: Use `genius-200` or `genius-300` for subtle separation

---

**Note**: This color palette is optimized for accessibility with proper contrast ratios and includes dark mode support.
