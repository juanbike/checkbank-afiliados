import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  usuario: string | null;
  rol: string | null;
  sucursal: string | null;
  token: string | null;
  login: (usuario: string, rol: string, sucursal: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const [sucursal, setSucursal] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restaurar sesión del localStorage al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUsuario(authData.usuario);
        setRol(authData.rol);
        setSucursal(authData.sucursal);
        setToken(authData.token);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (usuario: string, rol: string, sucursal: string, token: string) => {
    setIsAuthenticated(true);
    setUsuario(usuario);
    setRol(rol);
    setSucursal(sucursal);
    setToken(token);

    // Guardar en localStorage
    localStorage.setItem('auth', JSON.stringify({ usuario, rol, sucursal, token }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsuario(null);
    setRol(null);
    setSucursal(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, rol, sucursal, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
