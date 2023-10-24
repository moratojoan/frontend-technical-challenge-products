import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  size?: 'small' | 'large';
  className?: string;
}
export function Button({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles['button'],
        variant === 'primary' && styles['button--primary'],
        size === 'small' ? styles['button--small'] : styles['button--large'],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
