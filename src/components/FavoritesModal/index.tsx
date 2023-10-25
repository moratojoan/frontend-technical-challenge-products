'use client';

import ReactModal from 'react-modal';
import { FavoritesSection } from '../FavoritesSection';
// import styles from './styles.module.css';
import './styles.css';

interface FavoriteModalProps {
  open: boolean;
  onClose: () => void;
}

ReactModal.setAppElement('#main');
export function FavoriteModal({ open, onClose }: FavoriteModalProps) {
  return (
    <ReactModal
      isOpen={open}
      contentLabel="Favorite Items Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={{
        content: {
          padding: 0,
          inset: 0,
        },
      }}
    >
      <FavoritesSection onClose={onClose} />
    </ReactModal>
  );
}
