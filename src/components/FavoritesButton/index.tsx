'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicFavoriteModal = dynamic(() =>
  import('../FavoritesModal').then((mod) => mod.FavoriteModal)
);

export function FavoritesButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open favorites</button>
      {isOpen && (
        <DynamicFavoriteModal open={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
