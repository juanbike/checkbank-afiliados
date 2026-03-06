import { useState } from "react";
import type { CommerceData } from "./subscription-wizard";
import { ArrowLeft, ArrowRight, MapPin, Globe, DollarSign } from "lucide-react";

interface CommerceInfoFormProps {
  initialData: CommerceData;
  onSubmit: (data: CommerceData) => void;
  onBack: () => void;
}

// Estructura completa: Estado -> Ciudad -> Municipio -> Parroquias (igual que en client-data-form)
const UBICACIONES_VENEZUELA: Record<string, Record<string, Record<string, string[]>>> = {
  "Distrito Capital": {
    "Caracas": {
      "Libertador": ["23 de Enero", "Altagracia", "Antímano", "Caricuao", "Catedral", "Catia", "Coche", "El Junquito", "El Paraíso", "El Recreo", "El Valle", "La Candelaria", "La Pastora", "La Vega", "Macarao", "San Agustín", "San Bernardino", "San José", "San Juan", "San Pedro", "Santa Rosalía", "Santa Teresa", "Sucre"]
    }
  },
  "Miranda": {
    "Los Teques": {
      "Guaicaipuro": ["Los Teques", "Cecilio Acosta", "Paracotos", "San Pedro"]
    },
    "Guarenas": {
      "Plaza": ["Guarenas", "Mampote"]
    },
    "Guatire": {
      "Zamora": ["Guatire", "Araira"]
    },
    "Petare": {
      "Sucre": ["Petare", "Caucagüita", "Filas de Mariche", "Leoncio Martínez", "La Dolorita"]
    },
    "Baruta": {
      "Baruta": ["Baruta", "El Cafetal", "Las Minas de Baruta"]
    },
    "Chacao": {
      "Chacao": ["Chacao"]
    },
    "El Hatillo": {
      "El Hatillo": ["El Hatillo"]
    },
    "Charallave": {
      "Cristóbal Rojas": ["Charallave"]
    },
    "Ocumare del Tuy": {
      "Lander": ["Ocumare del Tuy"]
    },
    "Higuerote": {
      "Brión": ["Higuerote", "Curiepe", "Tacarigua"]
    },
    "Caucagua": {
      "Acevedo": ["Caucagua", "Panaquire", "Aragüita"]
    },
    "San Antonio de Los Altos": {
      "Los Salias": ["San Antonio de Los Altos"]
    },
    "Carrizal": {
      "Carrizal": ["Carrizal"]
    }
  },
  "Zulia": {
    "Maracaibo": {
      "Maracaibo": ["Bolívar", "Cacique Mara", "Caracciolo Parra Pérez", "Cecilio Acosta", "Cristo de Aranza", "Coquivacoa", "Chiquinquirá", "Francisco Eugenio Bustamante", "Idelfonzo Vásquez", "Juana de Ávila", "Luis Hurtado Higuera", "Manuel Dagnino", "Olegario Villalobos", "Raúl Leoni", "San Isidro", "Santa Lucía", "Venancio Pulgar", "Antonio Borjas Romero", "Domitila Flores"]
    },
    "Cabimas": {
      "Cabimas": ["Ambrosio", "Carmen Herrera", "La Rosa", "Germán Ríos Linares", "San Benito", "Rómulo Betancourt", "Jorge Hernández", "Punta Gorda", "Arístides Calvani"]
    },
    "Ciudad Ojeda": {
      "Lagunillas": ["Ciudad Ojeda", "Lagunillas", "Venezuela"]
    },
    "San Francisco": {
      "San Francisco": ["San Francisco", "El Bajo", "Domitila Flores", "Francisco Ochoa", "Los Cortijos", "Marcial Hernández"]
    },
    "Santa Rita": {
      "Santa Rita": ["Santa Rita", "El Mene", "Pedro Lucas Urribarrí", "José Domingo Rus"]
    }
  },
  "Carabobo": {
    "Valencia": {
      "Valencia": ["Candelaria", "Catedral", "El Socorro", "Miguel Peña", "Rafael Urdaneta", "San Blas", "San José", "Santa Rosa", "Negro Primero"]
    },
    "Puerto Cabello": {
      "Puerto Cabello": ["Borburata", "Fraternidad", "Goaigoaza", "Juan José Flores", "Patanemo", "San Esteban"]
    },
    "Guacara": {
      "Guacara": ["Ciudad Alianza", "Guacara", "Yagua"]
    },
    "San Diego": {
      "San Diego": ["San Diego"]
    },
    "Naguanagua": {
      "Naguanagua": ["Naguanagua"]
    },
    "Los Guayos": {
      "Los Guayos": ["Los Guayos"]
    }
  },
  "Aragua": {
    "Maracay": {
      "Girardot": ["Maracay", "Andrés Eloy Blanco", "Los Tacariguas", "San José"]
    },
    "Turmero": {
      "Mario Briceño Iragorry": ["Turmero", "Arevalo Aponte", "Chuao", "Samán de Güere"]
    },
    "La Victoria": {
      "José Félix Ribas": ["La Victoria", "Castor Nieves Ríos", "Las Guacamayas", "Pao de San Juan Bautista", "Zuata"]
    },
    "Cagua": {
      "Santiago Mariño": ["Cagua"]
    },
    "Villa de Cura": {
      "Zamora": ["Villa de Cura", "Magdaleno"]
    }
  },
  "Lara": {
    "Barquisimeto": {
      "Iribarren": ["Aguedo Felipe Alvarado", "Buena Vista", "Catedral", "Concepción", "El Cuji", "Juan de Villegas", "Santa Rosa", "Tamaca", "Unión"]
    },
    "Cabudare": {
      "Palavecino": ["Cabudare", "José Gregorio Bastidas", "Agua Viva"]
    },
    "Carora": {
      "Torres": ["Carora", "Cerritos Blancos", "Espinoza de los Monteros", "Lara", "Manuel Morillo", "Quebrada Honda", "Río Tocuyo", "San Miguel", "Tintorero", "Trinidad Samuel"]
    },
    "Quíbor": {
      "Jiménez": ["Quíbor", "Cuara", "Diego de Lozada", "Paraíso de San José", "San Miguel", "Tintorero", "José Bernardo Dorante", "Coronel Mariano Peraza"]
    }
  },
  "Anzoátegui": {
    "Barcelona": {
      "Bolívar": ["Barcelona", "El Carmen", "San Cristóbal", "Bergantin", "Caigua", "El Pilar", "Naricual"]
    },
    "Puerto La Cruz": {
      "Sotillo": ["Puerto La Cruz", "Pozuelos"]
    },
    "El Tigre": {
      "Simón Rodríguez": ["El Tigre", "Edmundo Barrios", "Miguel Otero Silva"]
    },
    "Anaco": {
      "Anaco": ["Anaco", "San Joaquín"]
    },
    "Cantaura": {
      "Freites": ["Cantaura", "Libertador", "Santa Rosa", "Urica"]
    }
  },
  "Bolívar": {
    "Ciudad Bolívar": {
      "Heres": ["Catedral", "Zea", "Vista Hermosa", "Marhuanta", "Agua Salada", "Sabanita", "Panapana", "José Antonio Páez", "Orinoco", "Yocoima", "5 de Julio"]
    },
    "Puerto Ordaz": {
      "Caroní": ["Unare", "Yocoima", "Simón Bolívar", "Vista al Sol", "Chirica", "Dalla Costa", "Once de Abril", "Universidad", "Cachamay", "Porvenir"]
    },
    "Ciudad Guayana": {
      "Caroní": ["Cachamay", "Chirica", "Dalla Costa", "Once de Abril", "Porvenir", "San Félix", "Simón Bolívar", "Unare", "Universidad", "Vista al Sol", "Yocoima"]
    },
    "Upata": {
      "Piar": ["Upata", "Andrés Eloy Blanco", "Pedro Cova"]
    }
  },
  "Táchira": {
    "San Cristóbal": {
      "San Cristóbal": ["San Cristóbal", "Francisco Romero Lobo", "La Concordia", "Pedro María Morantes", "San Juan Bautista"]
    },
    "Táriba": {
      "Cárdenas": ["Amenodoro Rangel Lamus", "La Florida", "Táriba"]
    },
    "Rubio": {
      "Junín": ["Rubio", "Bramon", "La Petrolea", "Palmira", "Quinimarí"]
    },
    "San Antonio del Táchira": {
      "Bolívar": ["San Antonio del Táchira", "Palotal", "Juan Vicente Gómez", "Isaías Medina Angarita"]
    }
  },
  "Mérida": {
    "Mérida": {
      "Libertador": ["Antonio Spinetti Dini", "Arias", "Caracciolo Parra Pérez", "Domingo Peña", "El Llano", "Gonzalo Picón Febres", "Jacinto Plaza", "Juan Rodríguez Suárez", "Lasso de la Vega", "Mariano Picón Salas", "Milla", "Osuna Rodríguez", "Sagrario"]
    },
    "Ejido": {
      "Campo Elías": ["Ejido", "Fernández Peña", "La Matriz", "Montalbán", "San Jacinto"]
    },
    "El Vigía": {
      "Alberto Adriani": ["El Vigía", "Presidente Betancourt", "Presidente Páez", "Presidente Rómulo Gallegos", "Gabriel Picón González", "Héctor Amable Mora", "José Nucete Sardi", "Pulido Méndez"]
    },
    "Tovar": {
      "Tovar": ["Tovar", "El Amparo", "Independencia"]
    }
  },
  "Trujillo": {
    "Valera": {
      "Valera": ["Valera", "Juan Ignacio Montilla", "La Beatriz", "La Puerta", "Mendoza del Valle de Momboy", "Mercedes Díaz", "San Luis"]
    },
    "Trujillo": {
      "Trujillo": ["Andrés Linares", "Chiquinquirá", "Cristóbal Mendoza", "Cruz Carrillo", "Matriz", "Monseñor Carrillo", "Tres Esquinas"]
    },
    "Boconó": {
      "Boconó": ["Boconó", "El Carmen", "Mosquey", "Ayacucho", "Burbusay", "General Ribas", "Guaramacal", "Vega de Guaramacal", "Monseñor Jáuregui", "Rafael Rangel", "San Miguel", "San José"]
    }
  },
  "Monagas": {
    "Maturín": {
      "Maturín": ["Alto de los Godos", "Boquerón", "Las Cocuizas", "La Pica", "San Simón", "El Corozo", "El Furrial", "Jusepín", "El Tejero", "Santa Cruz", "San Vicente"]
    },
    "Caripe": {
      "Caripe": ["Caripe", "Guanaguana", "La Guanota", "Sabana de Piedra", "San Agustín", "Teresén"]
    },
    "Caripito": {
      "Bolívar": ["Caripito"]
    }
  },
  "Sucre": {
    "Cumaná": {
      "Sucre": ["Altagracia", "Ayacucho", "Gran Mariscal", "San Fernando", "Santa Inés", "Valentín Valiente"]
    },
    "Carúpano": {
      "Bermúdez": ["Carúpano", "Bolívar", "Macarapana", "Santa Catalina", "Santa Rosa"]
    },
    "Araya": {
      "Cruz Salmerón Acosta": ["Araya", "Chacopata", "Manicuare"]
    }
  },
  "Portuguesa": {
    "Guanare": {
      "Guanare": ["Córdoba", "San José de la Montaña", "San Juan de Guanaguanare", "Virgen de Coromoto"]
    },
    "Acarigua": {
      "Páez": ["Acarigua", "Payara", "Pimpinela", "Ramón Peraza"]
    },
    "Araure": {
      "Araure": ["Araure", "Río Acarigua"]
    }
  },
  "Barinas": {
    "Barinas": {
      "Barinas": ["Alfredo Arvelo Larriva", "Alto Barinas", "Corazón de Jesús", "Dominga Ortiz de Páez", "El Carmen", "Juan Antonio Rodríguez Domínguez", "Las Palmas", "Manuel Palacio Fajardo", "Ramón Ignacio Méndez", "San Silvestre", "Santa Inés", "Santa Lucía", "Torunos"]
    },
    "Barinitas": {
      "Bolívar": ["Barinitas", "Altamira de Cáceres", "Calderas"]
    },
    "Santa Bárbara": {
      "Ezequiel Zamora": ["Santa Bárbara", "Pedro Briceño Méndez", "Ramón Ignacio Méndez", "José Ignacio del Pumar"]
    }
  },
  "Falcón": {
    "Coro": {
      "Miranda": ["Coro", "Guzmán Guillermo", "Sabaneta", "Macoruca", "San Antonio"]
    },
    "Punto Fijo": {
      "Carirubana": ["Punto Fijo", "Norte", "Carirubana", "Punta Cardón", "Santa Ana"]
    },
    "Tucacas": {
      "Silva": ["Tucacas", "Boca de Aroa"]
    }
  },
  "Guárico": {
    "San Juan de los Morros": {
      "Juan Germán Roscio": ["San Juan de los Morros", "Parapara"]
    },
    "Calabozo": {
      "Francisco de Miranda": ["Calabozo", "El Calvario", "El Rastro", "Guardatinajas"]
    },
    "Valle de la Pascua": {
      "Leonardo Infante": ["Valle de la Pascua", "Espino"]
    }
  },
  "Yaracuy": {
    "San Felipe": {
      "San Felipe": ["Albarico", "San Felipe", "San Javier"]
    },
    "Yaritagua": {
      "Peña": ["Yaritagua", "San Andrés"]
    },
    "Chivacoa": {
      "Bruzual": ["Chivacoa", "Campo Elías"]
    }
  },
  "Cojedes": {
    "San Carlos": {
      "San Carlos": ["Juan Ángel Bravo", "San Carlos de Austria"]
    },
    "Tinaquillo": {
      "Tinaco": ["Tinaquillo", "General Silva"]
    }
  },
  "Apure": {
    "San Fernando de Apure": {
      "San Fernando": ["El Recreo", "Peñalver", "San Fernando de Apure", "San Rafael de Atamaica"]
    },
    "Guasdualito": {
      "Páez": ["Guasdualito", "Aramendi", "El Amparo", "San Camilo", "Urdaneta"]
    }
  },
  "Nueva Esparta": {
    "Porlamar": {
      "Mariño": ["Porlamar"]
    },
    "La Asunción": {
      "Arismendi": ["La Asunción"]
    },
    "Juan Griego": {
      "Marcano": ["Juan Griego"]
    }
  },
  "Delta Amacuro": {
    "Tucupita": {
      "Tucupita": ["Tucupita", "San José", "Tabasca"]
    }
  },
  "Amazonas": {
    "Puerto Ayacucho": {
      "Atures": ["Fernando Girón Tovar", "Luis Alberto Gómez", "Parhueña", "Platanillal"]
    }
  },
  "Vargas": {
    "La Guaira": {
      "Vargas": ["Caraballeda", "Carayaca", "Carlos Soublette", "Caruao", "Catia La Mar", "El Junko", "La Guaira", "Macuto", "Maiquetía", "Naiguatá", "Raúl Leoni"]
    }
  }
};

