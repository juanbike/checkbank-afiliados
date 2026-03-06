import { useState } from "react";
import type { ClientType, Plan, PaymentPeriod } from "./subscription-wizard";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle } from "lucide-react";

interface PlanSelectorProps {
  clientType: ClientType;
  selectedPlan: Plan;
  selectedPeriod: PaymentPeriod;
  onSelect: (plan: Plan, period: PaymentPeriod) => void;
  onBack: () => void;
}

export function PlanSelector({ clientType, selectedPlan, selectedPeriod: initialPeriod, onSelect, onBack }: PlanSelectorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PaymentPeriod>(initialPeriod);

  const paymentPeriods = [
    {
      id: "mensual" as PaymentPeriod,
      name: "Mensual",
      icon: "💳",
      discount: 0,
      description: "Pago mes a mes",
      months: 1,
    },
    {
      id: "semestral" as PaymentPeriod,
      name: "Semestral",
      icon: "📅",
      discount: 20,
      description: "Pago cada 6 meses",
      months: 6,
      badge: "20% OFF",
    },
    {
      id: "anual" as PaymentPeriod,
      name: "Anual",
      icon: "🎯",
      discount: 30,
      description: "Pago anual",
      months: 12,
      badge: "30% OFF",
      popular: true,
    },
  ];

  const basePlans = [
    {
      id: "basico" as Plan,
      name: "Básico",
      basePrice: 29,
      description: "Uso personal o micro-emprendimiento",
      features: [
        "Control de ventas",
        "Integración con método link de pago/pos virtual",
        "Estadísticas del negocio",
        "Exportar e importar en Excel",
        "Cupón de descuento: aplica según el plan",
        "Conciliación gratuita por días",
      ],
      recommended: clientType === "natural",
    },
    {
      id: "estandar" as Plan,
      name: "Estándar",
      basePrice: 99,
      description: "PyMES y profesionales independientes",
      features: [
        "Servicio anterior más: integración con método botón de pago",
        "Descuentos pago mensual y/o anual",
        "Integración con otros servicios automatizados de recordatorios de pago",
        "Conciliación de tus transacciones (ventas y compras)",
        "Cupón de descuento: aplica según el plan",
      ],
      recommended: clientType === "juridica",
    },
    {
      id: "premium" as Plan,
      name: "Premium",
      basePrice: 299,
      description: "Grandes corporaciones y gobierno",
      features: [
        "Servicio anterior más:",
        "Credicheck",
        "App móvil",
        "Promoción por fidelización por compras",
        "Descuento por traer referidos/aliados",
        "Enlace con catálogo de productos",
        "Cupón de descuento: aplica según el plan",
      ],
      recommended: clientType === "ente_gubernamental",
    },
  ];

  // Calcular precio según periodo
  const calculatePrice = (basePrice: number, period: PaymentPeriod) => {
    const periodData = paymentPeriods.find(p => p.id === period);
    if (!periodData) return basePrice;
    
    const totalMonths = periodData.months;
    const discount = periodData.discount / 100;
    const priceWithDiscount = basePrice * (1 - discount);
    const totalPrice = priceWithDiscount * totalMonths;
    
    return {
      monthly: priceWithDiscount,
      total: totalPrice,
      originalTotal: basePrice * totalMonths,
      savings: (basePrice * totalMonths) - totalPrice,
    };
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onSelect(selectedPlan, selectedPeriod);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-2 text-gray-900 dark:text-white transition-colors">Selecciona tu Plan de Afiliación 💲</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 transition-colors">
        Elige primero el periodo de pago y luego el plan que mejor se adapte a tus necesidades
      </p>

      {/* Selector de Periodo de Pago */}
      <div className="mb-8">
        <h3 className="text-gray-900 dark:text-white mb-4 text-center">
          1️⃣ Selecciona el Periodo de Pago
        </h3>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {paymentPeriods.map((period) => (
            <div
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`relative rounded-lg border-2 p-5 transition-all cursor-pointer ${
                selectedPeriod === period.id
                  ? "border-blue-500 dark:border-blue-400 shadow-lg bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md bg-white dark:bg-gray-700"
              }`}
            >
              {period.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs">
                  ⭐ Más Popular
                </div>
              )}
              
              {period.badge && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs">
                  {period.badge}
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{period.icon}</span>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">{period.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{period.description}</p>
                  </div>
                </div>
                {selectedPeriod === period.id ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
              </div>

              {period.discount > 0 && (
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg px-3 py-2 mt-2">
                  <p className="text-sm text-green-700 dark:text-green-400 text-center">
                    Ahorra {period.discount}% 🎉
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selector de Plan */}
      <div className="mb-8">
        <h3 className="text-gray-900 dark:text-white mb-4 text-center">
          2️⃣ Selecciona tu Plan
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {basePlans.map((plan) => {
            const pricing = calculatePrice(plan.basePrice, selectedPeriod);
            const periodData = paymentPeriods.find(p => p.id === selectedPeriod);
            
            return (
              <div
                key={plan.id}
                className={`relative rounded-lg border-2 p-6 transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? "border-blue-500 dark:border-blue-400 shadow-lg bg-blue-50 dark:bg-blue-900/30"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md bg-white dark:bg-gray-700"
                }`}
                onClick={() => onSelect(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-xs">
                    ⭐ Recomendado
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="mb-3 text-gray-900 dark:text-white transition-colors">{plan.name}</h3>
                  
                  {/* Precio */}
                  <div className="mb-3">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-gray-900 dark:text-white transition-colors">
                        ${pricing.monthly.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/mes</span>
                    </div>
                    
                    {periodData && periodData.months > 1 && (
                      <div className="mt-2 space-y-1">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Facturado {selectedPeriod === "semestral" ? "semestralmente" : "anualmente"}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            ${pricing.total.toFixed(2)}
                          </p>
                          {pricing.savings > 0 && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              ¡Ahorras ${pricing.savings.toFixed(2)}!
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(plan.id, selectedPeriod);
                  }}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {selectedPlan === plan.id ? "Seleccionado ✓" : "Seleccionar"}
                </button>
              </div>
            );
          })}
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
          type="button"
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            selectedPlan
              ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
