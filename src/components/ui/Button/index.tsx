import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'secondary';
  size?: 'small' | 'normal' | 'large';
  className?: string;
}
export function Button({
  children,
  variant = 'primary',
  size = 'normal',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles['button'],
        variant === 'primary' && styles['button--primary'],
        variant === 'outlined' && styles['button--outlined'],
        variant === 'secondary' && styles['button--secondary'],
        size === 'small' && styles['button--small'],
        size === 'large' && styles['button--large'],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
