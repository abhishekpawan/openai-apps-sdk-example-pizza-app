import React from "react";
import { createRoot } from "react-dom/client";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import loansData from "./albums.json";
import { useMaxHeight } from "../use-max-height";
import { useOpenAiGlobal } from "../use-openai-global";
import FullscreenViewer from "./FullscreenViewer";
import AlbumCard from "./AlbumCard";

function LoansCarousel({ onSelect }) {
  const loanTypes = loansData?.loanTypes || [];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
    dragFree: false,
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  return (
    <div className="antialiased relative w-full py-5 select-none" style={{ backgroundColor: '#002953', color: 'white' }}>
      <div className="overflow-hidden max-sm:mx-5" ref={emblaRef}>
        <div className="flex gap-5 items-stretch">
          {loanTypes.map((loanType) => (
            <AlbumCard key={loanType.id} album={loanType} onSelect={onSelect} />
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className={
          "pointer-events-none absolute inset-y-0 left-0 w-3 z-[5] transition-opacity duration-200 " +
          (canPrev ? "opacity-100" : "opacity-0")
        }
      >
        <div
          className="h-full w-full border-l bg-gradient-to-r from-[#ff8900]/30 to-transparent"
          style={{
            borderColor: '#ff8900',
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className={
          "pointer-events-none absolute inset-y-0 right-0 w-3 z-[5] transition-opacity duration-200 " +
          (canNext ? "opacity-100" : "opacity-0")
        }
      >
        <div
          className="h-full w-full border-r bg-gradient-to-l from-[#ff8900]/30 to-transparent"
          style={{
            borderColor: '#ff8900',
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)",
          }}
        />
      </div>
      {canPrev && (
        <button
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full shadow-lg ring"
          style={{ backgroundColor: '#ff8900', color: 'white', ringColor: 'rgba(255, 137, 0, 0.3)' }}
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          type="button"
        >
          <ArrowLeft
            strokeWidth={1.5}
            className="h-4.5 w-4.5"
            aria-hidden="true"
          />
        </button>
      )}
      {canNext && (
        <button
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full shadow-lg ring"
          style={{ backgroundColor: '#ff8900', color: 'white', ringColor: 'rgba(255, 137, 0, 0.3)' }}
          onClick={() => emblaApi && emblaApi.scrollNext()}
          type="button"
        >
          <ArrowRight
            strokeWidth={1.5}
            className="h-4.5 w-4.5"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

function App() {
  const displayMode = useOpenAiGlobal("displayMode");
  const [selectedLoan, setSelectedLoan] = React.useState(null);
  const maxHeight = useMaxHeight() ?? undefined;

  const handleSelectLoan = (loanType) => {
    setSelectedLoan(loanType);
    if (window?.webplus?.requestDisplayMode) {
      window.webplus.requestDisplayMode({ mode: "fullscreen" });
    }
  };

  return (
    <div
      className="relative antialiased w-full"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
        backgroundColor: displayMode === "fullscreen" ? '#002953' : 'transparent',
      }}
    >
      {displayMode !== "fullscreen" && (
        <LoansCarousel onSelect={handleSelectLoan} />
      )}

      {displayMode === "fullscreen" && selectedLoan && (
        <FullscreenViewer album={selectedLoan} />
      )}
    </div>
  );
}

createRoot(document.getElementById("pizzaz-albums-root")).render(<App />);
