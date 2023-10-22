'use client';
import ReactModal from 'react-modal';
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
    >
      <h1>Favorite Items</h1>
      <button onClick={onClose}>Close Modal</button>
    </ReactModal>
  );
}
