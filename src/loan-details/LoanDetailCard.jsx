import React, { useState, useEffect } from "react";
import { CheckCircle2, FileText, User, Calendar, Percent, IndianRupee, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export default function LoanDetailCard({ loan }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = loan?.images || [loan?.thumbnail];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, hasMultipleImages]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  if (!loan) return null;

  return (
    <div className="antialiased w-full max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header Section with Image Left and Details Right */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image Section with Vertical Swiper */}
          <div className="lg:w-2/5 relative" style={{ backgroundColor: '#002953' }}>
            <div className="relative flex items-center justify-center h-64 lg:h-full min-h-[300px] p-8">
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={images[currentImageIndex]}
                  alt={`${loan.name} - Image ${currentImageIndex + 1}`}
                  className="h-48 lg:h-64 w-auto object-contain transition-opacity duration-500"
                  key={currentImageIndex}
                />
              </div>

              {/* Vertical Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronUp className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronDown className="h-5 w-5 text-white" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white h-4'
                            : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Right: Details Section */}
          <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#002953' }}>
                {loan.name}
              </h1>
              <p className="text-lg mt-2" style={{ color: '#ff8900', fontWeight: '500' }}>
                {loan.tagline}
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#002953', opacity: 0.8 }}>
                {loan.description}
              </p>

              {/* Quick Info Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4" style={{ color: '#ff8900' }} />
                    <span className="text-xs font-medium" style={{ color: '#002953', opacity: 0.7 }}>
                      Interest Rate
                    </span>
                  </div>
                  <div className="text-base font-semibold" style={{ color: '#002953' }}>
                    From {loan.interestRate}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" style={{ color: '#ff8900' }} />
                    <span className="text-xs font-medium" style={{ color: '#002953', opacity: 0.7 }}>
                      Loan Amount
                    </span>
                  </div>
                  <div className="text-base font-semibold" style={{ color: '#002953' }}>
                    {loan.loanAmount}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" style={{ color: '#ff8900' }} />
                    <span className="text-xs font-medium" style={{ color: '#002953', opacity: 0.7 }}>
                      Tenure
                    </span>
                  </div>
                  <div className="text-base font-semibold" style={{ color: '#002953' }}>
                    {loan.tenure}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" style={{ color: '#ff8900' }} />
                    <span className="text-xs font-medium" style={{ color: '#002953', opacity: 0.7 }}>
                      Processing Fee
                    </span>
                  </div>
                  <div className="text-base font-semibold" style={{ color: '#002953' }}>
                    {loan.processingFee}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(0, 41, 83, 0.1)' }}>
              <a
                href={loan.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-full text-white px-6 py-4 text-base font-semibold hover:opacity-90 active:opacity-100 transition-opacity"
                style={{ backgroundColor: '#ff8900' }}
              >
                Apply for {loan.name}
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="text-xs text-center mt-3" style={{ color: '#002953', opacity: 0.6 }}>
                Visit bajajfinserv.in for more details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
            <CheckCircle2 className="h-6 w-6" style={{ color: '#ff8900' }} />
            Key Features
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#ff8900' }} />
                <span className="text-sm" style={{ color: '#002953', opacity: 0.8 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligibility & Documents Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eligibility Criteria */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
              <User className="h-6 w-6" style={{ color: '#ff8900' }} />
              Eligibility Criteria
            </h2>
            <div className="mt-4 space-y-2">
              {loan.eligibility.map((criterion, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#ff8900' }} />
                  <span className="text-sm" style={{ color: '#002953', opacity: 0.8 }}>
                    {criterion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Required */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
              <FileText className="h-6 w-6" style={{ color: '#ff8900' }} />
              Documents Required
            </h2>
            <div className="mt-4 space-y-2">
              {loan.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#ff8900' }} />
                  <span className="text-sm" style={{ color: '#002953', opacity: 0.8 }}>
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
