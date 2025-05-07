// Color theme for the finance app
// A vibrant and professional color palette

// Main brand colors
export const primary = {
  main: '#4361EE', // Vibrant blue 
  light: '#4CC9F0', // Light blue for accents
  dark: '#3A0CA3',  // Deep purple-blue for emphasis
  contrast: '#FFFFFF', // White text on primary
  disabled: '#A5B4FC', // Lighter blue for disabled states
};

// Supporting/accent colors
export const accent = {
  success: '#06D6A0', // Vibrant teal
  warning: '#F9C74F', // Warm yellow
  error: '#EF476F',   // Bright pink-red
  info: '#118AB2',    // Medium blue
};

// Neutral colors for UI
export const neutral = {
  background: '#F8F9FC', // Light background
  card: '#FFFFFF',       // White cards
  text: {
    primary: '#1A202C',   // Almost black for primary text
    secondary: '#4A5568', // Dark gray for secondary text
    muted: '#718096',     // Medium gray for tertiary/muted text
    disabled: '#A0AEC0',  // Light gray for disabled text
  },
  border: {
    light: '#E2E8F0', // Light gray borders
    medium: '#CBD5E0', // Medium gray borders
  },
};

// Category colors for charts, budgets, etc.
export const categories = {
  food: '#4CC9F0',       // Light blue
  transportation: '#4361EE', // Vibrant blue
  shopping: '#7209B7',   // Purple
  entertainment: '#F72585', // Pink
  housing: '#3A0CA3',    // Deep purple-blue
  utilities: '#06D6A0',  // Teal
  health: '#4361EE',     // Vibrant blue
  education: '#F9C74F',  // Yellow
  other: '#118AB2',      // Medium blue
};

// Gradients for special elements
export const gradients = {
  primary: ['#4361EE', '#3A0CA3'],
  success: ['#06D6A0', '#0ACF97'],
  error: ['#EF476F', '#E5405E'],
};

// Status colors for progress bars, etc.
export const status = {
  low: '#06D6A0',      // Good/on-track (teal)
  medium: '#F9C74F',   // Warning (yellow)
  high: '#EF476F',     // Alert/bad (pink-red)
};

// Return a status color based on percentage
export const getStatusColor = (percentage: number): string => {
  if (percentage < 0.7) return status.low;
  if (percentage < 1) return status.medium;
  return status.high;
};

// Helper to get category color with fallback
export const getCategoryColor = (category: string): string => {
  const normalizedCategory = category.toLowerCase();
  const categoryKey = Object.keys(categories).find(key => 
    key.toLowerCase() === normalizedCategory
  );
  
  return categoryKey ? categories[categoryKey as keyof typeof categories] : categories.other;
};