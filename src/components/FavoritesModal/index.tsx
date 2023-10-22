'use client';

import Image from 'next/image';
import ReactModal from 'react-modal';
import { useItems } from '@/providers/ItemsProvider';

import './styles.css';
import { FavoriteListItem } from '../FavoriteListItem';
import { ChangeEventHandler, useState } from 'react';

interface FavoriteModalProps {
  open: boolean;
  onClose: () => void;
}

ReactModal.setAppElement('#main');
export function FavoriteModal({ open, onClose }: FavoriteModalProps) {
  const { favorites } = useItems();
  const [searchTitle, setSearchTitle] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTitle(event.target.value);
  };

  const favoritesFiltered = favorites.filter((item) =>
    item.title.toLowerCase().includes(searchTitle.trim().toLowerCase())
  );
  return (
    <ReactModal
      isOpen={open}
      contentLabel="Favorite Items Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <header>
        <h1>Favorite Items</h1>
        <label htmlFor="search-by-title">Search by title</label>
        <input
          id="search-by-title"
          type="text"
          placeholder="Search by title..."
          onChange={handleInputChange}
        />
        <button onClick={onClose}>Close Modal</button>
      </header>
      <section>
        {favoritesFiltered.map((item) => (
          <FavoriteListItem key={item.title + item.description} item={item} />
        ))}
      </section>
    </ReactModal>
  );
}
