import React from "react";

function AlbumCard({ album, onSelect }) {
  const detailsCount = album.details?.length || 0;
  const detailsLabel = detailsCount === 1 ? "detail" : "details";

  return (
    <button
      type="button"
      className="group relative cursor-pointer flex-shrink-0 w-[272px] text-left transition-transform hover:scale-105"
      style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden' }}
      onClick={() => onSelect?.(album)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={album.cover}
          alt={album.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="pt-3 px-4 pb-4">
        <div className="text-base font-semibold truncate" style={{ color: '#002953' }}>
          {album.title}
        </div>
      </div>
    </button>
  );
}

export default AlbumCard;
