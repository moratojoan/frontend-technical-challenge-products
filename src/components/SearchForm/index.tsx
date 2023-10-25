'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useItems } from '@/providers/ItemsProvider';
import { SearchInput } from '@/components/ui/SearchInput';
import styles from './styles.module.css';
import { Button } from '../ui/Button';

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
      <SearchInput
        id="keyword"
        type="text"
        placeholder="Search items..."
        onChange={handleInputChange}
      />
    </form>
  );
}
