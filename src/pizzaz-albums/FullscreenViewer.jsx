import React from "react";
import { useMaxHeight } from "../use-max-height";
import FilmStrip from "./FilmStrip";

export default function FullscreenViewer({ album }) {
  const maxHeight = useMaxHeight() ?? undefined;
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setIndex(0);
  }, [album?.id]);

  const detail = album?.details?.[index];

  return (
    <div
      className="relative w-full h-full"
      style={{
        maxHeight,
        height: maxHeight,
        backgroundColor: '#002953',
      }}
    >
      <div className="absolute inset-0 flex flex-row overflow-hidden">
        {/* Film strip */}
        <div className="hidden md:block absolute pointer-events-none z-10 left-0 top-0 bottom-0 w-40">
          <FilmStrip album={album} selectedIndex={index} onSelect={setIndex} />
        </div>
        {/* Main detail view */}
        <div className="flex-1 min-w-0 px-40 py-10 relative flex items-center justify-center">
          <div className="relative w-full h-full">
            {detail ? (
              <div className="absolute inset-0 m-auto rounded-3xl shadow-lg border max-w-full max-h-full flex flex-col items-center justify-center p-8"
                style={{ borderColor: '#ff8900', backgroundColor: 'white' }}>
                <img
                  src={detail.url}
                  alt={detail.title || album.title}
                  className="rounded-2xl shadow-sm max-w-[600px] max-h-[400px] object-contain mb-6"
                />
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#002953' }}>
                  {detail.title}
                </h2>
                {detail.description && (
                  <p className="text-lg text-center max-w-xl mb-6" style={{ color: '#002953' }}>
                    {detail.description}
                  </p>
                )}
                <button
                  type="button"
                  className="cursor-pointer inline-flex items-center justify-center rounded-full text-white px-6 py-3 text-base font-medium hover:opacity-90 active:opacity-100 shadow-md"
                  style={{ backgroundColor: '#ff8900' }}
                  onClick={() => window.open(album.applyUrl || 'https://www.bajajfinserv.in/loans', '_blank')}
                >
                  Apply Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
