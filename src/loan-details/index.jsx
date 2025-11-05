import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import loansData from "./loans-info.json";
import LoanDetailCard from "./LoanDetailCard";
import { useWidgetProps } from "../use-widget-props";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loan, setLoan] = useState(null);
  
  // Get the loan type from widget props, default to personal-loan
  const props = useWidgetProps();
  
  useEffect(() => {
    // Wait for props to be available
    if (!props) return;
    
    const loanType = props?.loanProduct || "personal-loan";
    
    // Get the specific loan details
    const loanData = loansData.loanTypes[loanType];
    
    setLoan(loanData);
    setIsLoading(false);
  }, [props]);

  if (isLoading) {
    return <LoanDetailCard loan={null} isLoading={true} />;
  }

  if (!loan) {
    return (
      <div className="antialiased w-full min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#002953' }}>
            Loan Information Not Found
          </h1>
          <p className="mt-2" style={{ color: '#002953', opacity: 0.7 }}>
            The requested loan type is not available.
          </p>
          <p className="mt-4 text-sm" style={{ color: '#002953', opacity: 0.5 }}>
            Available loan types: personal-loan, gold-loan, home-loan, business-loan, car-loan, loan-against-property
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased w-full min-h-screen py-6" style={{ backgroundColor: '#f5f5f5' }}>
      <LoanDetailCard loan={loan} isLoading={false} />
    </div>
  );
}

const container = document.getElementById("loan-details-root");
if (!container) {
  throw new Error("Could not find #loan-details-root");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
