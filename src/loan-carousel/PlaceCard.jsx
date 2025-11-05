import React from "react";
import { Star } from "lucide-react";

export default function PlaceCard({ place }) {
  if (!place) return null;
  return (
    <div className="min-w-[220px] select-none max-w-[220px] w-[65vw] sm:w-[220px] self-stretch flex flex-col bg-white rounded-2xl p-4 shadow-lg">
      <div className="w-full">
        <img
          src={place.thumbnail}
          alt={place.name}
          className="w-full aspect-square rounded-xl object-cover"
        />
      </div>
      <div className="mt-3 flex flex-col flex-1">
        <div className="text-base font-semibold truncate line-clamp-1" style={{ color: '#002953' }}>
          {place.name}
        </div>
        <div className="text-xs mt-1 flex items-center gap-1" style={{ color: '#ff8900' }}>
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          {place.rating?.toFixed ? place.rating.toFixed(1) : place.rating}
          {place.interestRate ? <span>· {place.interestRate}</span> : null}
        </div>
        {place.description ? (
          <div className="text-sm mt-2 flex-auto" style={{ color: '#002953', opacity: 0.8 }}>
            {place.description}
          </div>
        ) : null}
        <div className="mt-4">
          <button
            type="button"
            className="cursor-pointer w-full inline-flex items-center justify-center rounded-full text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:opacity-100"
            style={{ backgroundColor: '#ff8900' }}
            onClick={() => window.open(place.applyUrl || 'https://www.bajajfinserv.in/loans', '_blank')}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
