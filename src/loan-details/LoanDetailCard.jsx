import React, { useState, useEffect } from "react";
import { CheckCircle2, FileText, User, Calendar, Percent, IndianRupee, ArrowRight } from "lucide-react";

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="antialiased w-full max-w-6xl mx-auto p-4 sm:p-6 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Skeleton */}
          <div className="md:w-1/2 lg:w-3/5 p-6">
            <div className="bg-gray-200 rounded-lg" style={{ height: '270px', maxWidth: '480px', margin: '0 auto' }}></div>
          </div>
          
          {/* Details Skeleton */}
          <div className="md:w-1/2 lg:w-2/5 p-6 pl-3 flex flex-col justify-center space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Grid Skeleton */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(0, 41, 83, 0.1)' }}>
          <div className="h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Key Features Skeleton */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Eligibility & Documents Skeleton */}
      <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LoanDetailCard({ loan, isLoading = false }) {
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

  // Show skeleton loader while loading
  if (isLoading || !loan) {
    return <SkeletonLoader />;
  }

  return (
    <div className="antialiased w-full max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header Section with Image Left and Details Right */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image Section with Vertical Swiper */}
          <div className="md:w-1/2 lg:w-3/5 relative overflow-hidden p-6 pe-0 pl-2" >
            <div className="relative flex items-center justify-center p-2">
              {/* Image Container */}
              <div className="relative flex items-center justify-center" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                <img
                  src={images[currentImageIndex]}
                  alt={`${loan.name} - Image ${currentImageIndex + 1}`}
                  className="w-auto h-auto object-contain transition-opacity duration-500"
                  style={{ maxWidth: 'min(480px, 100%)', maxHeight: 'min(270px, 100%)' }}
                  key={currentImageIndex}
                />
              </div>

              {/* Vertical Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg px-3 py-2 transition-all cursor-pointer"
                    aria-label="Previous image"
                    style={{ paddingTop: '8px', paddingBottom: '12px' }}
                  >
                    <span className="text-white font-bold text-sm">▲</span>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-lg px-3 py-2 transition-all cursor-pointer"
                    aria-label="Next image"
                    style={{ paddingTop: '12px', paddingBottom: '8px' }}
                  >
                    <span className="text-white font-bold text-sm">▼</span>
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
          <div className="md:w-1/2 lg:w-2/5 p-6 pl-3 flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#002953' }}>
              {loan.name}
            </h1>
            <p className="text-base sm:text-lg mt-2" style={{ color: '#ff8900', fontWeight: '500' }}>
              {loan.tagline}
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed" style={{ color: '#002953', opacity: 0.8 }}>
              {loan.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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

        {/* CTA Button */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(0, 41, 83, 0.1)' }}>
          <a
            href={loan.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-full text-white px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:opacity-90 active:opacity-100 transition-opacity"
            style={{ backgroundColor: '#ff8900' }}
          >
            Apply for {loan.name}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <p className="text-xs text-center mt-2 sm:mt-3" style={{ color: '#002953', opacity: 0.6 }}>
            Visit bajajfinserv.in for more details
          </p>
        </div>
      </div>

      {/* Key Features */}
      {/* <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#ff8900' }} />
            Key Features
          </h2>
          <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
      </div> */}

      {/* Eligibility & Documents Grid */}
      {/* <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
              <User className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#ff8900' }} />
              Eligibility Criteria
            </h2>
            <div className="mt-3 sm:mt-4 space-y-2">
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

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: '#002953' }}>
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#ff8900' }} />
              Documents Required
            </h2>
            <div className="mt-3 sm:mt-4 space-y-2">
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
      </div> */}
    </div>
  );
}
