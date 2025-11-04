import React from "react";
import { createRoot } from "react-dom/client";
import loansData from "./loans-info.json";
import LoanDetailCard from "./LoanDetailCard";
import { useWidgetProps } from "../use-widget-props";

function App() {
  // Get the loan type from widget props, default to personal-loan
  const props = useWidgetProps();
  const loanType = props?.loanProduct || "personal-loan";
  
  // Get the specific loan details
  const loan = loansData.loanTypes[loanType];

  if (!loan) {
    return (
      <div className="antialiased w-full min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#002953' }}>
            Loan Information Not Found
          </h1>
          <p className="mt-2" style={{ color: '#002953', opacity: 0.7 }}>
            The requested loan type "{loanType}" is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased w-full min-h-screen py-6" style={{ backgroundColor: '#f5f5f5' }}>
      <LoanDetailCard loan={loan} />
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
