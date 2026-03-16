import { useState } from "react";
import { CheckCircle2, Lock, User, ShieldCheck } from "lucide-react";
import { ClientDataForm } from "./client-data-form";
import { CommerceInfoForm } from "./commerce-info-form";
import { activateAffiliate, loginUser } from "../../../services/api";
import type { ClientType, ClientData, CommerceData } from "./subscription-wizard";

interface ActivationWizardProps {
    initialAffiliateId?: string | null;
}

export function ActivationWizard({ initialAffiliateId }: ActivationWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Store variables instead of states if we never set them
    const affiliateId = initialAffiliateId;
    const clientType: ClientType = "natural"; // Default or derived later
    const [clientData, setClientData] = useState<ClientData>({});
    const [commerceData, setCommerceData] = useState<CommerceData>({});

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const steps = [
        { number: 1, title: "Inicio de Sesión", icon: <Lock className="w-6 h-6" /> },
        { number: 2, title: "Verificación", icon: <ShieldCheck className="w-6 h-6" /> },
        { number: 3, title: "Datos del Cliente", icon: <User className="w-6 h-6" /> },
        { number: 4, title: "Info Comercio", icon: "🏢" },
        { number: 5, title: "Confirmación", icon: "✅" },
    ];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await loginUser({ username: loginEmail, password: loginPassword });
            setUser(result.user);
            setIsAuthenticated(true);
            setCurrentStep(2);
            // In a real scenario, we would fetch the affiliateId linked to this user
            // For now, if we have initialAffiliateId from the previous flow, we use it.
            // If not, we might need an endpoint to get pending affiliation for user.
        } catch (error: any) {
            alert(error.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationNext = () => {
        setCurrentStep(3);
    };

    const handleClientDataSubmit = (data: ClientData) => {
        setClientData(data);
        setCurrentStep(4);
    };

    const handleCommerceSubmit = (data: CommerceData) => {
        setCommerceData(data);
        setCurrentStep(5);
    };

    const handleFinalConfirm = async () => {
        setLoading(true);
        try {
            if (!affiliateId) {
                // Fallback if we don't have ID, we need to pass it or find it
                alert("Error: ID de afiliación no encontrado.");
                return;
            }
            await activateAffiliate({
                affiliateId,
                clientData: { ...clientData, clientType },
                commerceData
            });
            setCurrentStep(6); // Final success
        } catch (error) {
            alert("Error al activar la cuenta. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (currentStep === 6) {
        return (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center border border-green-100 dark:border-green-900/30">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¡Cuenta Activada!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
                    Tu comercio ha sido registrado exitosamente. Ahora puedes acceder a tu panel de control completo.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-700 transition-all"
                >
                    Ir al Inicio de Sesión
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header removido para unificar modo oscuro en App.tsx */}

            <div className="mb-12">
                <div className="flex justify-between items-center px-4">
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex flex-col items-center relative flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-all duration-300 ${currentStep >= step.number ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                }`}>
                                {step.icon}
                            </div>
                            <span className={`text-xs font-semibold text-center hidden md:block ${currentStep >= step.number ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                                }`}>{step.title}</span>
                            {index < steps.length - 1 && (
                                <div className={`absolute top-6 left-[50%] w-full h-0.5 -z-0 bg-gray-200 dark:bg-gray-700`}>
                                    <div className={`h-full bg-blue-600 transition-all duration-500 ${currentStep > step.number ? 'w-full' : 'w-0'}`} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
                {currentStep === 1 && (
                    <div className="max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Inicia sesión para activar</h3>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="tu@correo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
                            >
                                {loading ? "Cargando..." : "Ingresar"}
                            </button>
                        </form>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">Verificando tu Cuenta</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                            Hola {user?.full_name}, hemos verificado tu inicio de sesión. Ahora completaremos el registro de tu comercio.
                        </p>
                        <button
                            onClick={handleVerificationNext}
                            className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                        >
                            Comenzar Registro de Datos
                        </button>
                    </div>
                )}

                {currentStep === 3 && (
                    <ClientDataForm
                        clientType={clientType}
                        initialData={clientData}
                        onSubmit={handleClientDataSubmit}
                        onBack={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 4 && (
                    <CommerceInfoForm
                        initialData={commerceData}
                        onSubmit={handleCommerceSubmit}
                        onBack={() => setCurrentStep(3)}
                    />
                )}

                {currentStep === 5 && (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold mb-6 dark:text-white">Confirmación Final</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto">
                            Estás a punto de activar tu cuenta permanentemente. Por favor confirma que todos los datos suministrados son correctos.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setCurrentStep(4)}
                                className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                Revisar Datos
                            </button>
                            <button
                                onClick={handleFinalConfirm}
                                disabled={loading}
                                className="px-12 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                            >
                                {loading ? "Procesando..." : "Confirmar y Activar"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
