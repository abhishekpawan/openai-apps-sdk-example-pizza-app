import React from "react";
import { createRoot } from "react-dom/client";
import loansData from "../loan-details/loans-info.json";
import LoanDetailCard from "../loan-details/LoanDetailCard";

function App() {
  // Always show business loan details
  const loan = loansData.loanTypes["business-loan"];

  if (!loan) {
    return (
      <div className="antialiased w-full min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#002953' }}>
            Business Loan Information Not Available
          </h1>
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

const container = document.getElementById("business-loan-details-root");
if (!container) {
  throw new Error("Could not find #business-loan-details-root");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
