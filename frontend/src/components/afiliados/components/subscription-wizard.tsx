import { useState } from "react";
import { ClientTypeSelector } from "./client-type-selector";
import { WelcomeStep, type WelcomeData } from "./welcome-step";
import { PlanSelector } from "./plan-selector";
import { ConfirmationStep } from "./confirmation-step";
import { CheckCircle2, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { ClientDataForm } from "./client-data-form";
import { CommerceInfoForm } from "./commerce-info-form";
import { saveAffiliate } from "../../../services/api";

export type ClientType = "natural" | "juridica" | "firma_personal" | "ente_gubernamental" | "emprendedor" | null;
export type Plan = "basico" | "estandar" | "premium" | null;
export type PaymentPeriod = "mensual" | "semestral" | "anual";

export interface ClientData {
  // Común para todos
  nombreUsuario?: string;
  contrasena?: string;
  confirmarContrasena?: string;
  ciudad?: string;
  parroquia?: string;

  // Persona Natural
  nombres?: string;
  apellidos?: string;
  documentoIdentidad?: string;
  fechaNacimiento?: string;
  genero?: string;
  profesionOcupacion?: string;
  direccionPrincipal?: string;
  estado?: string;
  municipio?: string;
  codigoPostal?: string;
  correoElectronico?: string;
  telefonoMovil?: string;

  // Persona Jurídica
  razonSocial?: string;
  rifNit?: string;
  domicilioFiscal?: string;
  estadoJuridica?: string;
  municipioJuridica?: string;
  codigoPostalJuridica?: string;
  nombresRepresentante?: string;
  apellidosRepresentante?: string;
  documentoRepresentante?: string;
  correoCorporativo?: string;
  telefonoFijo?: string;
  ciudadJuridica?: string;
  parroquiaJuridica?: string;

  // Firma Personal
  nombreFirma?: string;
  rifFirma?: string;
  nombreTitular?: string;
  cedulaTitular?: string;
  direccionFiscalFirma?: string;
  estadoFirma?: string;
  municipioFirma?: string;
  codigoPostalFirma?: string;
  correoFirma?: string;
  telefonoFirma?: string;
  actividadComercial?: string;
  ciudadFirma?: string;
  parroquiaFirma?: string;

  // Ente Gubernamental
  nombreInstitucion?: string;
  rifNitGob?: string;
  direccionAdministrativa?: string;
  nombreContacto?: string;
  cargoContacto?: string;
  correoContacto?: string;
  telefonoContacto?: string;
  referenciaContrato?: string;

  // Emprendedor
  nombresEmprendedor?: string;
  apellidosEmprendedor?: string;
  cedulaEmprendedor?: string;
  nombreProyecto?: string;
  areaProyecto?: string;
  direccionEmprendedor?: string;
  estadoEmprendedor?: string;
  municipioEmprendedor?: string;
  codigoPostalEmprendedor?: string;
  correoEmprendedor?: string;
  telefonoEmprendedor?: string;
  descripcionProyecto?: string;
  ciudadEmprendedor?: string;
  parroquiaEmprendedor?: string;
}

export interface CommerceData {
  // Ubicación y Contacto Principal
  direccionCalle?: string;
  direccionNumero?: string;
  direccionCiudad?: string;
  direccionDepartamento?: string;
  estadoComercio?: string;
  municipioComercio?: string;
  codigoPostal?: string;
  telefonoComercio?: string;
  emailAdministrativo?: string;

  // Presencia Digital
  sitioWeb?: string;
  descripcionNegocio?: string;
  canalesVenta?: string[];
  redesSociales?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  noUsaRedesSociales?: boolean;

  // Información Financiera
  actividadEconomica?: string;
  fuenteIngresos?: string;
  volumenVentasMensual?: string;
  valorPromedioTransaccion?: string;
  paisesVenta?: string[];
}

export function SubscriptionWizard() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentStep, setCurrentStep] = useState(1);
  const [clientType, setClientType] = useState<ClientType>(null);
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
  const [clientData, setClientData] = useState<ClientData>({});
  const [commerceData, setCommerceData] = useState<CommerceData>({});
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PaymentPeriod>("mensual");
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { number: 1, title: "Tipo de Cliente", icon: "📋" },
    { number: 2, title: "Bienvenida", icon: "👋" },
    { number: 3, title: "Datos del Cliente", icon: "👤" },
    { number: 4, title: "Información de Comercio", icon: "🏢" },
    { number: 5, title: "Plan de Afiliación", icon: "💲" },
    { number: 6, title: "Confirmación y Pago", icon: "✅" },
  ];

  const handleClientTypeSelect = (type: ClientType) => {
    setClientType(type);
    setWelcomeData(null);
    setClientData({});
    setCommerceData({});
    setCurrentStep(2);
  };

  const handleWelcomeSubmit = (data: WelcomeData) => {
    setWelcomeData(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClientDataSubmit = (data: ClientData) => {
    setClientData(data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCommerceSubmit = (data: CommerceData) => {
    setCommerceData(data);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanSelect = (plan: Plan, period: PaymentPeriod) => {
    setSelectedPlan(plan);
    setSelectedPeriod(period);
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = async () => {
    try {
      const payload = {
        clientType,
        ...clientData,
        ...commerceData,
        ...welcomeData,
        selectedPlan,
        selectedPeriod,
      };
      await saveAffiliate(payload);
      setIsComplete(true);
    } catch (error) {
      console.error("Error saving affiliate:", error);
      alert("Hubo un error al procesar tu afiliación. Por favor, intenta de nuevo.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors">
        <div className="text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-green-600 dark:text-green-400 mb-4">¡Afiliación Exitosa!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tu afiliación ha sido procesada correctamente. Hemos enviado las credenciales
            de acceso y la confirmación a tu correo electrónico.
          </p>

          {/* Notificación de factura enviada */}
          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 transition-colors">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <span>📧 Correo de confirmación enviado a: </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {welcomeData?.correoElectronico || clientData.correoElectronico || clientData.correoCorporativo || clientData.correoContacto}
                </span>
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 transition-colors">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <span className="text-green-700 dark:text-green-400">✓</span> Tu factura ha sido enviada a tu correo electrónico
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentStep(1);
                setClientType(null);
                setWelcomeData(null);
                setClientData({});
                setCommerceData({});
                setSelectedPlan(null);
                setSelectedPeriod("mensual");
                setIsComplete(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nueva Afiliación
            </button>

            <button
              onClick={() => {
                // Aquí se podría redirigir a otra página o cerrar la aplicación
                window.location.href = "/";
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header con Toggle Dark Mode */}
      <div className="mb-8 flex items-center justify-end">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
          aria-label="Cambiar modo"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.number
                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                >
                  <span className="text-xl">{step.icon}</span>
                </div>
                <p className={`mt-2 text-sm text-center transition-colors ${currentStep >= step.number ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                  }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${currentStep > step.number ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors">
        {currentStep === 1 && (
          <ClientTypeSelector onSelect={handleClientTypeSelect} />
        )}

        {currentStep === 2 && clientType && (
          <WelcomeStep
            clientType={clientType}
            initialData={welcomeData || undefined}
            onNext={handleWelcomeSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <ClientDataForm
            clientType={clientType!}
            initialData={clientData}
            welcomeData={welcomeData}
            onSubmit={handleClientDataSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <CommerceInfoForm
            initialData={commerceData}
            onSubmit={handleCommerceSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <PlanSelector
            clientType={clientType}
            selectedPlan={selectedPlan}
            selectedPeriod={selectedPeriod}
            onSelect={handlePlanSelect}
            onBack={handleBack}
          />
        )}

        {currentStep === 6 && (
          <ConfirmationStep
            clientType={clientType}
            clientData={clientData}
            commerceData={commerceData}
            selectedPlan={selectedPlan}
            selectedPeriod={selectedPeriod}
            welcomeData={welcomeData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export type { WelcomeData };
