import React from 'react';
import App, { data } from '@/app/page';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Item Manager App', () => {
  it('has an item including a title, description, a price and an email', () => {
    const { getByText, getByAltText } = render(<App />);

    expect(getByText(data.title)).toBeInTheDocument();
    expect(getByText(data.description)).toBeInTheDocument();
    expect(getByText(data.price)).toBeInTheDocument();
    expect(getByText(data.email)).toBeInTheDocument();
    expect(getByAltText(data.title)).toHaveAttribute('src', data.image);
  });
});
