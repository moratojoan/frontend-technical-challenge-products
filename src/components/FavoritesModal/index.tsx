'use client';

import Image from 'next/image';
import ReactModal from 'react-modal';
import { useItems } from '@/providers/ItemsProvider';

import './styles.css';
import { FavoriteListItem } from '../FavoriteListItem';

interface FavoriteModalProps {
  open: boolean;
  onClose: () => void;
}

ReactModal.setAppElement('#main');
export function FavoriteModal({ open, onClose }: FavoriteModalProps) {
  const { favorites } = useItems();

  return (
    <ReactModal
      isOpen={open}
      contentLabel="Favorite Items Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <header>
        <h1>Favorite Items</h1>
        <button onClick={onClose}>Close Modal</button>
      </header>
      <section>
        {favorites.map((item) => (
          <FavoriteListItem key={item.title + item.description} item={item} />
        ))}
      </section>
    </ReactModal>
  );
}