export function CommerceInfoForm({ initialData, onSubmit, onBack }: CommerceInfoFormProps) {
  const [formData, setFormData] = useState<CommerceData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CommerceData, value: string | string[]) => {
    // Si cambia el estado, resetear ciudad, municipio y parroquia
    if (field === "estadoComercio") {
      setFormData({ ...formData, [field]: value as string, direccionCiudad: "", municipioComercio: "", parroquiaComercio: "" });
      const newErrors = { ...errors };
      delete newErrors[field];
      delete newErrors.direccionCiudad;
      delete newErrors.municipioComercio;
      delete newErrors.parroquiaComercio;
      setErrors(newErrors);
    }
    // Si cambia la ciudad, resetear municipio y parroquia
    else if (field === "direccionCiudad") {
      setFormData({ ...formData, [field]: value as string, municipioComercio: "", parroquiaComercio: "" });
      const newErrors = { ...errors };
      delete newErrors[field];
      delete newErrors.municipioComercio;
      delete newErrors.parroquiaComercio;
      setErrors(newErrors);
    }
    // Si cambia el municipio, resetear parroquia
    else if (field === "municipioComercio") {
      setFormData({ ...formData, [field]: value as string, parroquiaComercio: "" });
      const newErrors = { ...errors };
      delete newErrors[field];
      delete newErrors.parroquiaComercio;
      setErrors(newErrors);
    }
    // Código postal - solo 4 dígitos numéricos
    else if (field === "codigoPostal") {
      const numericValue = (value as string).replace(/[^0-9]/g, "").substring(0, 4);
      setFormData({ ...formData, [field]: numericValue });
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    else {
      setFormData({ ...formData, [field]: value });
      // Limpiar error del campo
      if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
      }
    }
  };

  const handleCheckboxChange = (value: string) => {
    const currentChannels = formData.canalesVenta || [];
    const newChannels = currentChannels.includes(value)
      ? currentChannels.filter((c) => c !== value)
      : [...currentChannels, value];
    handleChange("canalesVenta", newChannels);
  };

  const handlePaisesVentaChange = (value: string) => {
    const currentPaises = formData.paisesVenta || [];
    const newPaises = currentPaises.includes(value)
      ? currentPaises.filter((p) => p !== value)
      : [...currentPaises, value];
    setFormData({ ...formData, paisesVenta: newPaises });
    if (errors.paisesVenta) {
      const newErrors = { ...errors };
      delete newErrors.paisesVenta;
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Ubicación y Contacto Principal
    if (!formData.direccionCalle?.trim()) newErrors.direccionCalle = "Campo obligatorio";
    if (!formData.direccionCiudad?.trim()) newErrors.direccionCiudad = "Campo obligatorio";
    if (!formData.estadoComercio?.trim()) newErrors.estadoComercio = "Campo obligatorio";
    if (!formData.municipioComercio?.trim()) newErrors.municipioComercio = "Campo obligatorio";
    if (!formData.parroquiaComercio?.trim()) newErrors.parroquiaComercio = "Campo obligatorio";
    if (!formData.codigoPostal?.trim()) newErrors.codigoPostal = "Campo obligatorio";
    else if (formData.codigoPostal.length !== 4) newErrors.codigoPostal = "Debe tener 4 dígitos";
    if (!formData.telefonoComercio?.trim()) newErrors.telefonoComercio = "Campo obligatorio";
    if (!formData.emailAdministrativo?.trim()) newErrors.emailAdministrativo = "Campo obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAdministrativo)) {
      newErrors.emailAdministrativo = "Correo electrónico inválido";
    }

    // Presencia Digital
    if (formData.sitioWeb && !/^https?:\/\/.+/.test(formData.sitioWeb)) {
      newErrors.sitioWeb = "URL inválida (debe comenzar con http:// o https://)";
    }
    if (!formData.descripcionNegocio?.trim()) newErrors.descripcionNegocio = "Campo obligatorio";
    if (!formData.canalesVenta || formData.canalesVenta.length === 0) {
      newErrors.canalesVenta = "Selecciona al menos un canal de venta";
    }

    // Información Financiera
    if (!formData.actividadEconomica?.trim()) newErrors.actividadEconomica = "Campo obligatorio";
    if (!formData.fuenteIngresos?.trim()) newErrors.fuenteIngresos = "Campo obligatorio";
    if (!formData.volumenVentasMensual?.trim()) newErrors.volumenVentasMensual = "Campo obligatorio";
    // valorPromedioTransaccion ahora es opcional
    if (!formData.paisesVenta || formData.paisesVenta.length === 0) {
      newErrors.paisesVenta = "Selecciona al menos un país";
    }

    // Validar formato de redes sociales si están marcadas
    if (formData.redesSociales) {
      Object.entries(formData.redesSociales).forEach(([red, valor]) => {
        if (valor !== undefined && typeof valor === 'string') {
          const valorTrim = valor.trim();
          if (valorTrim.length > 0) {
            // Validar formato básico: alfanumérico, punto, guion bajo, sin espacios
            // Puede empezar con @ o no
            const formatoValido = /^@?[a-zA-Z0-9._-]+$/.test(valorTrim);
            if (!formatoValido) {
              newErrors[`redesSociales_${red}`] = "Formato inválido (solo letras, números, ., _, -)";
            } else if (valorTrim.length < 3) {
              newErrors[`redesSociales_${red}`] = "Mínimo 3 caracteres";
            }
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (
    label: string,
    field: keyof CommerceData,
    type: string = "text",
    required: boolean = true,
    placeholder: string = ""
  ) => (
    <div>
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={(formData[field] as string) || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        maxLength={field === "codigoPostal" ? 4 : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
          errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {errors[field] && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    field: keyof CommerceData,
    options: string[],
    required: boolean = true,
    placeholder: string = "Seleccione una opción"
  ) => (
    <div>
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <select
        value={(formData[field] as string) || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
          errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <option value="" className="text-gray-500 dark:text-gray-400">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
            {option}
          </option>
        ))}
      </select>
      {errors[field] && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderEstadoField = () => {
    const estados = Object.keys(UBICACIONES_VENEZUELA).sort();
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Estado <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={formData.estadoComercio as string || ""}
          onChange={(e) => handleChange("estadoComercio", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.estadoComercio ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
          }`}
        >
          <option value="" className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700">
            Seleccione un estado
          </option>
          {estados.map((estado) => (
            <option key={estado} value={estado} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
              {estado}
            </option>
          ))}
        </select>
        {errors.estadoComercio && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.estadoComercio}</p>
        )}
      </div>
    );
  };

  const renderCiudadField = () => {
    const estadoSeleccionado = formData.estadoComercio as string;
    const ciudadesDisponibles = estadoSeleccionado 
      ? Object.keys(UBICACIONES_VENEZUELA[estadoSeleccionado] || {}).sort()
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Ciudad <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={formData.direccionCiudad as string || ""}
          onChange={(e) => handleChange("direccionCiudad", e.target.value)}
          disabled={!estadoSeleccionado}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.direccionCiudad ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
          } ${!estadoSeleccionado ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-50" : ""}`}
        >
          <option value="" className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700">
            {estadoSeleccionado ? "Seleccione una ciudad" : "Primero seleccione un estado"}
          </option>
          {ciudadesDisponibles.map((ciudad) => (
            <option key={ciudad} value={ciudad} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
              {ciudad}
            </option>
          ))}
        </select>
        {errors.direccionCiudad && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.direccionCiudad}</p>
        )}
      </div>
    );
  };

  const renderMunicipioField = () => {
    const estadoSeleccionado = formData.estadoComercio as string;
    const ciudadSeleccionada = formData.direccionCiudad as string;
    const municipiosDisponibles = (estadoSeleccionado && ciudadSeleccionada)
      ? Object.keys(UBICACIONES_VENEZUELA[estadoSeleccionado]?.[ciudadSeleccionada] || {}).sort()
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Municipio <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={formData.municipioComercio as string || ""}
          onChange={(e) => handleChange("municipioComercio", e.target.value)}
          disabled={!ciudadSeleccionada}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.municipioComercio ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
          } ${!ciudadSeleccionada ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-50" : ""}`}
        >
          <option value="" className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700">
            {ciudadSeleccionada ? "Seleccione un municipio" : "Primero seleccione una ciudad"}
          </option>
          {municipiosDisponibles.map((municipio) => (
            <option key={municipio} value={municipio} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
              {municipio}
            </option>
          ))}
        </select>
        {errors.municipioComercio && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.municipioComercio}</p>
        )}
      </div>
    );
  };

  const renderParroquiaField = () => {
    const estadoSeleccionado = formData.estadoComercio as string;
    const ciudadSeleccionada = formData.direccionCiudad as string;
    const municipioSeleccionado = formData.municipioComercio as string;
    const parroquiasDisponibles = (estadoSeleccionado && ciudadSeleccionada && municipioSeleccionado)
      ? UBICACIONES_VENEZUELA[estadoSeleccionado]?.[ciudadSeleccionada]?.[municipioSeleccionado] || []
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Parroquia <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={formData.parroquiaComercio as string || ""}
          onChange={(e) => handleChange("parroquiaComercio", e.target.value)}
          disabled={!municipioSeleccionado}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.parroquiaComercio ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
          } ${!municipioSeleccionado ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-50" : ""}`}
        >
          <option value="" className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700">
            {municipioSeleccionado ? "Seleccione una parroquia" : "Primero seleccione un municipio"}
          </option>
          {parroquiasDisponibles.map((parroquia) => (
            <option key={parroquia} value={parroquia} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
              {parroquia}
            </option>
          ))}
        </select>
        {errors.parroquiaComercio && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.parroquiaComercio}</p>
        )}
      </div>
    );
  };

  const renderPhoneField = (
    label: string,
    field: keyof CommerceData,
    required: boolean = true
  ) => {
    // Códigos de área de Venezuela
    const codigosArea = [
      "0412", "0414", "0424", "0416", "0426",
      "0212", "0241", "0243", "0244", "0245",
      "0246", "0247", "0248", "0249", "0251",
      "0252", "0253", "0254", "0255", "0256",
      "0257", "0258", "0259", "0261", "0262",
      "0263", "0264", "0265", "0266", "0267",
      "0268", "0269", "0271", "0272", "0273",
      "0274", "0275", "0276", "0277", "0278",
      "0279", "0281", "0282", "0283", "0284",
      "0285", "0286", "0287", "0288", "0289",
      "0291", "0292", "0293", "0294", "0295"
    ];

    const value = (formData[field] as string) || "";
    // Extraer código de área (primeros 4 dígitos) y el resto del número
    const currentCode = value.substring(0, 4) || "0412";
    const currentNumber = value.substring(4);

    const handleCodeChange = (code: string) => {
      handleChange(field, `${code}${currentNumber}`);
    };

    const handleNumberChange = (number: string) => {
      const cleanNumber = number.replace(/[^0-9]/g, "").substring(0, 7); // Máximo 7 dígitos
      handleChange(field, `${currentCode}${cleanNumber}`);
    };

    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
        </label>
        <div className="flex gap-2">
          <select
            value={currentCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {codigosArea.map((codigo) => (
              <option key={codigo} value={codigo} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                {codigo}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={currentNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder="1234567"
            maxLength={7}
            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
              errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
            }`}
          />
        </div>
        {errors[field] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">
          Formato: {currentCode}-{currentNumber || "XXXXXXX"}
        </p>
      </div>
    );
  };

  const actividadesEconomicas = [
    "Agricultura y ganadería",
    "Alimentos y bebidas",
    "Arte y cultura",
    "Artesanía",
    "Automotriz",
    "Belleza y cuidado personal",
    "Bienes raíces e inmobiliaria",
    "Comunicaciones y medios",
    "Construcción",
    "Consultoría y asesoría",
    "Deportes y recreación",
    "Educación y formación",
    "Energía y servicios públicos",
    "Entretenimiento",
    "Fabricación y manufactura",
    "Finanzas y seguros",
    "Hotelería y turismo",
    "Importación y exportación",
    "Ingeniería",
    "Joyería y accesorios",
    "Logística y transporte",
    "Moda y textiles",
    "Muebles y decoración",
    "Publicidad y marketing",
    "Recursos humanos",
    "Restaurantes y gastronomía",
    "Salud y medicina",
    "Seguridad",
    "Servicios financieros",
    "Servicios legales",
    "Servicios profesionales",
    "Tecnología e informática",
    "Telecomunicaciones",
    "Tienda minorista (retail)",
    "Venta al por mayor",
    "Veterinaria y cuidado animal",
    "Otra actividad",
  ];

  const paises = [
    "Venezuela",
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "México",
    "Perú",
    "Uruguay",
    "Paraguay",
    "Bolivia",
    "Costa Rica",
    "Panamá",
    "Guatemala",
    "Honduras",
    "El Salvador",
    "Nicaragua",
    "República Dominicana",
    "Cuba",
    "Puerto Rico",
    "Estados Unidos",
    "Canadá",
    "España",
    "Otro",
  ];

  const volumenVentas = [
    "< $1,000 USD",
    "$1,000 - $5,000 USD",
    "$5,000 - $10,000 USD",
    "$10,000 - $50,000 USD",
    "$50,000 - $100,000 USD",
    "$100,000 - $500,000 USD",
    "$500,000 - $1,000,000 USD",
    "> $1,000,000 USD",
  ];

  const canalesVentaOptions = [
    { value: "tienda_fisica", label: "Tienda Física" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "redes_sociales", label: "Redes Sociales / Instagram Shopping" },
    { value: "marketplace", label: "Marketplace (Amazon, MercadoLibre, etc.)" },
    { value: "pos_movil", label: "Terminal POS Móvil" },
  ];

  const fuentesIngresos = [
    "Empresa propia",
    "Sueldos y salarios",
    "Alquiler o venta de bienes",
    "Actividad profesional",
    "Economía informal",
    "Remesas",
    "Servicios de transporte público o privado",
    "Servicios financieros",
    "Pensión o jubilación",
    "Retiro de otros bancos",
    "Rifas, loterías y otros sorteos",
    "Servicios profesionales",
    "Transacciones con criptomonedas",
    "Fondos propios",
    "Prestación de servicios",
    "Inversiones comercio electrónico",
    "Representante",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center mb-6 text-gray-900 dark:text-white transition-colors">Información del Comercio 🏪</h2>

      <div className="space-y-6 mb-6">
        {/* Ubicación y Contacto Principal */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-blue-900 dark:text-blue-300">Ubicación y Contacto Principal</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
            Datos para contacto administrativo y ubicación legal
          </p>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Calle/Avenida", "direccionCalle", "text", true, "Av. Principal")}
              {renderField("Número", "direccionNumero", "text", false, "123-A")}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {renderEstadoField()}
              {renderCiudadField()}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {renderMunicipioField()}
              {renderParroquiaField()}
            </div>

            {renderField("Código Postal (4 dígitos)", "codigoPostal", "text", true, "1234")}

            <div className="grid md:grid-cols-2 gap-4">
              {renderPhoneField("Teléfono Fijo / Móvil del Comercio", "telefonoComercio")}
              {renderField("Email Administrativo", "emailAdministrativo", "email", true, "admin@comercio.com")}
            </div>
          </div>
        </div>

        {/* Presencia Digital y Canales de Venta */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-green-900 dark:text-green-300">Presencia Digital y Canales de Venta</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
            Información sobre cómo el comercio interactúa con sus clientes
          </p>

          <div className="space-y-4">
            {renderField("Sitio Web Principal (URL)", "sitioWeb", "url", false, "https://www.ejemplo.com")}

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Descripción Breve del Negocio <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <textarea
                value={formData.descripcionNegocio || ""}
                onChange={(e) => handleChange("descripcionNegocio", e.target.value)}
                rows={3}
                placeholder="Ej: Venta minorista de equipos electrónicos y gadgets"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.descripcionNegocio ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.descripcionNegocio && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.descripcionNegocio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                Canales de Venta <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="space-y-2">
                {canalesVentaOptions.map((canal) => (
                  <div key={canal.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={canal.value}
                      checked={formData.canalesVenta?.includes(canal.value) || false}
                      onChange={() => handleCheckboxChange(canal.value)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={canal.value} className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer transition-colors">
                      {canal.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.canalesVenta && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.canalesVenta}</p>
              )}
            </div>

            {/* Redes Sociales */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                Redes Sociales Relevantes
              </label>
              
              {/* Checkbox para "No usa redes sociales" */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.noUsaRedesSociales || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData({
                        ...formData,
                        noUsaRedesSociales: checked,
                        redesSociales: checked ? {} : formData.redesSociales
                      });
                    }}
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No usa redes sociales</span>
                </label>
              </div>

              {/* Lista de redes sociales */}
              {!formData.noUsaRedesSociales && (
                <div className="space-y-3">
                  {[
                    { key: 'facebook', label: 'Facebook', icon: '📘', placeholder: 'usuario o @usuario' },
                    { key: 'instagram', label: 'Instagram', icon: '📷', placeholder: '@usuario' },
                    { key: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: '@usuario' },
                    { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'usuario o empresa' },
                    { key: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: '@usuario' },
                    { key: 'youtube', label: 'YouTube', icon: '📺', placeholder: '@canal o nombre del canal' }
                  ].map((red) => (
                    <div key={red.key} className="flex items-center gap-3">
                      <label className="flex items-center gap-2 min-w-[140px]">
                        <input
                          type="checkbox"
                          checked={!!(formData.redesSociales?.[red.key as keyof typeof formData.redesSociales])}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData({
                              ...formData,
                              redesSociales: {
                                ...formData.redesSociales,
                                [red.key]: checked ? '' : undefined
                              }
                            });
                          }}
                          className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{red.icon} {red.label}</span>
                      </label>
                      
                      {formData.redesSociales?.[red.key as keyof typeof formData.redesSociales] !== undefined && (
                        <div className="flex-1">
                          <input
                            type="text"
                            value={formData.redesSociales?.[red.key as keyof typeof formData.redesSociales] || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData({
                                ...formData,
                                redesSociales: {
                                  ...formData.redesSociales,
                                  [red.key]: value
                                }
                              });
                              // Limpiar error al escribir
                              if (errors[`redesSociales_${red.key}`]) {
                                const newErrors = { ...errors };
                                delete newErrors[`redesSociales_${red.key}`];
                                setErrors(newErrors);
                              }
                            }}
                            placeholder={red.placeholder}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                              errors[`redesSociales_${red.key}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors[`redesSociales_${red.key}`] && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors[`redesSociales_${red.key}`]}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información Financiera y Transaccional */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-purple-900 dark:text-purple-300">Información Financiera y Transaccional</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
            Datos para configuración de límites y monitoreo
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Actividad Económica <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={formData.actividadEconomica || ""}
                onChange={(e) => handleChange("actividadEconomica", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.actividadEconomica ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Seleccione una actividad económica</option>
                {actividadesEconomicas.map((actividad) => (
                  <option key={actividad} value={actividad} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                    {actividad}
                  </option>
                ))}
              </select>
              {errors.actividadEconomica && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.actividadEconomica}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Fuente de Ingresos <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={formData.fuenteIngresos || ""}
                onChange={(e) => handleChange("fuenteIngresos", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.fuenteIngresos ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Seleccione una opción</option>
                {fuentesIngresos.map((fuente) => (
                  <option key={fuente} value={fuente} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                    {fuente}
                  </option>
                ))}
              </select>
              {errors.fuenteIngresos && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.fuenteIngresos}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Volumen de Ventas Mensual <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={formData.volumenVentasMensual || ""}
                onChange={(e) => handleChange("volumenVentasMensual", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.volumenVentasMensual ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Seleccione un rango</option>
                {volumenVentas.map((volumen) => (
                  <option key={volumen} value={volumen} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                    {volumen}
                  </option>
                ))}
              </select>
              {errors.volumenVentasMensual && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.volumenVentasMensual}</p>
              )}
            </div>

            {renderField(
              "Valor Promedio de la Transacción",
              "valorPromedioTransaccion",
              "text",
              false,
              "Ej: $50 USD"
            )}

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Países a los que Vende / Dirige su Servicio <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 transition-colors">Seleccione todos los países que apliquen</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors">
                {paises.map((pais) => (
                  <label key={pais} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={(formData.paisesVenta || []).includes(pais)}
                      onChange={() => handlePaisesVentaChange(pais)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-900 dark:text-gray-300 transition-colors">{pais}</span>
                  </label>
                ))}
              </div>
              {errors.paisesVenta && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.paisesVenta}</p>
              )}
              {formData.paisesVenta && formData.paisesVenta.length > 0 && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 transition-colors">
                  Seleccionados: {formData.paisesVenta.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
