import { useState, useEffect } from "react";
import { 
  ClipboardList, 
  Search, 
  Clock, 
  User, 
  Activity, 
  Database,
  ArrowRightCircle,
  Loader2,
  RefreshCw
} from "lucide-react";

import { fetchActivityLogs } from "../../../services/api";

interface ActivityLog {
  id: number;
  user_id: string | null;
  username: string | null;
  full_name: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: any;
  ip_address: string | null;
  created_at: string;
}

export function ActivityLogViewer() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("No hay sesión activa");
      const data = await fetchActivityLogs(token);
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.entity_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-indigo-600" />
            Historial de Operaciones
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Auditoría completa de acciones en la plataforma y base de datos</p>
        </div>

        <div className="flex gap-2">
            <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
                type="text"
                placeholder="Filtrar por acción o usuario..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <button 
                onClick={fetchLogs}
                className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                title="Refrescar"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <RefreshCw className="w-5 h-5 text-indigo-600" />}
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Fecha / Hora</th>
                <th className="px-6 py-4 font-bold">Usuario</th>
                <th className="px-6 py-4 font-bold">Acción</th>
                <th className="px-6 py-4 font-bold">Entidad</th>
                <th className="px-6 py-4 font-bold">Detalles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold dark:text-white">{log.full_name || "Sistema / Invitado"}</span>
                        <span className="text-xs text-gray-400">{log.username || log.ip_address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                      <Activity className="w-3 h-3" />
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium dark:text-gray-200 flex items-center gap-1">
                        <Database className="w-3 h-3 text-gray-400" />
                        {log.entity_type || "-"}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono truncate w-24">{log.entity_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs overflow-hidden">
                        <pre className="text-[10px] bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 max-h-16 overflow-y-auto whitespace-pre-wrap">
                            {JSON.stringify(log.details, null, 2)}
                        </pre>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && !loading && (
          <div className="py-20 text-center">
             <ArrowRightCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 font-medium">No hay registros de actividad todavía.</p>
          </div>
        )}
      </div>
    </div>
  );
}
