import { useState, useEffect } from "react";
import { 
  User, 
  CreditCard, 
  ChevronRight, 
  BadgeCheck, 
  Calendar, 
  Shield, 
  AlertCircle,
  Loader2,
  Clock,
  ArrowUpRight,
  Gem
} from "lucide-react";
import { getAffiliateProfile } from "../../../services/api";

export function AffiliateDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error("No hay sesión activa");
        const res = await getAffiliateProfile(token);
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
      <p className="text-gray-500 font-medium italic">Preparando tu resumen...</p>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-800">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Error al cargar perfil</h3>
      <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
    </div>
  );

  const { affiliate, user, latestPayment } = data;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">¡Hola, {user.full_name.split(' ')[0]}! 👋</h1>
            <p className="text-indigo-100 text-lg font-medium opacity-90">Bienvenido a tu portal de ConsulBank. Aquí tienes el estado de tu cuenta.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <Shield className="w-5 h-5 text-indigo-200" />
            <span className="font-bold text-sm tracking-wide">ID: {affiliate?.id?.substring(0, 8).toUpperCase() || 'P-000'}</span>
          </div>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                affiliate?.status === 'active' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : 'bg-amber-50 text-amber-700 border-amber-100'
            }`}>
              {affiliate?.status?.toUpperCase() || 'PENDIENTE'}
            </span>
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Estado de Afiliación</h3>
          <p className="text-2xl font-black text-gray-900 dark:text-white capitalize">Activo y Protegido</p>
        </div>

        {/* Plan Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
              <Gem className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Plan Actual</h3>
          <p className="text-2xl font-black text-gray-900 dark:text-white capitalize">{affiliate?.plan || 'Basico'}</p>
          <p className="text-xs text-indigo-600 font-bold mt-2">Facturación {affiliate?.payment_period || 'mensual'}</p>
        </div>

        {/* Next Payment Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
            <Clock className="w-5 h-5 text-gray-300" />
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Último Pago</h3>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {latestPayment ? new Date(latestPayment.fecha_pago).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-xs text-gray-400 font-medium mt-2">Monto: ${latestPayment?.monto || '0.00'}</p>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-10 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    Información Registrada
                </h3>
                <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
                    Editar Perfil <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Razón Social / Nombre</p>
                        <p className="font-bold text-gray-900 dark:text-white">{affiliate?.display_name || user.full_name}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <Shield className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Tipo de Cliente</p>
                        <p className="font-bold text-gray-900 dark:text-white capitalize">{affiliate?.client_type || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Correo de Contacto</p>
                        <p className="font-bold text-gray-900 dark:text-white">{affiliate?.contact_email || user.username}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">¿Necesitas Ayuda?</h3>
                <p className="text-indigo-100 font-medium opacity-90 leading-relaxed max-w-xs">
                    Si tienes dudas sobre tu plan, pagos o quieres actualizar tus datos, contacta a tu asesor dedicado.
                </p>
            </div>

            <div className="relative z-10 mt-10">
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                    Contactar Soporte
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
