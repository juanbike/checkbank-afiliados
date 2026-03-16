import { useState, useEffect } from 'react';
import { fetchPaymentStats, fetchAllPayments } from '../../../services/api';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
    CreditCard, TrendingUp, Calendar, User, 
    CheckCircle2, Clock, AlertCircle, DollarSign,
    Filter, Download, ChevronRight
} from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const PaymentDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('auth_token') || '';
            const [statsData, paymentsData] = await Promise.all([
                fetchPaymentStats(token),
                fetchAllPayments(token)
            ]);
            setStats(statsData);
            setPayments(paymentsData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Cargando estadísticas financieras...</p>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-6 rounded-2xl flex items-center gap-4 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <div>
                <h3 className="font-bold">Error al cargar datos</h3>
                <p className="text-sm opacity-90">{error}</p>
            </div>
        </div>
    );

    const totalVolume = stats?.statusStats.reduce((acc: number, curr: any) => acc + parseFloat(curr.total_amount), 0) || 0;
    const pendingAmount = stats?.statusStats.find((s: any) => s.status === 'pending')?.total_amount || 0;
    const approvedCount = stats?.statusStats.find((s: any) => s.status === 'approved')?.count || 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Panel Financiero</h1>
                    <p className="text-slate-500 dark:text-gray-400 mt-1 font-medium">Estadísticas y control de cobros ConsulBank</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-slate-50 transition-all cursor-not-allowed opacity-60">
                        <Filter className="w-4 h-4" /> Filtrar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
                        <Download className="w-4 h-4" /> Exportar Reporte
                    </button>
                </div>
            </div>

            {/* Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Volumen Total</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                        ${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h3>
                    <div className="mt-2 text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +12.5% vs mes anterior
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Pendiente</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                        ${parseFloat(pendingAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-400 italic">Esperando validación bancaria</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Pagos Aprobados</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{approvedCount}</h3>
                    <p className="mt-2 text-xs font-medium text-emerald-500 font-bold uppercase tracking-tighter">98.2% efectividad</p>
                </div>

                <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-200 dark:shadow-none flex flex-col justify-between overflow-hidden relative group">
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-indigo-100 uppercase tracking-wider">Meta Mensual</p>
                        <h3 className="text-2xl font-black text-white mt-1">85% Completado</h3>
                    </div>
                    <div className="relative z-10 mt-6 h-2 bg-indigo-500/50 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-4/5 rounded-full"></div>
                    </div>
                    <DollarSign className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500/30 group-hover:scale-125 transition-transform duration-1000" />
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Line Chart: Daily Volume */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-slate-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-black text-slate-800 dark:text-white">Flujo de Cobros (30 días)</h3>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats?.dailyStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="date" 
                                    tickFormatter={(str) => new Date(str).toLocaleDateString('es-VE', { day: 'numeric', month: 'short' })}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}}
                                    tickFormatter={(val) => `$${val}`}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(val) => [`$${val}`, 'Monto']}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="daily_total" 
                                    stroke="#6366f1" 
                                    strokeWidth={4} 
                                    dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Methods */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-slate-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                <CreditCard className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-black text-slate-800 dark:text-white">Métodos de Pago Populares</h3>
                        </div>
                    </div>
                    <div className="h-[300px] w-full flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.methodStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="count"
                                    nameKey="method"
                                >
                                    {stats?.methodStats.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-slate-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-black text-slate-800 dark:text-white text-xl">Transacciones Recientes</h3>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-widest">Tiempo Real</span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5">
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Afiliado / Usuario</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Referencia</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Monto</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center font-bold text-slate-600 dark:text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                {payment.user_name?.substring(0, 2).toUpperCase() || '??'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{payment.user_name || 'Sin nombre'}</p>
                                                <p className="text-xs text-slate-400">{payment.user_email || 'No email'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-medium text-slate-600 dark:text-gray-400">
                                            {new Date(payment.fecha_pago).toLocaleDateString('es-VE', { day: '2-digit', month: 'short' })}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                            {new Date(payment.fecha_pago).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-slate-100 dark:bg-gray-800 rounded-lg text-slate-500">
                                                <CreditCard className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-tight">{payment.referencia}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">{payment.metodo_pago}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">
                                            {payment.moneda} {parseFloat(payment.monto).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            payment.status === 'approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                            payment.status === 'pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30' :
                                            'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30'
                                        }`}>
                                            {payment.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                                            {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                                            {payment.status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                                            {payment.status === 'approved' ? 'Aprobado' :
                                             payment.status === 'pending' ? 'Pendiente' : 'Verificado'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-gray-800 flex justify-center">
                    <button className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                        Ver todas las transacciones <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
