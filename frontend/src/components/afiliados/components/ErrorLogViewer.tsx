import { useState, useEffect } from "react";
import { 
  Search, 
  RefreshCcw, 
  Clock, 
  Terminal, 
  ChevronRight, 
  ChevronDown,
  XCircle,
  AlertCircle,
  Trash2
} from "lucide-react";
import { fetchErrorLogs, clearErrorLogs } from "../../../services/api";

export function ErrorLogViewer() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("No hay sesión activa");
      const data = await fetchErrorLogs(token);
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!window.confirm("¿Estás seguro de que deseas vaciar todos los registros de errores? Esta acción no se puede deshacer.")) {
        return;
    }

    try {
        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("No hay sesión activa");
        await clearErrorLogs(token);
        setLogs([]);
        alert("Los registros de errores han sido eliminados.");
    } catch (err: any) {
        alert("Error al vaciar los logs: " + err.message);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            Consola de Errores
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Monitoreo técnico de fallos en tiempo real</p>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={handleClearLogs}
                disabled={loading || logs.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl text-sm font-bold text-red-600 dark:text-red-400 hover:shadow-md transition-all disabled:opacity-50"
            >
                <Trash2 className="w-4 h-4" />
                Limpiar Logs
            </button>

            <button 
                onClick={loadLogs}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:shadow-md transition-all disabled:opacity-50"
            >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Actualizar Logs
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="relative group max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text"
              placeholder="Buscar en el registro de errores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none transition-all dark:text-white text-sm font-medium shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {error ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          ) : filteredLogs.length === 0 && !loading ? (
            <div className="p-12 text-center">
              <Terminal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-medium italic">No se encontraron registros de errores</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/30 dark:bg-gray-800/30">
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Sello de Tiempo</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Contexto</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest italic">Error / Mensaje</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800 font-medium">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold border border-red-100 dark:border-red-900/30 uppercase tracking-tighter">
                        <Terminal className="w-3 h-3" />
                        {log.context}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div 
                        className={`text-sm text-gray-800 dark:text-gray-200 font-mono truncate max-w-lg ${expandedId === index ? 'whitespace-pre-wrap truncate-none' : ''}`}
                      >
                        {log.message}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setExpandedId(expandedId === index ? null : index)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                      >
                        {expandedId === index ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
