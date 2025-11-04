import React from "react";

export default function FilmStrip({ album, selectedIndex, onSelect }) {
  const details = album?.details || [];

  return (
    <div className="h-full w-full overflow-auto flex flex-col items-center justify-center p-5 space-y-5">
      {details.map((detail, idx) => (
        <button
          key={detail.id}
          type="button"
          onClick={() => onSelect?.(idx)}
          className={
            "block w-full p-[2px] pointer-events-auto rounded-[10px] cursor-pointer border transition-[colors,opacity] " +
            (idx === selectedIndex
              ? "opacity-100"
              : "opacity-60 hover:opacity-100")
          }
          style={{
            borderColor: idx === selectedIndex ? '#ff8900' : 'transparent',
          }}
        >
          <div className="aspect-[5/3] rounded-lg overflow-hidden w-full">
            <img
              src={detail.url}
              alt={detail.title || `Detail ${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
