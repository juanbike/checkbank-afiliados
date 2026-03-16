import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar preferencia guardada en localStorage (Sincronizado con App.tsx)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Aplicar o quitar clase 'dark' al html
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Guardar preferencia en localStorage (Sincronizado con App.tsx)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Disparar un evento storage manual por si App.tsx necesita enterarse 
    // (aunque lo ideal es usar un Contexto global)
    window.dispatchEvent(new Event('storage'));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
};
