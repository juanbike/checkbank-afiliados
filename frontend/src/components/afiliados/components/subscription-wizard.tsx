import { useState, useEffect } from "react";
import { ClientTypeSelector } from "./client-type-selector";
import { WelcomeStep, type WelcomeData } from "./welcome-step";
import { PlanSelector } from "./plan-selector";
import { LoginStep } from "./login-step";
import { DashboardView } from "./dashboard-view";
import { CheckCircle2, LayoutDashboard, UserPlus, LogIn, CreditCard } from "lucide-react";
import { initAffiliate, updateAffiliatePlan } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

export type ClientType = "natural" | "juridica" | "firma_personal" | "ente_gubernamental" | "emprendedor" | null;
export type Plan = "basico" | "estandar" | "premium" | null;
export type PaymentPeriod = "mensual" | "semestral" | "anual";

export function SubscriptionWizard() {
  const { isAuthenticated, token: authToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Data State
  const [clientType, setClientType] = useState<ClientType>(null);
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PaymentPeriod>("mensual");

  // Auth/Session State
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { number: 1, title: "Suscripción", icon: <UserPlus className="w-6 h-6" /> },
    { number: 2, title: "Ingreso", icon: <LogIn className="w-6 h-6" /> },
    { number: 3, title: "Plan", icon: <CreditCard className="w-6 h-6" /> },
    { number: 4, title: "Dashboard", icon: <LayoutDashboard className="w-6 h-6" /> },
  ];

  // Auto-advance if authenticated and on step 2
  useEffect(() => {
    if (isAuthenticated && currentStep === 2) {
      setCurrentStep(3);
    }
    if (isAuthenticated && currentStep < 2) {
      // Optional: Allow authenticated users to skip signup/login
    }
  }, [isAuthenticated, currentStep]);

  const handleClientTypeSelect = (type: ClientType) => {
    setClientType(type);
    // Auto-advance within Step 1 (UX choice)
  };

  const handleWelcomeSubmit = async (data: WelcomeData) => {
    setLoading(true);
    try {
      setWelcomeData(data);

      // Step 1: Inicia la afiliación (Crear cuenta)
      const payload = {
        clientType, // 'natural', 'juridica', etc.
        email: data.correoElectronico,
        password: data.contrasena,
        fullName: `${data.nombres} ${data.apellidos || ""}`.trim(),
        // Usamos valores del enum válidos para la inicialización
        selectedPlan: "basico",
        selectedPeriod: "mensual",
        paymentMethod: "Pendiente",
        paymentReference: "REG_" + Date.now(),
        amount: 0,
        bank: "Pendiente"
      };

      await initAffiliate(payload);

      // Avanzar al Paso 2: Login
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Error in signup:", error);
      alert(error.message || "Error al crear tu cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanSelect = async (plan: Plan, period: PaymentPeriod) => {
    setLoading(true);
    try {
      setSelectedPlan(plan);
      setSelectedPeriod(period);

      // Step 3: Actualizar Plan en el servidor
      const activeToken = token || authToken;
      if (activeToken && plan) {
        await updateAffiliatePlan({
          plan: plan,
          period: period
        }, activeToken);
      }

      // Avanzar al Paso 4: Dashboard
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Error updating plan:", error);
      alert("Error al guardar tu plan. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // No permitir volver de login si ya se registró (Step 1 -> 2)
      // Pero sí permitir volver de Plan a Login (Step 3 -> 2)
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-400">CHECK<span className="text-gray-900 dark:text-white">BANK</span></h2>
        <p className="text-sm text-gray-500 font-medium">Sistema de Afiliación Tecnofix</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0 hidden md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center flex-1">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${currentStep >= step.number
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none scale-110"
                  : "bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-100 dark:border-gray-700"
                  }`}
              >
                {currentStep > step.number ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
              </div>
              <div className="mt-4 text-center">
                <span className={`text-xs font-black uppercase tracking-tighter ${currentStep >= step.number ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>
                  Paso {step.number}
                </span>
                <p className={`text-sm font-bold block ${currentStep >= step.number ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700 transition-all duration-500">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-[2.5rem]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-bold text-blue-600">Procesando...</p>
            </div>
          </div>
        )}

        {/* Paso 1.1: Seleccionar Tipo (Si no se ha seleccionado) */}
        {currentStep === 1 && !clientType && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold dark:text-white">Bienvenido a Checkbank</h3>
              <p className="text-gray-500 dark:text-gray-400">Comencemos eligiendo tu tipo de cliente para la suscripción.</p>
            </div>
            <ClientTypeSelector onSelect={handleClientTypeSelect} />
          </div>
        )}

        {/* Paso 1.2: Bienvenida / Signup */}
        {currentStep === 1 && clientType && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <WelcomeStep
              clientType={clientType}
              initialData={welcomeData || undefined}
              onNext={handleWelcomeSubmit}
              onBack={() => setClientType(null)}
            />
          </div>
        )}

        {/* Paso 2: Login */}
        {currentStep === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <LoginStep onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {/* Paso 3: Plan Selector */}
        {currentStep === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold dark:text-white">Selecciona tu Plan</h3>
              <p className="text-gray-500 dark:text-gray-400">Al loguearte, ahora elige el plan que mejor se adapte a tu negocio.</p>
            </div>
            <PlanSelector
              clientType={clientType}
              selectedPlan={selectedPlan}
              selectedPeriod={selectedPeriod}
              onSelect={handlePlanSelect}
              onBack={handleBack}
            />
          </div>
        )}

        {/* Paso 4: Dashboard */}
        {currentStep === 4 && (
          <div className="animate-in fade-in duration-700">
            <DashboardView token={token || authToken || ""} />
          </div>
        )}
      </div>
    </div>
  );
}

export type { WelcomeData };
export type ClientData = Record<string, any>;
export type CommerceData = Record<string, any>;
