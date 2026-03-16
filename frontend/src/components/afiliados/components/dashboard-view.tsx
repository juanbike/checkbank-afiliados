import { useEffect, useState } from "react";
import {
    User,
    Building2,
    ShieldCheck,
    Calendar,
    LogOut,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { getAffiliateProfile } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

interface DashboardViewProps {
    token: string;
}

export function DashboardView({ token }: DashboardViewProps) {
    const { logout } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getAffiliateProfile(token);
                setProfile(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar el perfil");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Cargando tu información...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 px-4">
                <p className="text-red-500 mb-4 font-bold">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    const { user, affiliate } = profile;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Afiliado</h1>
                    <p className="text-gray-500 dark:text-gray-400">Bienvenido de nuevo, {user.full_name}</p>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white/20 p-3 rounded-2xl">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                            {affiliate?.status || 'Active'}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium opacity-80">Plan Actual</h3>
                    <p className="text-2xl font-bold">{affiliate?.plan || 'No seleccionado'}</p>
                    <p className="mt-2 text-sm opacity-70">Suscripción {affiliate?.payment_period || 'Mensual'}</p>
                </div>

                {/* User Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl">
                            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-white">Datos de Acceso</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Información de usuario</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Usuario:</span>
                            <span className="font-medium dark:text-gray-200">{user.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Rol:</span>
                            <span className="font-medium dark:text-gray-200">{user.role || 'Afiliado'}</span>
                        </div>
                    </div>
                </div>

                {/* Commerce Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl">
                            <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-white">Sucursal / Branch</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Ubicación asignada</p>
                        </div>
                    </div>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{user.branch || 'Principal'}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Registro creado el {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {affiliate && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        Detalles de la Afiliación
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-bold">Tipo de Solicitante</p>
                            <p className="font-medium dark:text-gray-200 capitalize">{affiliate.client_type.replace('_', ' ')}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-bold">Referencia</p>
                            <p className="font-medium dark:text-gray-200">#{affiliate.id.slice(0, 8)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-bold">Desde</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <p className="font-medium dark:text-gray-200">{new Date(affiliate.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-bold">Estado</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="font-medium dark:text-gray-200">Operativo</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!affiliate && (
                <div className="p-12 text-center bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-3xl">
                    <p className="text-yellow-800 dark:text-yellow-400 font-medium">
                        Aún no has completado tu perfil de afiliado. Por favor, selecciona un plan para continuar.
                    </p>
                </div>
            )}
        </div>
    );
}
