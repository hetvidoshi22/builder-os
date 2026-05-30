export const Colors = {
  background: '#09090B',
  surface: '#18181B',
  surfaceHighlight: '#27272A',
  primary: '#FFFFFF',
  secondary: '#A1A1AA',
  accent: '#3B82F6', // A subtle blue for interactive elements
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#27272A',
  text: '#FAFAFA',
  textMuted: '#A1A1AA',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
  caption: {
    fontSize: 14,
    color: Colors.textMuted,
  },
};
