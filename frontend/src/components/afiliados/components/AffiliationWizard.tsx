import { useState } from "react";
import { ClientTypeSelector } from "./client-type-selector";
import { WelcomeStep, type WelcomeData } from "./welcome-step";
import { PlanSelector } from "./plan-selector";
import { ConfirmationStep } from "./confirmation-step";
import { CheckCircle2, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { initAffiliate } from "../../../services/api";

export type ClientType = "natural" | "juridica" | "firma_personal" | "ente_gubernamental" | "emprendedor" | null;
export type Plan = "basico" | "estandar" | "premium" | null;
export type PaymentPeriod = "mensual" | "semestral" | "anual";

interface AffiliationWizardProps {
    onComplete: (affiliateId: string, email: string) => void;
}

export function AffiliationWizard({ onComplete }: AffiliationWizardProps) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [currentStep, setCurrentStep] = useState(1);
    const [clientType, setClientType] = useState<ClientType>(null);
    const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<PaymentPeriod>("mensual");
    const [isComplete, setIsComplete] = useState(false);
    const [newAffiliateInfo, setNewAffiliateInfo] = useState<{ id: string, email: string } | null>(null);

    const steps = [
        { number: 1, title: "Tipo de Cliente", icon: "📋" },
        { number: 2, title: "Bienvenida", icon: "👋" },
        { number: 3, title: "Plan de Afiliación", icon: "💲" },
        { number: 4, title: "Confirmación y Pago", icon: "✅" },
    ];

    const handleClientTypeSelect = (type: ClientType) => {
        setClientType(type);
        setCurrentStep(2);
    };

    const handleWelcomeSubmit = (data: WelcomeData) => {
        setWelcomeData(data);
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePlanSelect = (plan: Plan, period: PaymentPeriod) => {
        setSelectedPlan(plan);
        setSelectedPeriod(period);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConfirm = async (paymentData: any) => {
        try {
            const payload = {
                clientType,
                email: welcomeData?.correoElectronico,
                password: welcomeData?.contrasena,
                fullName: `${welcomeData?.nombres} ${welcomeData?.apellidos || ""}`.trim(),
                selectedPlan,
                selectedPeriod,
                paymentMethod: paymentData.metodo_pago,
                paymentReference: paymentData.referencia,
                amount: paymentData.monto,
                bank: paymentData.banco || "Checkbank"
            };

            const result = await initAffiliate(payload);
            setNewAffiliateInfo({ id: result.affiliateId, email: result.username });
            setIsComplete(true);
        } catch (error: any) {
            console.error("Error initiating affiliate:", error);
            const errorMessage = error.message || "Error al procesar tu afiliación.";
            alert(`${errorMessage} Por favor, intenta de nuevo.`);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (isComplete && newAffiliateInfo) {
        return (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors">
                <div className="text-center">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">¡Afiliación Iniciada!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                        Tu solicitud ha sido recibida. Ahora debes activar tu cuenta.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
                        <p className="text-gray-700 dark:text-gray-200 mb-4">
                            Hemos creado tu cuenta de acceso temporal con el correo:
                        </p>
                        <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {newAffiliateInfo.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Usa este correo y la contraseña que elegiste para iniciar sesión en el siguiente paso.
                        </p>
                    </div>

                    <button
                        onClick={() => onComplete(newAffiliateInfo.id, newAffiliateInfo.email)}
                        className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        Ir a Activación ahora
                    </button>
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
                >
                    {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
            </div>

            {/* Progress Steps */}
            <div className="mb-12 w-full px-4">
                <div className="flex flex-row justify-between items-start relative w-full max-w-3xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative flex flex-col items-center flex-1">
                            {/* Line connecting circles */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-7 left-[50%] w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-0">
                                    <div
                                        className="h-full bg-blue-600 transition-all duration-500"
                                        style={{ width: currentStep > step.number ? '100%' : '0%' }}
                                    />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col items-center">
                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform ${currentStep >= step.number
                                        ? "bg-blue-600 text-white scale-110 shadow-lg ring-4 ring-blue-50 dark:ring-blue-900/30"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-700"
                                        }`}
                                >
                                    <span className="text-2xl">{step.icon}</span>
                                </div>
                                <p className={`mt-3 text-xs font-bold transition-colors uppercase tracking-wider ${currentStep >= step.number ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                                    }`}>
                                    {step.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="p-8 md:p-12">
                    {currentStep === 1 && <ClientTypeSelector onSelect={handleClientTypeSelect} />}
                    {currentStep === 2 && clientType && (
                        <WelcomeStep
                            clientType={clientType}
                            initialData={welcomeData || undefined}
                            onNext={handleWelcomeSubmit}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 3 && (
                        <PlanSelector
                            clientType={clientType}
                            selectedPlan={selectedPlan}
                            selectedPeriod={selectedPeriod}
                            onSelect={handlePlanSelect}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 4 && (
                        <ConfirmationStep
                            clientType={clientType}
                            clientData={{}} // Clear for now as it's partial
                            commerceData={{}}
                            selectedPlan={selectedPlan}
                            selectedPeriod={selectedPeriod}
                            welcomeData={welcomeData}
                            onConfirm={handleConfirm}
                            onBack={handleBack}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
