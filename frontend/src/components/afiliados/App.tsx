import { useEffect, useState } from "react";
import "./suppress-metamask";
import { AffiliationWizard } from "./components/AffiliationWizard";
import { ActivationWizard } from "./components/ActivationWizard";
import logo from "figma:asset/1422287ecf4a6c3101a357f9e8ec74d3c31da9a9.png";

export default function App() {
  const [view, setView] = useState<"affiliation" | "activation">("affiliation");
  const [affiliateId, setAffiliateId] = useState<string | null>(null);

  useEffect(() => {
    // Suprimir completamente mensajes de MetaMask en tiempo de ejecución
    const originalInfo = console.info;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    const shouldSuppress = (args: any[]) => {
      const str = args.map(a => String(a)).join(' ').toLowerCase();
      return str.includes('metamask') ||
        str.includes('failed to connect') ||
        str.includes('ethereum') ||
        str.includes('wallet') ||
        str.includes('web3');
    };

    console.info = (...args: any[]) => {
      if (!shouldSuppress(args)) originalInfo.apply(console, args);
    };

    console.error = (...args: any[]) => {
      if (!shouldSuppress(args)) originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      if (!shouldSuppress(args)) originalWarn.apply(console, args);
    };

    console.log = (...args: any[]) => {
      if (!shouldSuppress(args)) originalLog.apply(console, args);
    };
  }, []);

  const handleAffiliationComplete = (id: string) => {
    setAffiliateId(id);
    setView("activation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img
            src={logo}
            alt="Checkbank Logo"
            className="h-28 mx-auto mb-6 transform hover:scale-105 transition-transform"
          />
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-white mb-2 tracking-tight">
            {view === "affiliation" ? "Módulo de Afiliación" : "Activación de Usuario"}
          </h1>
          <p className="text-blue-600 dark:text-blue-400 font-medium">Checkbank® Digital Banking</p>
        </div>

        {view === "affiliation" ? (
          <AffiliationWizard onComplete={handleAffiliationComplete} />
        ) : (
          <ActivationWizard
            initialAffiliateId={affiliateId}
            onComplete={() => window.location.href = "/login"}
          />
        )}
      </div>
    </div>
  );
}
