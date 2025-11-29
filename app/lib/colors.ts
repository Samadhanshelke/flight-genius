/**
 * Flight Genius Color Palette - Quick Reference
 * 
 * All colors are available as Tailwind CSS classes and CSS variables.
 * Based on the logo's vibrant blue color.
 */

export const geniusColors = {
  // Primary Color Scale (50-950)
  primary: {
    50: '#eff6ff',   // Very light blue
    100: '#dbeafe',  // Light blue
    200: '#bfdbfe',  // Lighter blue
    300: '#93c5fd',  // Light accent
    400: '#60a5fa',  // Medium light
    500: '#3b82f6',  // PRIMARY - Logo Blue ⭐
    600: '#2563eb',  // Darker blue
    700: '#1d4ed8',  // Dark blue
    800: '#1e40af',  // Very dark blue
    900: '#1e3a8a',  // Deepest blue
    950: '#172554',  // Almost black blue
  },

  // Accent Colors
  accent: {
    sky: '#0ea5e9',      // Lighter sky blue - for highlights
    ocean: '#0284c7',    // Deep ocean blue - secondary actions
    sunset: '#f59e0b',   // Warm orange - CTAs
    cloud: '#f0f9ff',    // Very light blue - backgrounds
    night: '#0c4a6e',    // Dark blue - headers
  },

  // Functional Colors
  functional: {
    success: '#10b981', // Green
    warning: '#f59e0b', // Orange
    error: '#ef4444',   // Red
    info: '#3b82f6',    // Blue
  },
};

/**
 * Usage Examples:
 * 
 * Tailwind Classes:
 * - bg-genius-500         → Background
 * - text-genius-700      → Text color
 * - border-genius-300    → Border color
 * - hover:bg-genius-600  → Hover state
 * 
 * CSS Variables:
 * - var(--genius-500)
 * - var(--genius-sky)
 * - var(--genius-success)
 * 
 * Common Patterns:
 * 
 * Primary Button:
 * className="bg-genius-500 hover:bg-genius-600 text-white"
 * 
 * Secondary Button:
 * className="bg-genius-100 hover:bg-genius-200 text-genius-700"
 * 
 * Card Background:
 * className="bg-genius-cloud border border-genius-200"
 * 
 * Gradient:
 * className="bg-gradient-to-br from-genius-500 to-genius-700"
 */

export default geniusColors;
