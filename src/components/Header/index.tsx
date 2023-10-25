import { ReactNode } from 'react';
import styles from './styles.module.css';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}
export function Header({ title, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  );
}
