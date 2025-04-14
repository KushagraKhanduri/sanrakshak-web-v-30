
import React, { createContext, useContext, useEffect, useState } from 'react';

// Update the Theme type to include both dark and light
// This will prevent type errors in components that compare with 'light'
type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Hardcode to dark theme
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Always set to dark mode
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add('dark-mode');
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add('dark-mode');
    
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
