import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';
import { clsx } from 'clsx';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <input {...props} className={clsx(styles['search-input'], className)} />
  );
}
