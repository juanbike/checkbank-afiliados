import { AffiliationWizard } from "./components/afiliados/components/AffiliationWizard";
import { ActivationWizard } from "./components/afiliados/components/ActivationWizard";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [view, setView] = useState<"affiliation" | "activation">("affiliation");
  const [affiliateId, setAffiliateId] = useState<string | null>(null);

  const handleAffiliationComplete = (id: string) => {
    setAffiliateId(id);
    setView("activation");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-10">
        {view === "affiliation" ? (
          <AffiliationWizard onComplete={handleAffiliationComplete} />
        ) : (
          <ActivationWizard initialAffiliateId={affiliateId} onComplete={function (): void {
              throw new Error("Function not implemented.");
            } } />
        )}
      </div>
    </div>
  );
}
