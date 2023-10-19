import React from 'react';
import App from '@/app/page';
import data from '@/app/data.json';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Item Manager App', () => {
  it('has a list of items with title, description, price, email and image', () => {
    const { getAllByTestId, getByText, getByAltText } = render(<App />);
    const products = getAllByTestId('product-item');

    data.items.forEach((item, index) => {
      expect(products[index]).toHaveTextContent(item.title);
      expect(products[index]).toHaveTextContent(item.description);
      expect(products[index]).toHaveTextContent(item.price);
      expect(products[index]).toHaveTextContent(item.email);
      expect(within(products[index]).getByAltText(item.title)).toHaveAttribute(
        'src',
        item.image
      );
    });
  });
});
