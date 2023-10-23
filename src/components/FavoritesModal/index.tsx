'use client';

import ReactModal from 'react-modal';
import './styles.css';

import { FavoritesSection } from '../FavoritesSection';

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
    >
      <FavoritesSection onClose={onClose} />
    </ReactModal>
  );
}
