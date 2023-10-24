'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useItems } from '@/providers/ItemsProvider';
import styles from './styles.module.css';

export function SearchForm() {
  const { fetchItems } = useItems();
  const [keyWords, setKeyWords] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setKeyWords(event.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    fetchItems({ keyWords });
  };
  return (
    <form onSubmit={handleSubmit} className={styles['search-container']}>
      <label htmlFor="keyword" className="sr-only">
        Search items
      </label>
      <input
        id="keyword"
        type="text"
        placeholder="Search items..."
        onChange={handleInputChange}
        className={styles['search-input']}
      />
    </form>
  );
}
