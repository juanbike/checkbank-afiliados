import type { ClientType } from "./subscription-wizard";
import { User, Building2, Landmark, Briefcase, Lightbulb } from "lucide-react";

interface ClientTypeSelectorProps {
  onSelect: (type: ClientType) => void;
}

export function ClientTypeSelector({ onSelect }: ClientTypeSelectorProps) {
  const clientTypes = [
    {
      type: "natural" as ClientType,
      icon: User,
      title: "Persona Natural",
      subtitle: "Cliente Individual 👤",
      description: "Para uso personal o individual",
    },
    {
      type: "juridica" as ClientType,
      icon: Building2,
      title: "Persona Jurídica",
      subtitle: "Empresa 🏢",
      description: "Para empresas y corporaciones",
    },
    {
      type: "firma_personal" as ClientType,
      icon: Briefcase,
      title: "Firma Personal",
      subtitle: "Negocio Personal 💼",
      description: "Para negocios y firmas personales",
    },
    {
      type: "emprendedor" as ClientType,
      icon: Lightbulb,
      title: "Emprendedor",
      subtitle: "Proyecto / Startup 💡",
      description: "Para emprendedores y startups",
    },
    {
      type: "ente_gubernamental" as ClientType,
      icon: Landmark,
      title: "Ente Gubernamental",
      subtitle: "Institución Pública 🏛️",
      description: "Para entidades gubernamentales",
    },
  ];

  return (
    <div>
      <h2 className="text-center mb-2 text-gray-900 dark:text-white transition-colors">Selecciona el Tipo de Cliente</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 transition-colors">
        Elige la categoría que mejor describe tu situación
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {clientTypes.map((client) => {
          const Icon = client.icon;
          return (
            <button
              key={client.type}
              onClick={() => onSelect(client.type)}
              className="flex-1 min-w-[240px] max-w-[320px] p-8 rounded-2xl border-2 border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1 text-left bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} />
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white transition-colors capitalize">{client.title}</h3>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 transition-colors">{client.subtitle}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors leading-relaxed">{client.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
