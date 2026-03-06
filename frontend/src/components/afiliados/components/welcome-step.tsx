import { useState, useEffect, useRef } from "react";
import { CheckCircle2, X, Eye, EyeOff } from "lucide-react";
import type { ClientType } from "./subscription-wizard";

export interface WelcomeData {
  nombreUsuario: string;
  contrasena: string;
  confirmarContrasena: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  codigoPaisTelefono: string;
  codigoAreaTelefono: string;
  telefonoMovil: string;
  correoElectronico: string;
}

interface WelcomeStepProps {
  clientType: ClientType;
  onNext: (data: WelcomeData) => void;
  onBack: () => void;
  initialData?: WelcomeData;
}

export function WelcomeStep({ clientType, onNext, onBack, initialData }: WelcomeStepProps) {
  const [nombreUsuario, setNombreUsuario] = useState(initialData?.nombreUsuario || "");
  const [contrasena, setContrasena] = useState(initialData?.contrasena || "");
  const [confirmarContrasena, setConfirmarContrasena] = useState(initialData?.confirmarContrasena || "");
  const [tipoDocumento, setTipoDocumento] = useState(initialData?.tipoDocumento || "");
  const [numeroDocumento, setNumeroDocumento] = useState(initialData?.numeroDocumento || "");
  const [nombres, setNombres] = useState(initialData?.nombres || "");
  const [apellidos, setApellidos] = useState(initialData?.apellidos || "");
  const [codigoPaisTelefono, setCodigoPaisTelefono] = useState(initialData?.codigoPaisTelefono || "+58");
  const [codigoAreaTelefono, setCodigoAreaTelefono] = useState(initialData?.codigoAreaTelefono || "414");
  const [telefonoMovil, setTelefonoMovil] = useState(initialData?.telefonoMovil || "");
  const [correoElectronico, setCorreoElectronico] = useState(initialData?.correoElectronico || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Lista de países con sus códigos y flags
  const paises = [
    { code: "+58", country: "Venezuela", flag: "ve" },
    { code: "+1", country: "Estados Unidos", flag: "us" },
    { code: "+34", country: "España", flag: "es" },
    { code: "+57", country: "Colombia", flag: "co" },
    { code: "+52", country: "México", flag: "mx" },
    { code: "+54", country: "Argentina", flag: "ar" },
    { code: "+55", country: "Brasil", flag: "br" },
    { code: "+56", country: "Chile", flag: "cl" },
    { code: "+51", country: "Perú", flag: "pe" },
    { code: "+593", country: "Ecuador", flag: "ec" },
    { code: "+507", country: "Panamá", flag: "pa" },
    { code: "+506", country: "Costa Rica", flag: "cr" },
  ];

  const selectedCountry = paises.find(p => p.code === codigoPaisTelefono) || paises[0];

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Función para calcular la fortaleza de la contraseña
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return Math.min(strength, 5);
  };

  // Función para obtener la etiqueta de fortaleza
  const getPasswordStrengthLabel = (strength: number): { text: string; color: string } => {
    if (strength === 0) return { text: "Muy débil", color: "bg-red-500" };
    if (strength === 1) return { text: "Débil", color: "bg-orange-500" };
    if (strength === 2) return { text: "Regular", color: "bg-yellow-500" };
    if (strength === 3) return { text: "Buena", color: "bg-lime-500" };
    if (strength === 4) return { text: "Fuerte", color: "bg-green-500" };
    return { text: "Muy fuerte", color: "bg-emerald-500" };
  };

  // Función para validar si la contraseña cumple los requisitos mínimos
  const isPasswordValid = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const passwordStrength = getPasswordStrength(contrasena);
  const passwordStrengthInfo = getPasswordStrengthLabel(passwordStrength);
  const passwordsMatch = contrasena === confirmarContrasena && confirmarContrasena.length > 0;
  const passwordsDontMatch = contrasena !== confirmarContrasena && confirmarContrasena.length > 0;

  // Función para obtener las opciones de tipo de documento según el tipo de cliente
  const getTiposDocumento = () => {
    switch (clientType) {
      case "natural":
        return [
          { value: "V", label: "V - Venezolano" },
          { value: "E", label: "E - Extranjero" },
          { value: "P", label: "P - Pasaporte" }
        ];
      case "emprendedor":
        return [
          { value: "V", label: "V - Venezolano" },
          { value: "J", label: "J - Persona Jurídica" }
        ];
      case "firma_personal":
        return [
          { value: "V", label: "V - Venezolano" },
          { value: "J", label: "J - Persona Jurídica" }
        ];
      case "juridica":
        return [
          { value: "J", label: "J - Persona Jurídica" }
        ];
      case "ente_gubernamental":
        return [
          { value: "G", label: "G - Gubernamental" }
        ];
      default:
        return [
          { value: "V", label: "V - Venezolano" },
          { value: "E", label: "E - Extranjero" },
          { value: "J", label: "J - Persona Jurídica" },
          { value: "P", label: "P - Pasaporte" },
          { value: "G", label: "G - Gubernamental" }
        ];
    }
  };

  const tiposDocumento = getTiposDocumento();

  // Configuración del campo de documento según tipo de cliente
  const getDocumentConfig = () => {
    switch (clientType) {
      case "natural":
        return {
          label: "Cédula o RIF",
          placeholder: "12345678",
          helperText: "Selecciona el tipo (V, E, J, P, G) e ingresa el número sin guiones"
        };
      case "juridica":
        return {
          label: "RIF de la Empresa",
          placeholder: "123456789",
          helperText: "Selecciona el tipo e ingresa el número de RIF sin guiones (9 dígitos)"
        };
      case "firma_personal":
        return {
          label: "RIF de la Firma Personal",
          placeholder: "123456789",
          helperText: "Selecciona el tipo e ingresa el número de RIF sin guiones (9 dígitos)"
        };
      case "emprendedor":
        return {
          label: "Cédula o RIF",
          placeholder: "12345678",
          helperText: "Selecciona el tipo (V, E, J, P, G) e ingresa el número sin guiones"
        };
      case "ente_gubernamental":
        return {
          label: "RIF del Ente Gubernamental",
          placeholder: "123456789",
          helperText: "Selecciona el tipo e ingresa el número de RIF sin guiones (9 dígitos)"
        };
      default:
        return {
          label: "Documento de Identidad",
          placeholder: "12345678",
          helperText: "Selecciona el tipo (V, E, J, P, G) e ingresa el número sin guiones"
        };
    }
  };

  const documentConfig = getDocumentConfig();

  // Función para obtener el nombre del tipo de cliente
  const getClientTypeName = () => {
    switch (clientType) {
      case "natural":
        return "Persona Natural";
      case "juridica":
        return "Persona Jurídica";
      case "firma_personal":
        return "Firma Personal";
      case "emprendedor":
        return "Emprendedor";
      case "ente_gubernamental":
        return "Ente Gubernamental";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting WelcomeStep form...", { nombreUsuario, tipoDocumento, numeroDocumento });

    // Validaciones
    if (!nombreUsuario || !contrasena || !confirmarContrasena || !tipoDocumento || !numeroDocumento || !nombres || !telefonoMovil || !correoElectronico) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // Validar nombre de usuario
    if (nombreUsuario.length < 4) {
      alert("El nombre de usuario debe tener al menos 4 caracteres");
      return;
    }

    if (nombreUsuario.length > 20) {
      alert("El nombre de usuario no puede tener más de 20 caracteres");
      return;
    }

    if (!/^[a-zA-Z0-9_ ]+$/.test(nombreUsuario)) {
      alert("El nombre de usuario solo puede contener letras, números, espacios y guión bajo (_)");
      return;
    }

    // CORRECCIÓN AQUÍ: Cambiamos la lógica para coincidir con la UI
    // Antes: if (/^\d/.test(nombreUsuario)) -> Solo bloqueaba números
    // Ahora: if (!/^[a-zA-Z]/.test(nombreUsuario)) -> Exige que empiece con letra
    if (!/^[a-zA-Z]/.test(nombreUsuario)) {
      alert("El nombre de usuario debe comenzar con una letra");
      return;
    }

    // Validar contraseña fuerte
    if (!isPasswordValid(contrasena)) {
      alert("La contraseña debe tener mínimo 8 caracteres e incluir mayúsculas, minúsculas y números");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validar apellidos para tipos que lo requieren
    if ((clientType === "natural" || clientType === "emprendedor" || clientType === "firma_personal") && !apellidos) {
      alert("Por favor completa el campo de apellidos");
      return;
    }

    if (telefonoMovil.length !== 7) {
      alert("El número de teléfono móvil debe tener 7 dígitos");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }

    console.log("Validation passed, calling onNext");
    onNext({
      nombreUsuario,
      contrasena,
      confirmarContrasena,
      tipoDocumento,
      numeroDocumento,
      nombres,
      apellidos,
      codigoPaisTelefono,
      codigoAreaTelefono,
      telefonoMovil,
      correoElectronico,
    });
  };

  const inputClasses = "w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200 shadow-sm";
  const labelClasses = "block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5 transition-colors";
  const helperTextClasses = "text-[11px] leading-tight text-gray-500 dark:text-gray-400 mt-1.5 transition-colors pl-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors">
      {/* Header de Bienvenida */}
      <div className="text-center mb-10 pb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 dark:bg-blue-900/40 rounded-3xl mb-6 shadow-inner ring-1 ring-blue-100 dark:ring-blue-800">
          <CheckCircle2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Bienvenido a Checkbank</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          Completa tus datos para comenzar tu afiliación como <span className="text-blue-600 dark:text-blue-400 font-bold">{getClientTypeName()}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Sección: Credenciales de Acceso a la Plataforma */}
        <div className="mb-8">
          <h3 className="text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            1. Credenciales de Acceso a la Plataforma
          </h3>
          <div className="space-y-4">
            {/* Nombre de Usuario */}
            <div className="grid md:grid-cols-1 gap-1">
              <label className={labelClasses}>
                Nombre de Usuario <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nombreUsuario}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s{2,}/g, ' ');
                    if (value.length <= 20) {
                      setNombreUsuario(value);
                    }
                  }}
                  placeholder="Ej: juan_carlos"
                  className={inputClasses}
                  maxLength={20}
                />
              </div>

              {/* Indicadores de validación en tiempo real */}
              {nombreUsuario.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs flex items-center gap-1 ${nombreUsuario.length >= 4
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                    }`}>
                    {nombreUsuario.length >= 4 ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Mínimo 4 caracteres ({nombreUsuario.length}/20)
                  </div>

                  <div className={`text-xs flex items-center gap-1 ${/^[a-zA-Z]/.test(nombreUsuario)
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                    }`}>
                    {/^[a-zA-Z]/.test(nombreUsuario) ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Debe comenzar con una letra
                  </div>

                  <div className={`text-xs flex items-center gap-1 ${/^[a-zA-Z0-9_ ]+$/.test(nombreUsuario)
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                    }`}>
                    {/^[a-zA-Z0-9_ ]+$/.test(nombreUsuario) ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Solo letras, números, espacios y guión bajo
                  </div>
                </div>
              )}

              {nombreUsuario.length === 0 && (
                <p className={helperTextClasses}>
                  4-20 caracteres, solo letras, números y guión bajo (_). Debe comenzar con letra.
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className={labelClasses}>
                Contraseña <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Indicador de fortaleza de contraseña */}
              {contrasena.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded ${index < passwordStrength
                          ? passwordStrengthInfo.color
                          : "bg-gray-200 dark:bg-gray-600"
                          }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${passwordStrength < 2
                    ? "text-red-500 dark:text-red-400"
                    : passwordStrength < 4
                      ? "text-yellow-500 dark:text-yellow-400"
                      : "text-green-500 dark:text-green-400"
                    }`}>
                    Fortaleza: {passwordStrengthInfo.text}
                  </p>
                </div>
              )}

              <p className={helperTextClasses}>
                Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas y números
              </p>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className={labelClasses}>
                Confirmar Contraseña <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordsMatch && (
                <p className="text-xs text-green-500 dark:text-green-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Las contraseñas coinciden
                </p>
              )}
              {passwordsDontMatch && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Las contraseñas no coinciden
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección: Documento de Identidad */}
        <div className="mb-8">
          <h3 className="text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            2. Documento de Identidad
          </h3>
          <div className="space-y-4">
            {/* Tipo de Documento */}
            <div>
              <label className={labelClasses}>
                Tipo de Documento <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className={inputClasses}
              >
                <option value="">Seleccionar tipo</option>
                {tiposDocumento.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Número de Cédula o RIF / Número de RIF */}
            <div>
              <label className={labelClasses}>
                {clientType === "juridica" || clientType === "firma_personal" || clientType === "ente_gubernamental"
                  ? "Número de RIF"
                  : "Número de Cédula o RIF"} <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                value={numeroDocumento}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNumeroDocumento(value);
                }}
                placeholder={documentConfig.placeholder}
                className={inputClasses}
                maxLength={9}
              />
              <p className={helperTextClasses}>{documentConfig.helperText}</p>
            </div>

            {/* Nombres */}
            <div>
              <label className={labelClasses}>
                {clientType === "juridica" || clientType === "ente_gubernamental"
                  ? "Razón Social / Nombre de la Institución"
                  : clientType === "firma_personal"
                    ? "Nombre de la Firma"
                    : "Nombres"} <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder={
                  clientType === "juridica"
                    ? "Ej: Empresa C.A."
                    : clientType === "ente_gubernamental"
                      ? "Ej: Ministerio de..."
                      : clientType === "firma_personal"
                        ? "Ej: Mi Firma Personal"
                        : "Ej: Juan Carlos"
                }
                className={inputClasses}
              />
            </div>

            {/* Apellidos (solo para persona natural, emprendedor y firma personal) */}
            {(clientType === "natural" || clientType === "emprendedor" || clientType === "firma_personal") && (
              <div>
                <label className={labelClasses}>
                  {clientType === "firma_personal" ? "Nombre del Titular" : "Apellidos"} <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder={clientType === "firma_personal" ? "Ej: Juan Carlos Pérez" : "Ej: Pérez González"}
                  className={inputClasses}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sección: Teléfono Móvil */}
        <div className="mb-8">
          <h3 className="text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            3. Número de Teléfono Móvil del propietario
          </h3>
          <div className="space-y-4">
            {/* Código de País */}
            <div className="relative" ref={countryDropdownRef}>
              <label className={labelClasses}>
                Código de País <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="w-full h-[50px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between transition-all focus:ring-2 focus:ring-blue-500/20"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCountry.flag}.png 2x`}
                      alt={selectedCountry.country}
                      className="w-6 h-4.5 object-cover rounded-sm shadow-sm"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCountry.code}</span>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCountryDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {paises.map((pais) => {
                      const isEnabled = pais.code === "+58"; // Solo Venezuela habilitado
                      return (
                        <button
                          key={pais.code}
                          type="button"
                          onClick={() => {
                            if (isEnabled) {
                              setCodigoPaisTelefono(pais.code);
                              setIsCountryDropdownOpen(false);
                            }
                          }}
                          disabled={!isEnabled}
                          className={`w-full px-4 py-2 flex items-center gap-3 transition-colors text-left ${pais.code === codigoPaisTelefono ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                            } ${isEnabled
                              ? 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
                              : 'opacity-40 cursor-not-allowed'
                            }`}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${pais.flag}.png`}
                            srcSet={`https://flagcdn.com/w40/${pais.flag}.png 2x`}
                            alt={pais.country}
                            className="w-5 h-4 object-cover rounded"
                          />
                          <span className="text-gray-900 dark:text-gray-100">{pais.code} {pais.country}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Código de Móvil */}
            <div>
              <label className={labelClasses}>
                Código de Móvil <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={codigoAreaTelefono}
                onChange={(e) => setCodigoAreaTelefono(e.target.value)}
                className={inputClasses}
              >
                <option value="">Seleccionar operadora</option>
                <option value="414">414 Movistar</option>
                <option value="424">424 Movistar</option>
                <option value="416">416 Movilnet</option>
                <option value="426">426 Movilnet</option>
                <option value="412">412 Digitel</option>
              </select>
              <p className={helperTextClasses}>
                Selecciona el código de tu operadora móvil
              </p>
            </div>

            {/* Número de Teléfono */}
            <div>
              <label className={labelClasses}>
                Número de Teléfono <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                value={telefonoMovil}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setTelefonoMovil(value.slice(0, 7));
                }}
                placeholder="1234567"
                className={inputClasses}
                maxLength={7}
              />
              <p className={helperTextClasses}>
                Ingresa los 7 dígitos del número. Ejemplo completo: 🇻🇪 +58 414 1234567
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Correo Electrónico */}
        <div className="mb-8">
          <h3 className="text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            4. Correo Electrónico del propietario
          </h3>
          <div>
            <label className={labelClasses}>
              Correo Electrónico del propietario <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="email"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value.toLowerCase())}
              placeholder="ejemplo@correo.com"
              className={inputClasses}
            />
            <p className={helperTextClasses}>
              Utilizaremos este correo para enviar información importante sobre tu cuenta
            </p>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Volver
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
