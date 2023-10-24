import { ReactNode } from 'react';
import styles from './styles.module.css';

interface HeaderProps {
  children?: ReactNode;
}
export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1>Item Manager</h1>
        {children}
      </div>
    </header>
  );
}
