import { useState } from "react";
import type { ClientType, ClientData, CommerceData, Plan, WelcomeData, PaymentPeriod } from "./subscription-wizard";
import { ArrowLeft, CreditCard, Lock, DollarSign, Smartphone, Building2 } from "lucide-react";

interface ConfirmationStepProps {
  clientType: ClientType;
  clientData: ClientData;
  commerceData: CommerceData;
  selectedPlan: Plan;
  selectedPeriod: PaymentPeriod;
  welcomeData?: WelcomeData | null;
  onConfirm: (paymentData: any) => void;
  onBack: () => void;
}

type PaymentCategory = "medios_digitales" | "bancos_nacionales";
type PaymentMethod = "zelle" | "paypal" | "binance" | "pago_movil_bdv" | "pago_movil_banesco" | "pago_movil_banplus" | "pago_movil_fondo_comun" | "transferencia_bdv" | "transferencia_banesco" | "transferencia_banplus" | "transferencia_fondo_comun";
type BankSubcategory = "pago_movil" | "transferencia";

export function ConfirmationStep({
  clientType,
  clientData,
  commerceData,
  selectedPlan,
  selectedPeriod,
  welcomeData,
  onConfirm,
  onBack,
}: ConfirmationStepProps) {
  const [paymentCategory, setPaymentCategory] = useState<PaymentCategory>("bancos_nacionales");
  const [bankSubcategory, setBankSubcategory] = useState<BankSubcategory>("pago_movil");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pago_movil_bdv");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Tasa BCV
  const [tasaBCV, setTasaBCV] = useState("45.50");

  // Campos de pago comunes
  const [correoEmail, setCorreoEmail] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [montoComprobante, setMontoComprobante] = useState("");
  const [referenciaPago, setReferenciaPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");

  // Pago Móvil específico
  const [codigoMovilPago, setCodigoMovilPago] = useState("");
  const [numeroTelefonoPago, setNumeroTelefonoPago] = useState("");
  const [tipoDocumentoPago, setTipoDocumentoPago] = useState("");
  const [numeroDocumentoPago, setNumeroDocumentoPago] = useState("");
  const [bancoPagador, setBancoPagador] = useState("");

  // Captura de pago
  const [capturaPago, setCapturaPago] = useState<File | null>(null);

  const basePlanDetails = {
    basico: { name: "Básico", basePrice: 29 },
    estandar: { name: "Estándar", basePrice: 99 },
    premium: { name: "Premium", basePrice: 299 },
  };

  // Calcular precio según periodo
  const calculatePrice = (basePrice: number, period: PaymentPeriod) => {
    const periods = {
      mensual: { months: 1, discount: 0, label: "Mensual" },
      semestral: { months: 6, discount: 0.20, label: "Semestral (6 meses)" },
      anual: { months: 12, discount: 0.30, label: "Anual (12 meses)" },
    };

    const periodData = periods[period];
    const priceWithDiscount = basePrice * (1 - periodData.discount);
    const totalPrice = priceWithDiscount * periodData.months;

    return {
      monthly: priceWithDiscount,
      total: totalPrice,
      originalTotal: basePrice * periodData.months,
      savings: (basePrice * periodData.months) - totalPrice,
      periodLabel: periodData.label,
      months: periodData.months,
      discount: periodData.discount,
    };
  };

  const basePlan = selectedPlan ? basePlanDetails[selectedPlan] : null;
  const pricing = basePlan ? calculatePrice(basePlan.basePrice, selectedPeriod) : null;

  // Calcular monto en Bs
  const montoUSD = pricing ? pricing.total : 0;
  const tasaCambio = parseFloat(tasaBCV) || 0;
  const montoBs = (montoUSD * tasaCambio).toFixed(2);

  // Información de cuentas Checkbank
  const paymentAccountInfo = {
    zelle: {
      nombre: "Zelle",
      icon: "💵",
      datos: {
        email: "pagos@checkbank.com",
        titular: "Checkbank LLC",
        pais: "Estados Unidos"
      }
    },
    paypal: {
      nombre: "PayPal",
      icon: "💳",
      datos: {
        email: "payments@checkbank.com",
        titular: "Checkbank International"
      }
    },
    binance: {
      nombre: "Binance",
      icon: "₿",
      datos: {
        email: "crypto@checkbank.com",
        binanceID: "52847639",
        red: "USDT (TRC20)"
      }
    },
    pago_movil_bdv: {
      nombre: "Pago Móvil - Banco de Venezuela",
      icon: "📱",
      datos: {
        banco: "Banco de Venezuela (0102)",
        telefono: "0424-1234567",
        cedula: "J-12345678",
        titular: "Checkbank S.A."
      }
    },
    pago_movil_banesco: {
      nombre: "Pago Móvil - Banesco",
      icon: "📱",
      datos: {
        banco: "Banesco (0134)",
        telefono: "0424-1234567",
        cedula: "J-12345678",
        titular: "Checkbank S.A."
      }
    },
    pago_movil_banplus: {
      nombre: "Pago Móvil - Banplus",
      icon: "📱",
      datos: {
        banco: "Banplus (0174)",
        telefono: "0424-1234567",
        cedula: "J-12345678",
        titular: "Checkbank S.A."
      }
    },
    pago_movil_fondo_comun: {
      nombre: "Pago Móvil - Banco Fondo Común",
      icon: "📱",
      datos: {
        banco: "Banco Fondo Común (0151)",
        telefono: "0424-1234567",
        cedula: "J-12345678",
        titular: "Checkbank S.A."
      }
    },
    transferencia_bdv: {
      nombre: "Transferencia - Banco de Venezuela",
      icon: "🏦",
      datos: {
        banco: "Banco de Venezuela (0102)",
        tipoCuenta: "Corriente",
        numeroCuenta: "0102-0123-45-6789012345",
        rif: "J-12345678-9",
        titular: "Checkbank S.A."
      }
    },
    transferencia_banesco: {
      nombre: "Transferencia - Banesco",
      icon: "🏦",
      datos: {
        banco: "Banesco (0134)",
        tipoCuenta: "Corriente",
        numeroCuenta: "0134-0456-78-9012345678",
        rif: "J-12345678-9",
        titular: "Checkbank S.A."
      }
    },
    transferencia_banplus: {
      nombre: "Transferencia - Banplus",
      icon: "🏦",
      datos: {
        banco: "Banplus (0174)",
        tipoCuenta: "Corriente",
        numeroCuenta: "0174-0123-45-6789012345",
        rif: "J-12345678-9",
        titular: "Checkbank S.A."
      }
    },
    transferencia_fondo_comun: {
      nombre: "Transferencia - Banco Fondo Común",
      icon: "🏦",
      datos: {
        banco: "Banco Fondo Común (0151)",
        tipoCuenta: "Corriente",
        numeroCuenta: "0151-0987-65-4321098765",
        rif: "J-12345678-9",
        titular: "Checkbank S.A."
      }
    }
  };

  const getClientName = () => {
    if (clientType === "natural") return `${clientData.nombres || ""} ${clientData.apellidos || ""}`.trim();
    if (clientType === "juridica") return clientData.razonSocial;
    if (clientType === "firma_personal") return clientData.nombreFirma;
    if (clientType === "ente_gubernamental") return clientData.nombreInstitucion;
    if (clientType === "emprendedor") return `${clientData.nombresEmprendedor || ""} ${clientData.apellidosEmprendedor || ""}`.trim();
    return "";
  };

  const getClientEmail = () => {
    return clientData.correoElectronico ||
      clientData.correoCorporativo ||
      clientData.correoFirma ||
      clientData.correoContacto ||
      clientData.correoEmprendedor;
  };

  // Clases CSS comunes para inputs y labels
  const inputClasses = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors";
  const labelClasses = "block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors";
  const helperTextClasses = "text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors";

  const handleConfirm = () => {
    if (!acceptTerms) {
      alert("Debes aceptar los Términos y Condiciones para continuar");
      return;
    }

    // Validaciones básicas
    if (!referenciaPago || !fechaPago || !montoComprobante) {
      alert("Por favor completa todos los datos de pago requeridos");
      return;
    }

    // Validar que el monto pagado sea igual al monto a pagar
    const montoEsperado = paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil"
      ? parseFloat(montoBs)
      : totalConIGTF;
    const montoPagado = parseFloat(montoComprobante);

    if (Math.abs(montoPagado - montoEsperado) > 0.01) {
      const monedaTexto = paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil" ? "Bs" : "USD";
      alert(`El monto pagado debe ser igual al monto a pagar: ${montoEsperado.toFixed(2)} ${monedaTexto}`);
      return;
    }

    if (paymentMethod.startsWith("pago_movil_")) {
      if (!codigoMovilPago || !numeroTelefonoPago || !tipoDocumentoPago || !numeroDocumentoPago || !bancoPagador) {
        alert("Por favor completa todos los datos del Pago Móvil");
        return;
      }
    }

    // Validar banco pagador y captura para todos los métodos de bancos nacionales
    if (isBankTransfer) {
      if (!bancoPagador) {
        alert("Por favor selecciona el banco desde donde pagaste");
        return;
      }
      if (!capturaPago) {
        alert("Por favor adjunta la captura del comprobante de pago");
        return;
      }
    }

    // Simular procesamiento de pago
    onConfirm({
      metodo_pago: paymentMethod,
      referencia: referenciaPago,
      fecha_pago: fechaPago,
      monto: parseFloat(montoComprobante),
      banco: bancoPagador,
      tipoDocumento: tipoDocumentoPago,
      numeroDocumento: numeroDocumentoPago,
      telefonoPagador: `${codigoMovilPago}${numeroTelefonoPago}`
    });
  };

  const accountInfo = paymentAccountInfo[paymentMethod];
  const isDigitalMethod = ["zelle", "paypal", "binance"].includes(paymentMethod);
  const isBankTransfer = paymentMethod.startsWith("pago_movil_") || paymentMethod.startsWith("transferencia_");

  // Calcular IGTF (3%) para medios digitales
  const cargoIGTF = isDigitalMethod ? montoUSD * 0.03 : 0;
  const totalConIGTF = isDigitalMethod ? montoUSD + cargoIGTF : montoUSD;
  const montoBsConIGTF = (totalConIGTF * tasaCambio).toFixed(2);

  return (
    <div>
      {/* Resumen Completo de Datos */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700 transition-colors">
        <h2 className="text-center mb-6 text-gray-900 dark:text-white transition-colors flex items-center justify-center gap-2">
          📋 Resumen de Datos de Afiliación - {clientType === "natural" && "Persona Natural"}
          {clientType === "juridica" && "Persona Jurídica"}
          {clientType === "firma_personal" && "Firma Personal"}
          {clientType === "ente_gubernamental" && "Ente Gubernamental"}
          {clientType === "emprendedor" && "Emprendedor"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Columna 1: Datos de Bienvenida */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">🔐 Datos de Acceso</h4>
              <div className="space-y-2 text-sm">
                {welcomeData && (
                  <>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Usuario:</span>{" "}
                      <span className="text-gray-900 dark:text-white font-medium">{welcomeData.nombreUsuario}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Tipo de Documento:</span>{" "}
                      <span className="text-gray-900 dark:text-white">{welcomeData.tipoDocumento}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Número de Documento:</span>{" "}
                      <span className="text-gray-900 dark:text-white font-medium">{welcomeData.numeroDocumento}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">👤 Información Personal</h4>
              <div className="space-y-2 text-sm">
                {welcomeData && (
                  <>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {clientType === "juridica" || clientType === "ente_gubernamental"
                          ? "Razón Social:"
                          : clientType === "firma_personal"
                            ? "Nombre de la Firma:"
                            : "Nombres:"}
                      </span>{" "}
                      <span className="text-gray-900 dark:text-white font-medium">{welcomeData.nombres}</span>
                    </div>
                    {(clientType === "natural" || clientType === "emprendedor" || clientType === "firma_personal") && welcomeData.apellidos && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {clientType === "firma_personal" ? "Titular:" : "Apellidos:"}
                        </span>{" "}
                        <span className="text-gray-900 dark:text-white font-medium">{welcomeData.apellidos}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">📞 Datos de Contacto</h4>
              <div className="space-y-2 text-sm">
                {welcomeData && (
                  <>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Correo:</span>{" "}
                      <span className="text-gray-900 dark:text-white font-medium">{welcomeData.correoElectronico}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Teléfono:</span>{" "}
                      <span className="text-gray-900 dark:text-white font-medium">
                        {welcomeData.codigoPaisTelefono} {welcomeData.codigoAreaTelefono}-{welcomeData.telefonoMovil}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Columna 2: Plan Seleccionado */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">💲 Plan Seleccionado</h4>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Plan</p>
                  <p className="text-blue-900 dark:text-blue-300 transition-colors">{basePlan?.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Periodo de Pago</p>
                  <p className="text-blue-900 dark:text-blue-300 transition-colors">{pricing?.periodLabel}</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700 transition-colors">
                  <div className="mb-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">Tasa BCV (USD → Bs)</p>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={tasaBCV}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          setTasaBCV(value);
                        }}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                        placeholder="45.50"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Bs/$</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                  <div className="space-y-2">
                    {pricing && pricing.discount > 0 && (
                      <>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-600 dark:text-gray-400">Precio Base</p>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 line-through">${pricing.originalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-600 dark:text-gray-400">Descuento ({(pricing.discount * 100).toFixed(0)}%)</p>
                          <span className="text-green-600 dark:text-green-400">-${pricing.savings.toFixed(2)} USD</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-baseline">
                      <p className="text-gray-600 dark:text-gray-400">{pricing && pricing.months > 1 ? `Total ${pricing.periodLabel}` : "Precio Mensual"}</p>
                      <div>
                        <span className="text-gray-900 dark:text-white">${pricing?.total.toFixed(2)}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400"> USD</span>
                      </div>
                    </div>
                    {pricing && pricing.months > 1 && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                        <p className="text-xs text-green-700 dark:text-green-400">
                          Equivale a ${pricing.monthly.toFixed(2)}/mes
                        </p>
                      </div>
                    )}

                    {isDigitalMethod && (
                      <>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-600 dark:text-gray-400">IGTF (3%)</p>
                          <span className="text-orange-600 dark:text-orange-400">+${cargoIGTF.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between items-baseline border-t border-gray-200 dark:border-gray-600 pt-2">
                          <p className="text-gray-700 dark:text-gray-300">Subtotal (USD)</p>
                          <span className="text-gray-900 dark:text-white">${totalConIGTF.toFixed(2)} USD</span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-baseline">
                      <p className="text-gray-600 dark:text-gray-400">Equivalente (Bs)</p>
                      <div>
                        <span className="text-gray-900 dark:text-white">Bs {isDigitalMethod ? montoBsConIGTF : montoBs}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded p-3 border border-green-300 dark:border-green-700 transition-colors">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors">Total a pagar</p>
                  {isDigitalMethod ? (
                    <>
                      <p className="text-green-700 dark:text-green-400 transition-colors">${totalConIGTF.toFixed(2)} USD (inc. IGTF)</p>
                      <p className="text-green-900 dark:text-green-300 transition-colors">Bs {montoBsConIGTF}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-700 dark:text-green-400 transition-colors">${montoUSD.toFixed(2)} USD</p>
                      <p className="text-green-900 dark:text-green-300 transition-colors">Bs {montoBs}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Método de pago */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mb-6 transition-colors">
        <h3 className="mb-4 flex items-center gap-2 text-gray-900 dark:text-white transition-colors">
          <CreditCard className="w-5 h-5" />
          Método de Pago
        </h3>

        {/* Selector de categoría de pago */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => {
              setPaymentCategory("bancos_nacionales");
              setBankSubcategory("pago_movil");
              setPaymentMethod("pago_movil_bdv");
            }}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${paymentCategory === "bancos_nacionales"
              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
              }`}
          >
            <Building2 className="w-4 h-4" />
            Bancos Nacionales Aliados
          </button>
          <button
            type="button"
            onClick={() => {
              setPaymentCategory("medios_digitales");
              setPaymentMethod("zelle");
            }}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${paymentCategory === "medios_digitales"
              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
              }`}
          >
            <DollarSign className="w-4 h-4" />
            Medios Digitales
          </button>
        </div>

        {/* Selector de método específico */}
        <div className="mb-6">
          {paymentCategory === "medios_digitales" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["zelle", "paypal", "binance"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method as PaymentMethod)}
                  className={`py-3 px-4 rounded-lg border-2 transition-colors ${paymentMethod === method
                    ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                    }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{paymentAccountInfo[method as PaymentMethod].icon}</div>
                    <div className="text-sm">{paymentAccountInfo[method as PaymentMethod].nombre}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {paymentCategory === "bancos_nacionales" && (
            <div className="space-y-4">
              {/* Selector de subcategoría: Pago Móvil o Transferencia */}
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setBankSubcategory("pago_movil");
                    setPaymentMethod("pago_movil_bdv");
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${bankSubcategory === "pago_movil"
                    ? "border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                    }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Pago Móvil
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBankSubcategory("transferencia");
                    setPaymentMethod("transferencia_bdv");
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${bankSubcategory === "transferencia"
                    ? "border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                    }`}
                >
                  <Building2 className="w-4 h-4" />
                  Transferencias
                </button>
              </div>

              {/* Lista de bancos según subcategoría */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bankSubcategory === "pago_movil" && (
                  <>
                    {[
                      { id: "pago_movil_bdv", nombre: "Banco de Venezuela", enabled: true },
                      { id: "pago_movil_banesco", nombre: "Banesco", enabled: false },
                      { id: "pago_movil_banplus", nombre: "Banplus", enabled: false },
                      { id: "pago_movil_fondo_comun", nombre: "Fondo Común", enabled: false }
                    ].map((banco) => (
                      <button
                        key={banco.id}
                        type="button"
                        onClick={() => {
                          if (banco.enabled) {
                            setPaymentMethod(banco.id as PaymentMethod);
                          }
                        }}
                        disabled={!banco.enabled}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors ${paymentMethod === banco.id
                          ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : banco.enabled
                            ? "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">📱</div>
                          <div className="text-sm">{banco.nombre}</div>
                        </div>
                      </button>
                    ))}
                  </>
                )}

                {bankSubcategory === "transferencia" && (
                  <>
                    {[
                      { id: "transferencia_bdv", nombre: "Banco de Venezuela", enabled: true },
                      { id: "transferencia_banesco", nombre: "Banesco", enabled: false },
                      { id: "transferencia_banplus", nombre: "Banplus", enabled: false },
                      { id: "transferencia_fondo_comun", nombre: "Fondo Común", enabled: false }
                    ].map((banco) => (
                      <button
                        key={banco.id}
                        type="button"
                        onClick={() => {
                          if (banco.enabled) {
                            setPaymentMethod(banco.id as PaymentMethod);
                          }
                        }}
                        disabled={!banco.enabled}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors ${paymentMethod === banco.id
                          ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : banco.enabled
                            ? "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🏦</div>
                          <div className="text-sm">{banco.nombre}</div>
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Información de la cuenta Checkbank */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-700 transition-colors">
          <h4 className="text-sm text-blue-900 dark:text-blue-300 mb-3 transition-colors flex items-center gap-2">
            <span className="text-lg">{accountInfo.icon}</span>
            Datos de Pago Checkbank - {accountInfo.nombre}
          </h4>
          <div className="space-y-1 text-sm">
            {paymentMethod === "zelle" && (
              <>
                <p><span className="text-blue-700 dark:text-blue-400">Email:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.email}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Titular:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.titular}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">País:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.pais}</span></p>
              </>
            )}

            {paymentMethod === "paypal" && (
              <>
                <p><span className="text-blue-700 dark:text-blue-400">Email:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.email}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Titular:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.titular}</span></p>
              </>
            )}

            {paymentMethod === "binance" && (
              <>
                <p><span className="text-blue-700 dark:text-blue-400">Email:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.email}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Binance ID:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.binanceID}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Red:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.red}</span></p>
              </>
            )}

            {paymentMethod.startsWith("pago_movil_") && (
              <>
                <p><span className="text-blue-700 dark:text-blue-400">Banco:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.banco}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Teléfono:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.telefono}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Cédula/RIF:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.cedula}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Titular:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.titular}</span></p>
              </>
            )}

            {paymentMethod.startsWith("transferencia_") && (
              <>
                <p><span className="text-blue-700 dark:text-blue-400">Banco:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.banco}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Tipo de Cuenta:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.tipoCuenta}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Número de Cuenta:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.numeroCuenta}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">RIF:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.rif}</span></p>
                <p><span className="text-blue-700 dark:text-blue-400">Titular:</span> <span className="text-blue-900 dark:text-blue-300">{accountInfo.datos.titular}</span></p>
              </>
            )}
          </div>
        </div>

        {/* Formulario de comprobante de pago */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4 transition-colors">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 transition-colors">
            <strong>⚠️ IMPORTANTE:</strong> Por favor Complete los datos de su comprobante de pago de forma correcta.
            Es muy importante para la <strong>VERIFICACIÓN Y ACTIVACIÓN</strong> automática del servicio.
          </p>
        </div>

        <div className="space-y-4">
          {/* Campos específicos para Pago Móvil */}
          {paymentMethod.startsWith("pago_movil_") && (
            <>
              {/* Sección de Identificación del pagador */}
              <div className="border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50/30 dark:bg-blue-900/10 transition-colors">
                <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  🆔 Identificación del Pagador
                </h4>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Código de Móvil */}
                    <div>
                      <label className={labelClasses}>
                        Código de Móvil <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <select
                        value={codigoMovilPago}
                        onChange={(e) => setCodigoMovilPago(e.target.value)}
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
                        Código de la operadora móvil desde donde pagó
                      </p>
                    </div>

                    {/* Número de Teléfono */}
                    <div>
                      <label className={labelClasses}>
                        Número de Teléfono <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={numeroTelefonoPago}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 7) {
                            setNumeroTelefonoPago(value);
                          }
                        }}
                        placeholder="1234567"
                        maxLength={7}
                        className={inputClasses}
                      />
                      <p className={helperTextClasses}>
                        7 dígitos sin espacios ni guiones
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Tipo de Documento */}
                    <div>
                      <label className={labelClasses}>
                        Tipo de Documento <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <select
                        value={tipoDocumentoPago}
                        onChange={(e) => setTipoDocumentoPago(e.target.value)}
                        className={inputClasses}
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="V">V - Venezolano</option>
                        <option value="E">E - Extranjero</option>
                        <option value="J">J - Jurídico</option>
                        <option value="P">P - Pasaporte</option>
                      </select>
                    </div>

                    {/* Número de Cédula o RIF */}
                    <div>
                      <label className={labelClasses}>
                        Número de Cédula o RIF <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={numeroDocumentoPago}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9-]/g, "");
                          setNumeroDocumentoPago(value);
                        }}
                        placeholder="12345678 o 12345678-9"
                        className={inputClasses}
                      />
                      <p className={helperTextClasses}>
                        Solo números (sin letras)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Sección de datos del pagador */}
          <div className="border-t-2 border-gray-200 dark:border-gray-600 pt-4 mt-4">
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              👤 Datos del Pagador
            </h4>

            <div className="space-y-4">
              <div>
                <label className={labelClasses}>
                  Nombre del Titular/Pagador <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={nombreTitular}
                  onChange={(e) => setNombreTitular(e.target.value)}
                  placeholder="Nombre completo"
                  className={inputClasses}
                />
              </div>

              {isDigitalMethod && (
                <div>
                  <label className={labelClasses}>
                    Email/Cuenta desde donde pagó <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={correoEmail}
                    onChange={(e) => setCorreoEmail(e.target.value)}
                    placeholder="ejemplo@email.com"
                    className={inputClasses}
                  />
                </div>
              )}

              <div>
                <label className={labelClasses}>
                  Fecha de Pago <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={fechaPago}
                  onChange={(e) => setFechaPago(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Monto Pagado {paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil" ? "(Bs)" : "(USD)"} <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={montoComprobante}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, "");
                    setMontoComprobante(value);
                  }}
                  placeholder={paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil" ? montoBs : totalConIGTF.toFixed(2)}
                  className={(() => {
                    const montoEsperado = paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil"
                      ? parseFloat(montoBs)
                      : totalConIGTF;
                    const montoPagado = parseFloat(montoComprobante) || 0;
                    const hayDiferencia = montoComprobante && Math.abs(montoPagado - montoEsperado) > 0.01;

                    return hayDiferencia
                      ? inputClasses + " border-red-500 dark:border-red-400 border-2"
                      : inputClasses;
                  })()}
                />
                {(() => {
                  const montoEsperado = paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil"
                    ? parseFloat(montoBs)
                    : totalConIGTF;
                  const montoPagado = parseFloat(montoComprobante) || 0;
                  const hayDiferencia = montoComprobante && Math.abs(montoPagado - montoEsperado) > 0.01;

                  if (hayDiferencia) {
                    return (
                      <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg transition-colors">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          ⚠️ El monto pagado no coincide con el monto a pagar
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p className={helperTextClasses}>
                      Monto a pagar:{" "}
                      {paymentCategory === "bancos_nacionales" || paymentMethod === "pago_movil" ? (
                        <span className="text-blue-600 dark:text-blue-400">Bs {montoBs}</span>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400">${totalConIGTF.toFixed(2)} USD</span>
                      )}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>
              Número de Referencia/Confirmación <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              value={referenciaPago}
              onChange={(e) => setReferenciaPago(e.target.value)}
              placeholder="123456789"
              maxLength={20}
              className={inputClasses}
            />
            <p className={helperTextClasses}>
              Número de confirmación de la transacción
            </p>
          </div>

          {/* Campo banco pagador para Bancos Nacionales */}
          {isBankTransfer && (
            <div>
              <label className={labelClasses}>
                Banco desde donde pagó <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                value={bancoPagador}
                onChange={(e) => setBancoPagador(e.target.value)}
                className={inputClasses}
              >
                <option value="">Seleccione un banco</option>
                <option value="0102">Banco de Venezuela (0102)</option>
                <option value="0104">Venezolano de Crédito (0104)</option>
                <option value="0105">Banco Mercantil (0105)</option>
                <option value="0108">Banco Provincial (0108)</option>
                <option value="0114">Bancaribe (0114)</option>
                <option value="0115">Banco Exterior (0115)</option>
                <option value="0128">Banco Caroní (0128)</option>
                <option value="0134">Banesco (0134)</option>
                <option value="0137">Banco Sofitasa (0137)</option>
                <option value="0138">Banco Plaza (0138)</option>
                <option value="0146">Banco de la Gente Emprendedora (0146)</option>
                <option value="0151">Banco Fondo Común (0151)</option>
                <option value="0156">100% Banco (0156)</option>
                <option value="0157">Banco Del Sur (0157)</option>
                <option value="0163">Banco del Tesoro (0163)</option>
                <option value="0166">Banco Agrícola de Venezuela (0166)</option>
                <option value="0168">Bancrecer (0168)</option>
                <option value="0169">Mi Banco (0169)</option>
                <option value="0171">Banco Activo (0171)</option>
                <option value="0172">Bancamiga (0172)</option>
                <option value="0173">Banco Internacional de Desarrollo (0173)</option>
                <option value="0174">Banplus (0174)</option>
                <option value="0175">Banco Bicentenario (0175)</option>
                <option value="0191">Banco Nacional de Crédito (0191)</option>
              </select>
              <p className={helperTextClasses}>
                Seleccione el banco desde el cual realizó la transferencia o pago
              </p>
            </div>
          )}

          {/* Campo para adjuntar captura de pago - Solo para Bancos Nacionales */}
          {isBankTransfer && (
            <div>
              <label className={labelClasses}>
                Adjuntar Captura de Pago <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Validar tamaño máximo 5MB
                      if (file.size > 5 * 1024 * 1024) {
                        alert("El archivo no debe superar 5MB");
                        e.target.value = "";
                        return;
                      }
                      setCapturaPago(file);
                    }
                  }}
                  className="w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 file:cursor-pointer hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-colors"
                />
                {capturaPago && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span>✓</span>
                    <span>{capturaPago.name}</span>
                    <button
                      type="button"
                      onClick={() => setCapturaPago(null)}
                      className="ml-auto text-red-500 dark:text-red-400 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
              <p className={helperTextClasses}>
                Adjunta una captura del comprobante de pago (JPG, PNG o PDF, máx. 5MB)
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4 border border-blue-200 dark:border-blue-700 transition-colors">
          <p className="text-sm text-blue-800 dark:text-blue-300 transition-colors">
            ℹ️ Los datos del pago serán verificados con el banco antes de activar tu afiliación. Asegúrate de que toda la información sea correcta.
          </p>
        </div>
      </div>

      {/* Términos y condiciones */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-600 transition-colors">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer transition-colors">
            Acepto los{" "}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Términos y Condiciones de Uso
            </a>{" "}
            y la{" "}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Política de Privacidad
            </a>{" "}
            de Checkbank. <span className="text-red-500 dark:text-red-400">*</span>
          </label>
        </div>
      </div>

      {/* Seguridad */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-700 flex items-center gap-3 transition-colors">
        <Lock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
        <p className="text-sm text-green-800 dark:text-green-300 transition-colors">
          Tu información está protegida con encriptación SSL de 256 bits
        </p>
      </div>

      {/* Botones */}
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
          type="button"
          onClick={handleConfirm}
          className={`px-8 py-3 rounded-lg transition-colors ${acceptTerms
            ? "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          disabled={!acceptTerms}
        >
          🔒 Confirmar Pago y Suscribirse
        </button>
      </div>
    </div>
  );
}