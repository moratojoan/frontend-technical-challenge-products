'use client';

import Image from 'next/image';
import ReactModal from 'react-modal';
import { useItems } from '@/providers/ItemsProvider';

import './styles.css';

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
          <li data-testid="favorite-item" key={item.title + item.description}>
            <h2>{item.title}</h2>
            <Image src={item.image} alt={item.title} width={100} height={100} />
          </li>
        ))}
      </section>
    </ReactModal>
  );
}
