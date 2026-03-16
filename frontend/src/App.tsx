import { useState, useEffect } from "react";
import { SubscriptionWizard } from "./components/afiliados/components/subscription-wizard";
import { AffiliateManagement } from "./components/afiliados/components/AffiliateManagement";
import { ActivityLogViewer } from "./components/afiliados/components/ActivityLogViewer";
import { AffiliateDashboard } from "./components/afiliados/components/AffiliateDashboard";
import { ErrorLogViewer } from "./components/afiliados/components/ErrorLogViewer";
import { PaymentDashboard } from "./components/afiliados/components/PaymentDashboard";
import { LoginForm } from "./components/auth/LoginForm";
import { Settings, PlusCircle, History, LogOut, User as UserIcon, LayoutDashboard, Terminal, DollarSign, Sun, Moon } from "lucide-react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
   const [view, setView] = useState<"wizard" | "management" | "history" | "errors" | "payments">("wizard");
   const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('theme') as 'light' | 'dark';
      if (saved && saved !== theme) {
        setTheme(saved);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [theme]);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsReady(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setView("wizard");
  };

  if (!isReady) return null;

  if (!user) {
    return <LoginForm onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Check roles for navigation
  const isAdmin = user.role?.slug === 'admin';
  const isGestor = user.role?.slug === 'gestor';
  const isAffiliate = user.role?.slug === 'affiliate';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500">
      {/* Top Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">CB</div>
            <h2 className="text-xl font-bold dark:text-white hidden md:block">ConsulBank <span className="text-gray-400 font-medium">Panel</span></h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3 pr-6 border-r border-gray-100 dark:border-gray-800">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold dark:text-white leading-tight">{user.full_name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user.role?.name || 'Usuario'}</span>
                </div>
            </div>
            
             <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-xl transition-all"
                title={theme === 'light' ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}
            >
                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            
            <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                title="Cerrar Sesión"
            >
                <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        {/* Navigation Toggle */}
        <div className="flex flex-wrap justify-center md:justify-end mb-8 gap-3">
            {isAffiliate && (
                <button 
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none transition-all"
                >
                    <LayoutDashboard className="w-4 h-4" /> Mi Resumen
                </button>
            )}

            {(isAdmin || isGestor) && (
                <button 
                    onClick={() => setView("wizard")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        view === "wizard" 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 hover:shadow-md"
                    }`}
                >
                    <PlusCircle className="w-4 h-4" /> Nueva Afiliación
                </button>
            )}

            {(isAdmin || isGestor) && (
                <button 
                    onClick={() => setView("management")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        view === "management" 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 hover:shadow-md"
                    }`}
                >
                    <Settings className="w-4 h-4" /> Gestión
                </button>
            )}

            {isAdmin && (
                <button 
                    onClick={() => setView("payments")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        view === "payments" 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 hover:shadow-md"
                    }`}
                >
                    <DollarSign className="w-4 h-4" /> Pagos
                </button>
            )}

            {isAdmin && (
                <button 
                    onClick={() => setView("history")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        view === "history" 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 hover:shadow-md"
                    }`}
                >
                    <History className="w-4 h-4" /> Auditoría
                </button>
            )}

            {isAdmin && (
                <button 
                    onClick={() => setView("errors")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        view === "errors" 
                        ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-200 dark:shadow-none" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:text-red-600 hover:shadow-md"
                    }`}
                >
                    <Terminal className="w-4 h-4" /> Consola
                </button>
            )}
        </div>

        <main className="pb-20">
            {isAffiliate && <AffiliateDashboard />}
            {!isAffiliate && view === "wizard" && (isAdmin || isGestor) && <SubscriptionWizard />}
             {!isAffiliate && view === "management" && (isAdmin || isGestor) && <AffiliateManagement />}
             {!isAffiliate && view === "history" && isAdmin && <ActivityLogViewer />}
             {!isAffiliate && view === "errors" && isAdmin && <ErrorLogViewer />}
             {!isAffiliate && view === "payments" && isAdmin && <PaymentDashboard />}
         </main>
      </div>
    </div>
  );
}
