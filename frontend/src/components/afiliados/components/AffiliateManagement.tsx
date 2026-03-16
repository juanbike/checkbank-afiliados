import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  X, 
  CheckCircle, 
  AlertCircle,
  Filter
} from "lucide-react";
import { fetchAffiliates, updateAffiliateGeneral, deleteAffiliate } from "../../../services/api";

interface Affiliate {
  id: string;
  client_type: string;
  plan: string;
  payment_period: string;
  status: string;
  display_name: string;
  email: string;
  created_at: string;
}

export function AffiliateManagement() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    status: "",
    plan: "",
    payment_period: ""
  });

  const loadAffiliates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAffiliates();
      setAffiliates(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar afiliados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAffiliates();
  }, []);

  const handleEdit = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setEditForm({
      status: affiliate.status,
      plan: affiliate.plan,
      payment_period: affiliate.payment_period
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este afiliado? Esta acción no se puede deshacer.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAffiliate(id);
      setAffiliates(affiliates.filter(a => a.id !== id));
      alert("Afiliado eliminado exitosamente");
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAffiliate) return;

    try {
      await updateAffiliateGeneral(selectedAffiliate.id, editForm);
      setIsEditModalOpen(false);
      loadAffiliates();
      alert("Afiliado actualizado correctamente");
    } catch (err: any) {
      alert(err.message || "Error al actualizar");
    }
  };

  const filteredAffiliates = affiliates.filter(a => 
    a.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.includes(searchTerm)
  );

  if (loading && affiliates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Cargando gestión de afiliados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Gestión de Afiliados
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Administra y supervisa todos los afiliados del sistema</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 font-medium">Total Afiliados</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{affiliates.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-green-600 font-medium">Activos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{affiliates.filter(a => a.status === 'active').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{affiliates.filter(a => a.status === 'pending').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-right flex items-end justify-end">
             <button 
                onClick={loadAffiliates}
                className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1"
             >
                <Filter className="w-4 h-4" /> Recargar
             </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-2xl flex items-center gap-3 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 glass-effect">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold font-mono">ID / Afiliado</th>
                <th className="px-6 py-4 font-bold">Tipo / Perfil</th>
                <th className="px-6 py-4 font-bold">Plan / periodo</th>
                <th className="px-6 py-4 font-bold text-center">Estado</th>
                <th className="px-6 py-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {affiliate.display_name || "Sin nombre"}
                      </span>
                      <span className="text-xs text-gray-400 font-mono truncate w-32">{affiliate.id}</span>
                      <span className="text-xs text-blue-500">{affiliate.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-sm dark:text-gray-300 capitalize">{affiliate.client_type.replace('_', ' ')}</span>
                        <span className="text-xs text-gray-400">Desde {new Date(affiliate.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium dark:text-gray-200">{affiliate.plan}</span>
                        <span className="text-xs text-gray-400 capitalize">{affiliate.payment_period}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      affiliate.status === 'active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : affiliate.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {affiliate.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {affiliate.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleEdit(affiliate)}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                            title="Editar"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(affiliate.id)}
                            disabled={isDeleting}
                            className={`p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Eliminar"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAffiliates.length === 0 && (
          <div className="py-20 text-center">
             <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 font-medium">No se encontraron afiliados que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in slide-in-from-scale-95 duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="text-xl font-bold dark:text-white">Editar Afiliado</h3>
                    <button 
                        onClick={() => setIsEditModalOpen(false)}
                        className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                
                <form onSubmit={handleUpdate} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Estado</label>
                        <select 
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                            value={editForm.status}
                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                        >
                            <option value="pending">Pendiente</option>
                            <option value="active">Activo</option>
                            <option value="suspended">Suspendido</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Plan</label>
                        <select 
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                            value={editForm.plan}
                            onChange={(e) => setEditForm({...editForm, plan: e.target.value})}
                        >
                            <option value="Basic">Basic</option>
                            <option value="Professional">Professional</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Periodo de Pago</label>
                        <select 
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                            value={editForm.payment_period}
                            onChange={(e) => setEditForm({...editForm, payment_period: e.target.value})}
                        >
                            <option value="mensual">Mensual</option>
                            <option value="anual">Anual</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
