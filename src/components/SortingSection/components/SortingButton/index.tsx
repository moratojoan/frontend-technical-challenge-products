import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface SortingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export function SortingButton({
  children,
  selected,
  ...props
}: SortingButtonProps) {
  return (
    <button
      className={`${styles['sorting-button']} ${
        selected ? styles['sorting-button--selected'] : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
