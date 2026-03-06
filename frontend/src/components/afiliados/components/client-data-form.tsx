import { useState } from "react";
import type { ClientType, ClientData, WelcomeData } from "./subscription-wizard";
import { ArrowLeft, ArrowRight, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

interface ClientDataFormProps {
  clientType: ClientType;
  initialData: ClientData;
  welcomeData?: WelcomeData | null;
  onSubmit: (data: ClientData) => void;
  onBack: () => void;
}



// Estructura completa: Estado -> Ciudad -> Municipio -> Parroquias
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

// Profesiones y Ocupaciones comunes
const PROFESIONES_OCUPACIONES = [
  "Abogado/a",
  "Administrador/a",
  "Agricultor/a",
  "Analista de Sistemas",
  "Arquitecto/a",
  "Artista",
  "Asesor/a",
  "Asistente Administrativo/a",
  "Chef / Cocinero/a",
  "Comerciante",
  "Comunicador/a Social",
  "Contador/a",
  "Consultor/a",
  "Dentista",
  "Diseñador/a Gráfico/a",
  "Docente / Profesor/a",
  "Economista",
  "Electricista",
  "Empleado/a",
  "Emprendedor/a",
  "Enfermero/a",
  "Estudiante",
  "Farmacéutico/a",
  "Fisioterapeuta",
  "Funcionario/a Público/a",
  "Gerente",
  "Ingeniero/a Civil",
  "Ingeniero/a de Sistemas",
  "Ingeniero/a Eléctrico/a",
  "Ingeniero/a Industrial",
  "Ingeniero/a Mecánico/a",
  "Ingeniero/a Petrolero/a",
  "Mecánico/a",
  "Médico/a",
  "Nutricionista",
  "Obrero/a",
  "Odontólogo/a",
  "Oficios del Hogar",
  "Operador/a",
  "Periodista",
  "Plomero/a",
  "Psicólogo/a",
  "Publicista",
  "Técnico/a",
  "Trabajador/a Independiente",
  "Trabajador/a Social",
  "Vendedor/a",
  "Veterinario/a",
  "Otros"
];

export function ClientDataForm({ clientType, initialData, welcomeData, onSubmit, onBack }: ClientDataFormProps) {
  // Prellenar datos de welcomeData si existen
  const initialFormData = {
    ...initialData,
    // Prellenar según el tipo de cliente
    ...(clientType === "natural" && welcomeData && {
      nombres: initialData.nombres || welcomeData.nombres,
      apellidos: initialData.apellidos || welcomeData.apellidos,
      documentoIdentidad: initialData.documentoIdentidad || `${welcomeData.tipoDocumento}-${welcomeData.numeroDocumento}`,
      correoElectronico: initialData.correoElectronico || welcomeData.correoElectronico,
      telefonoMovil: initialData.telefonoMovil || `${welcomeData.codigoPaisTelefono} ${welcomeData.codigoAreaTelefono}-${welcomeData.telefonoMovil}`,
    }),
    ...(clientType === "juridica" && welcomeData && {
      razonSocial: initialData.razonSocial || welcomeData.nombres,
      rifNit: initialData.rifNit || `${welcomeData.tipoDocumento}-${welcomeData.numeroDocumento}`,
      correoCorporativo: initialData.correoCorporativo || welcomeData.correoElectronico,
      telefonoFijo: initialData.telefonoFijo || `${welcomeData.codigoPaisTelefono} ${welcomeData.codigoAreaTelefono}-${welcomeData.telefonoMovil}`,
    }),
    ...(clientType === "firma_personal" && welcomeData && {
      nombreFirma: initialData.nombreFirma || welcomeData.nombres,
      nombreTitular: initialData.nombreTitular || welcomeData.apellidos,
      rifFirma: initialData.rifFirma || `${welcomeData.tipoDocumento}-${welcomeData.numeroDocumento}`,
      correoFirma: initialData.correoFirma || welcomeData.correoElectronico,
      telefonoFirma: initialData.telefonoFirma || `${welcomeData.codigoPaisTelefono} ${welcomeData.codigoAreaTelefono}-${welcomeData.telefonoMovil}`,
    }),
    ...(clientType === "ente_gubernamental" && welcomeData && {
      nombreInstitucion: initialData.nombreInstitucion || welcomeData.nombres,
      rifNitGob: initialData.rifNitGob || `${welcomeData.tipoDocumento}-${welcomeData.numeroDocumento}`,
      correoContacto: initialData.correoContacto || welcomeData.correoElectronico,
      telefonoContacto: initialData.telefonoContacto || `${welcomeData.codigoPaisTelefono} ${welcomeData.codigoAreaTelefono}-${welcomeData.telefonoMovil}`,
    }),
    ...(clientType === "emprendedor" && welcomeData && {
      nombresEmprendedor: initialData.nombresEmprendedor || welcomeData.nombres,
      apellidosEmprendedor: initialData.apellidosEmprendedor || welcomeData.apellidos,
      cedulaEmprendedor: initialData.cedulaEmprendedor || `${welcomeData.tipoDocumento}-${welcomeData.numeroDocumento}`,
      correoEmprendedor: initialData.correoEmprendedor || welcomeData.correoElectronico,
      telefonoEmprendedor: initialData.telefonoEmprendedor || `${welcomeData.codigoPaisTelefono} ${welcomeData.codigoAreaTelefono}-${welcomeData.telefonoMovil}`,
    }),
  };

  const [formData, setFormData] = useState<ClientData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Función para calcular la fortaleza de la contraseña
  const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    
    // Longitud
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    
    // Mayúsculas
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Minúsculas
    if (/[a-z]/.test(password)) strength += 20;
    
    // Números
    if (/[0-9]/.test(password)) strength += 20;
    
    // Caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    let label = "";
    let color = "";
    
    if (strength < 40) {
      label = "Débil";
      color = "bg-red-500";
    } else if (strength < 70) {
      label = "Media";
      color = "bg-yellow-500";
    } else {
      label = "Fuerte";
      color = "bg-green-500";
    }

    return { strength, label, color };
  };

  const passwordStrength = calculatePasswordStrength(formData.contrasena || "");

  const handleChange = (field: keyof ClientData, value: string) => {
    const newErrors = { ...errors };
    delete newErrors[field];

    // Persona Natural
    if (field === "estado") {
      setFormData({ ...formData, [field]: value, ciudad: "", municipio: "", parroquia: "" });
      delete newErrors.ciudad;
      delete newErrors.municipio;
      delete newErrors.parroquia;
    } else if (field === "ciudad") {
      setFormData({ ...formData, [field]: value, municipio: "", parroquia: "" });
      delete newErrors.municipio;
      delete newErrors.parroquia;
    } else if (field === "municipio") {
      setFormData({ ...formData, [field]: value, parroquia: "" });
      delete newErrors.parroquia;
    }
    // Persona Jurídica
    else if (field === "estadoJuridica") {
      setFormData({ ...formData, [field]: value, ciudadJuridica: "", municipioJuridica: "", parroquiaJuridica: "" });
      delete newErrors.ciudadJuridica;
      delete newErrors.municipioJuridica;
      delete newErrors.parroquiaJuridica;
    } else if (field === "ciudadJuridica") {
      setFormData({ ...formData, [field]: value, municipioJuridica: "", parroquiaJuridica: "" });
      delete newErrors.municipioJuridica;
      delete newErrors.parroquiaJuridica;
    } else if (field === "municipioJuridica") {
      setFormData({ ...formData, [field]: value, parroquiaJuridica: "" });
      delete newErrors.parroquiaJuridica;
    }
    // Firma Personal
    else if (field === "estadoFirma") {
      setFormData({ ...formData, [field]: value, ciudadFirma: "", municipioFirma: "", parroquiaFirma: "" });
      delete newErrors.ciudadFirma;
      delete newErrors.municipioFirma;
      delete newErrors.parroquiaFirma;
    } else if (field === "ciudadFirma") {
      setFormData({ ...formData, [field]: value, municipioFirma: "", parroquiaFirma: "" });
      delete newErrors.municipioFirma;
      delete newErrors.parroquiaFirma;
    } else if (field === "municipioFirma") {
      setFormData({ ...formData, [field]: value, parroquiaFirma: "" });
      delete newErrors.parroquiaFirma;
    }
    // Emprendedor
    else if (field === "estadoEmprendedor") {
      setFormData({ ...formData, [field]: value, ciudadEmprendedor: "", municipioEmprendedor: "", parroquiaEmprendedor: "" });
      delete newErrors.ciudadEmprendedor;
      delete newErrors.municipioEmprendedor;
      delete newErrors.parroquiaEmprendedor;
    } else if (field === "ciudadEmprendedor") {
      setFormData({ ...formData, [field]: value, municipioEmprendedor: "", parroquiaEmprendedor: "" });
      delete newErrors.municipioEmprendedor;
      delete newErrors.parroquiaEmprendedor;
    } else if (field === "municipioEmprendedor") {
      setFormData({ ...formData, [field]: value, parroquiaEmprendedor: "" });
      delete newErrors.parroquiaEmprendedor;
    }
    // Código postal - solo 4 dígitos numéricos
    else if (field.includes("codigoPostal")) {
      const numericValue = value.replace(/[^0-9]/g, "").substring(0, 4);
      setFormData({ ...formData, [field]: numericValue });
    } else {
      setFormData({ ...formData, [field]: value });
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombre de usuario (común para todos)
    if (!formData.nombreUsuario?.trim()) {
      newErrors.nombreUsuario = "Campo obligatorio";
    } else if (formData.nombreUsuario.length < 4) {
      newErrors.nombreUsuario = "Mínimo 4 caracteres";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.nombreUsuario)) {
      newErrors.nombreUsuario = "Solo letras, números y guión bajo";
    }

    // Validar contraseña (común para todos)
    if (!formData.contrasena?.trim()) {
      newErrors.contrasena = "Campo obligatorio";
    } else if (formData.contrasena.length < 8) {
      newErrors.contrasena = "Mínimo 8 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.contrasena)) {
      newErrors.contrasena = "Debe contener mayúsculas, minúsculas y números";
    }

    // Validar confirmación de contraseña
    if (!formData.confirmarContrasena?.trim()) {
      newErrors.confirmarContrasena = "Campo obligatorio";
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }

    if (clientType === "natural") {
      if (!formData.nombres?.trim()) newErrors.nombres = "Campo obligatorio";
      if (!formData.apellidos?.trim()) newErrors.apellidos = "Campo obligatorio";
      if (!formData.documentoIdentidad?.trim()) newErrors.documentoIdentidad = "Campo obligatorio";
      if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Campo obligatorio";
      if (!formData.genero?.trim()) newErrors.genero = "Campo obligatorio";
      if (!formData.profesionOcupacion?.trim()) newErrors.profesionOcupacion = "Campo obligatorio";
      if (!formData.direccionPrincipal?.trim()) newErrors.direccionPrincipal = "Campo obligatorio";
      if (!formData.estado?.trim()) newErrors.estado = "Campo obligatorio";
      if (!formData.ciudad?.trim()) newErrors.ciudad = "Campo obligatorio";
      if (!formData.municipio?.trim()) newErrors.municipio = "Campo obligatorio";
      if (!formData.parroquia?.trim()) newErrors.parroquia = "Campo obligatorio";
      if (!formData.codigoPostal?.trim()) newErrors.codigoPostal = "Campo obligatorio";
      else if (formData.codigoPostal.length !== 4) newErrors.codigoPostal = "Debe tener 4 dígitos";
      if (!formData.correoElectronico?.trim()) newErrors.correoElectronico = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoElectronico)) {
        newErrors.correoElectronico = "Correo electrónico inválido";
      }
      if (!formData.telefonoMovil?.trim()) newErrors.telefonoMovil = "Campo obligatorio";
    } else if (clientType === "juridica") {
      if (!formData.razonSocial?.trim()) newErrors.razonSocial = "Campo obligatorio";
      if (!formData.rifNit?.trim()) newErrors.rifNit = "Campo obligatorio";
      if (!formData.domicilioFiscal?.trim()) newErrors.domicilioFiscal = "Campo obligatorio";
      if (!formData.estadoJuridica?.trim()) newErrors.estadoJuridica = "Campo obligatorio";
      if (!formData.ciudadJuridica?.trim()) newErrors.ciudadJuridica = "Campo obligatorio";
      if (!formData.municipioJuridica?.trim()) newErrors.municipioJuridica = "Campo obligatorio";
      if (!formData.parroquiaJuridica?.trim()) newErrors.parroquiaJuridica = "Campo obligatorio";
      if (!formData.codigoPostalJuridica?.trim()) newErrors.codigoPostalJuridica = "Campo obligatorio";
      else if (formData.codigoPostalJuridica.length !== 4) newErrors.codigoPostalJuridica = "Debe tener 4 dígitos";
      if (!formData.nombresRepresentante?.trim()) newErrors.nombresRepresentante = "Campo obligatorio";
      if (!formData.apellidosRepresentante?.trim()) newErrors.apellidosRepresentante = "Campo obligatorio";
      if (!formData.documentoRepresentante?.trim()) newErrors.documentoRepresentante = "Campo obligatorio";
      if (!formData.correoCorporativo?.trim()) newErrors.correoCorporativo = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoCorporativo)) {
        newErrors.correoCorporativo = "Correo electrónico inválido";
      }
      if (!formData.telefonoFijo?.trim()) newErrors.telefonoFijo = "Campo obligatorio";
    } else if (clientType === "firma_personal") {
      if (!formData.nombreFirma?.trim()) newErrors.nombreFirma = "Campo obligatorio";
      if (!formData.rifFirma?.trim()) newErrors.rifFirma = "Campo obligatorio";
      if (!formData.nombreTitular?.trim()) newErrors.nombreTitular = "Campo obligatorio";
      if (!formData.cedulaTitular?.trim()) newErrors.cedulaTitular = "Campo obligatorio";
      if (!formData.direccionFiscalFirma?.trim()) newErrors.direccionFiscalFirma = "Campo obligatorio";
      if (!formData.estadoFirma?.trim()) newErrors.estadoFirma = "Campo obligatorio";
      if (!formData.ciudadFirma?.trim()) newErrors.ciudadFirma = "Campo obligatorio";
      if (!formData.municipioFirma?.trim()) newErrors.municipioFirma = "Campo obligatorio";
      if (!formData.parroquiaFirma?.trim()) newErrors.parroquiaFirma = "Campo obligatorio";
      if (!formData.codigoPostalFirma?.trim()) newErrors.codigoPostalFirma = "Campo obligatorio";
      else if (formData.codigoPostalFirma.length !== 4) newErrors.codigoPostalFirma = "Debe tener 4 dígitos";
      if (!formData.correoFirma?.trim()) newErrors.correoFirma = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoFirma)) {
        newErrors.correoFirma = "Correo electrónico inválido";
      }
      if (!formData.telefonoFirma?.trim()) newErrors.telefonoFirma = "Campo obligatorio";
      if (!formData.actividadComercial?.trim()) newErrors.actividadComercial = "Campo obligatorio";
    } else if (clientType === "ente_gubernamental") {
      if (!formData.nombreInstitucion?.trim()) newErrors.nombreInstitucion = "Campo obligatorio";
      if (!formData.rifNitGob?.trim()) newErrors.rifNitGob = "Campo obligatorio";
      if (!formData.direccionAdministrativa?.trim()) newErrors.direccionAdministrativa = "Campo obligatorio";
      if (!formData.nombreContacto?.trim()) newErrors.nombreContacto = "Campo obligatorio";
      if (!formData.cargoContacto?.trim()) newErrors.cargoContacto = "Campo obligatorio";
      if (!formData.correoContacto?.trim()) newErrors.correoContacto = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoContacto)) {
        newErrors.correoContacto = "Correo electrónico inválido";
      }
      if (!formData.telefonoContacto?.trim()) newErrors.telefonoContacto = "Campo obligatorio";
      if (!formData.referenciaContrato?.trim()) newErrors.referenciaContrato = "Campo obligatorio";
    } else if (clientType === "emprendedor") {
      if (!formData.nombresEmprendedor?.trim()) newErrors.nombresEmprendedor = "Campo obligatorio";
      if (!formData.apellidosEmprendedor?.trim()) newErrors.apellidosEmprendedor = "Campo obligatorio";
      if (!formData.cedulaEmprendedor?.trim()) newErrors.cedulaEmprendedor = "Campo obligatorio";
      if (!formData.nombreProyecto?.trim()) newErrors.nombreProyecto = "Campo obligatorio";
      if (!formData.areaProyecto?.trim()) newErrors.areaProyecto = "Campo obligatorio";
      if (!formData.direccionEmprendedor?.trim()) newErrors.direccionEmprendedor = "Campo obligatorio";
      if (!formData.estadoEmprendedor?.trim()) newErrors.estadoEmprendedor = "Campo obligatorio";
      if (!formData.ciudadEmprendedor?.trim()) newErrors.ciudadEmprendedor = "Campo obligatorio";
      if (!formData.municipioEmprendedor?.trim()) newErrors.municipioEmprendedor = "Campo obligatorio";
      if (!formData.parroquiaEmprendedor?.trim()) newErrors.parroquiaEmprendedor = "Campo obligatorio";
      if (!formData.codigoPostalEmprendedor?.trim()) newErrors.codigoPostalEmprendedor = "Campo obligatorio";
      else if (formData.codigoPostalEmprendedor.length !== 4) newErrors.codigoPostalEmprendedor = "Debe tener 4 dígitos";
      if (!formData.correoEmprendedor?.trim()) newErrors.correoEmprendedor = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoEmprendedor)) {
        newErrors.correoEmprendedor = "Correo electrónico inválido";
      }
      if (!formData.telefonoEmprendedor?.trim()) newErrors.telefonoEmprendedor = "Campo obligatorio";
      if (!formData.descripcionProyecto?.trim()) newErrors.descripcionProyecto = "Campo obligatorio";
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
    field: keyof ClientData,
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
        maxLength={field.includes("codigoPostal") ? 4 : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
          errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {errors[field] && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderPasswordField = (
    label: string,
    field: keyof ClientData,
    showStrength: boolean = false
  ) => (
    <div>
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        {label} <span className="text-red-500 dark:text-red-400">*</span>
      </label>
      <input
        type="password"
        value={(formData[field] as string) || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder="Mínimo 8 caracteres"
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
          errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {showStrength && formData[field] && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[50px]">
              {passwordStrength.label}
            </span>
          </div>
        </div>
      )}
      {errors[field] && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    field: keyof ClientData,
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

  // Renderizar campos de ubicación según el tipo de cliente
  const renderEstadoField = (estadoField: keyof ClientData) => {
    const estados = Object.keys(UBICACIONES_VENEZUELA).sort();
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Estado <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={(formData[estadoField] as string) || ""}
          onChange={(e) => handleChange(estadoField, e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors[estadoField] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
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
        {errors[estadoField] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[estadoField]}</p>
        )}
      </div>
    );
  };

  const renderCiudadField = (estadoField: keyof ClientData, ciudadField: keyof ClientData) => {
    const estadoSeleccionado = formData[estadoField] as string;
    const ciudadesDisponibles = estadoSeleccionado 
      ? Object.keys(UBICACIONES_VENEZUELA[estadoSeleccionado] || {}).sort()
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Ciudad <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={(formData[ciudadField] as string) || ""}
          onChange={(e) => handleChange(ciudadField, e.target.value)}
          disabled={!estadoSeleccionado}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors[ciudadField] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
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
        {errors[ciudadField] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[ciudadField]}</p>
        )}
      </div>
    );
  };

  const renderMunicipioField = (estadoField: keyof ClientData, ciudadField: keyof ClientData, municipioField: keyof ClientData) => {
    const estadoSeleccionado = formData[estadoField] as string;
    const ciudadSeleccionada = formData[ciudadField] as string;
    const municipiosDisponibles = (estadoSeleccionado && ciudadSeleccionada)
      ? Object.keys(UBICACIONES_VENEZUELA[estadoSeleccionado]?.[ciudadSeleccionada] || {}).sort()
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Municipio <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={(formData[municipioField] as string) || ""}
          onChange={(e) => handleChange(municipioField, e.target.value)}
          disabled={!ciudadSeleccionada}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors[municipioField] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
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
        {errors[municipioField] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[municipioField]}</p>
        )}
      </div>
    );
  };

  const renderParroquiaField = (estadoField: keyof ClientData, ciudadField: keyof ClientData, municipioField: keyof ClientData, parroquiaField: keyof ClientData) => {
    const estadoSeleccionado = formData[estadoField] as string;
    const ciudadSeleccionada = formData[ciudadField] as string;
    const municipioSeleccionado = formData[municipioField] as string;
    const parroquiasDisponibles = (estadoSeleccionado && ciudadSeleccionada && municipioSeleccionado)
      ? UBICACIONES_VENEZUELA[estadoSeleccionado]?.[ciudadSeleccionada]?.[municipioSeleccionado] || []
      : [];
    
    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          Parroquia <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <select
          value={(formData[parroquiaField] as string) || ""}
          onChange={(e) => handleChange(parroquiaField, e.target.value)}
          disabled={!municipioSeleccionado}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors[parroquiaField] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
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
        {errors[parroquiaField] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[parroquiaField]}</p>
        )}
      </div>
    );
  };

  const renderDocumentField = (
    label: string,
    field: keyof ClientData,
    prefixOptions: string[]
  ) => {
    const value = (formData[field] as string) || "";
    const currentPrefix = value.match(/^[VEJPG]/)?.[0] || prefixOptions[0];
    const currentNumber = value.replace(/^[VEJPG]/, "");

    const handlePrefixChange = (prefix: string) => {
      handleChange(field, `${prefix}${currentNumber}`);
    };

    const handleNumberChange = (number: string) => {
      const cleanNumber = number.replace(/[^0-9]/g, "");
      handleChange(field, `${currentPrefix}${cleanNumber}`);
    };

    return (
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          {label} <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          <select
            value={currentPrefix}
            onChange={(e) => handlePrefixChange(e.target.value)}
            className="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {prefixOptions.map((prefix) => (
              <option key={prefix} value={prefix} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                {prefix}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={currentNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder="12345678"
            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
              errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
            }`}
          />
        </div>
        {errors[field] && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors[field]}</p>
        )}
      </div>
    );
  };

  const renderPhoneField = (
    label: string,
    field: keyof ClientData,
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

  const clientTypeLabels: Record<ClientType, string> = {
    natural: "Persona Natural",
    juridica: "Persona Jurídica",
    firma_personal: "Firma Personal",
    ente_gubernamental: "Ente Gubernamental",
    emprendedor: "Emprendedor"
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center mb-6 text-gray-900 dark:text-white transition-colors">
        Datos del Cliente: {clientTypeLabels[clientType]} 📋
      </h2>

      <div className="space-y-6 mb-6">
        {/* Sección Datos de Acceso (común para todos) */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 transition-colors">
          <h3 className="text-indigo-900 dark:text-indigo-300 mb-4">🔐 Credenciales de Acceso a la Plataforma</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
            Crea tu nombre de usuario y contraseña para acceder a Checkbank
          </p>
          
          <div className="space-y-4">
            {renderField("Nombre de Usuario", "nombreUsuario", "text", true, "usuario123")}
            
            <div className="grid md:grid-cols-2 gap-4">
              {renderPasswordField("Contraseña", "contrasena", true)}
              {renderPasswordField("Confirmar Contraseña", "confirmarContrasena", false)}
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 rounded p-3 transition-colors">
              <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                <strong>Requisitos de contraseña:</strong> Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas y números
              </p>
            </div>
          </div>
        </div>

        {/* Formularios específicos por tipo de cliente */}
        {clientType === "natural" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombres", "nombres")}
              {renderField("Apellidos", "apellidos")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderDocumentField("Documento de Identidad", "documentoIdentidad", ["V", "E", "P"])}
              {renderField("Fecha de Nacimiento", "fechaNacimiento", "date")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderSelectField("Género", "genero", ["Masculino", "Femenino", "Otro", "Prefiero no decirlo"])}
              {renderSelectField("Profesión u Ocupación", "profesionOcupacion", PROFESIONES_OCUPACIONES)}
            </div>
            {renderField("Dirección Principal", "direccionPrincipal")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderEstadoField("estado")}
              {renderCiudadField("estado", "ciudad")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderMunicipioField("estado", "ciudad", "municipio")}
              {renderParroquiaField("estado", "ciudad", "municipio", "parroquia")}
            </div>
            {renderField("Código Postal (4 dígitos)", "codigoPostal", "text", true, "1234")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Correo Electrónico", "correoElectronico", "email")}
              {renderPhoneField("Teléfono Móvil", "telefonoMovil")}
            </div>
          </>
        )}

        {clientType === "juridica" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Razón Social", "razonSocial")}
              {renderDocumentField("R.I.F. / N.I.T.", "rifNit", ["J"])}
            </div>
            {renderField("Domicilio Fiscal", "domicilioFiscal")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderEstadoField("estadoJuridica")}
              {renderCiudadField("estadoJuridica", "ciudadJuridica")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderMunicipioField("estadoJuridica", "ciudadJuridica", "municipioJuridica")}
              {renderParroquiaField("estadoJuridica", "ciudadJuridica", "municipioJuridica", "parroquiaJuridica")}
            </div>
            {renderField("Código Postal (4 dígitos)", "codigoPostalJuridica", "text", true, "1234")}
            <h4 className="text-sm text-gray-900 dark:text-white mt-4 mb-2 transition-colors">Representante Legal</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombres", "nombresRepresentante")}
              {renderField("Apellidos", "apellidosRepresentante")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderDocumentField("Documento del Representante", "documentoRepresentante", ["V", "E", "P"])}
              {renderPhoneField("Teléfono Fijo / Móvil", "telefonoFijo")}
            </div>
            {renderField("Correo Electrónico Corporativo", "correoCorporativo", "email")}
          </>
        )}

        {clientType === "firma_personal" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombre de la Firma", "nombreFirma")}
              {renderDocumentField("R.I.F. de la Firma", "rifFirma", ["V", "J"])}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombre del Titular", "nombreTitular")}
              {renderDocumentField("Cédula del Titular", "cedulaTitular", ["V", "E", "P"])}
            </div>
            {renderField("Dirección Fiscal", "direccionFiscalFirma")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderEstadoField("estadoFirma")}
              {renderCiudadField("estadoFirma", "ciudadFirma")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderMunicipioField("estadoFirma", "ciudadFirma", "municipioFirma")}
              {renderParroquiaField("estadoFirma", "ciudadFirma", "municipioFirma", "parroquiaFirma")}
            </div>
            {renderField("Código Postal (4 dígitos)", "codigoPostalFirma", "text", true, "1234")}
            {renderField("Actividad Comercial", "actividadComercial")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Correo Electrónico", "correoFirma", "email")}
              {renderPhoneField("Teléfono", "telefonoFirma")}
            </div>
          </>
        )}

        {clientType === "ente_gubernamental" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombre de la Institución", "nombreInstitucion")}
              {renderDocumentField("R.I.F. / N.I.T.", "rifNitGob", ["J", "G"])}
            </div>
            {renderField("Dirección Administrativa", "direccionAdministrativa")}
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombre del Contacto Designado", "nombreContacto")}
              {renderField("Cargo del Contacto", "cargoContacto")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Correo del Contacto", "correoContacto", "email")}
              {renderPhoneField("Teléfono del Contacto", "telefonoContacto")}
            </div>
            {renderField("Referencia de Contrato / Orden de Servicio", "referenciaContrato")}
          </>
        )}

        {clientType === "emprendedor" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Nombre del Emprendedor", "nombresEmprendedor")}
              {renderField("Apellidos del Emprendedor", "apellidosEmprendedor")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderDocumentField("Cédula o Rif", "cedulaEmprendedor", ["V", "E", "P", "J"])}
              {renderField("Nombre del Proyecto/Startup", "nombreProyecto")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Área del Proyecto", "areaProyecto")}
              {renderField("Dirección", "direccionEmprendedor")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderEstadoField("estadoEmprendedor")}
              {renderCiudadField("estadoEmprendedor", "ciudadEmprendedor")}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderMunicipioField("estadoEmprendedor", "ciudadEmprendedor", "municipioEmprendedor")}
              {renderParroquiaField("estadoEmprendedor", "ciudadEmprendedor", "municipioEmprendedor", "parroquiaEmprendedor")}
            </div>
            {renderField("Código Postal (4 dígitos)", "codigoPostalEmprendedor", "text", true, "1234")}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Descripción del Proyecto <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <textarea
                value={formData.descripcionProyecto || ""}
                onChange={(e) => handleChange("descripcionProyecto", e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.descripcionProyecto ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Breve descripción del proyecto o idea de negocio"
              />
              {errors.descripcionProyecto && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.descripcionProyecto}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderField("Correo Electrónico", "correoEmprendedor", "email")}
              {renderPhoneField("Teléfono", "telefonoEmprendedor")}
            </div>
          </>
        )}
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
