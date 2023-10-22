import React from 'react';
import App from '@/app/page';
import data from './mocks/data.json';
import { render, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
const server = setupServer(
  rest.get(
    'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }
  )
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Item Manager App', () => {
  it('has a list of items with title, description, price, email and image', async () => {
    const { getAllByTestId } = render(await App());
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

  it('shows only items that has the key words submitted in the search form', async () => {
    const { getByLabelText, getAllByTestId } = render(await App());

    const searchInput = getByLabelText(/search\b/i);
    user.type(searchInput, 'piel[Enter]');
    await waitFor(() => {
      const products = getAllByTestId('product-item');
      products.forEach((product) => {
        expect(product).toHaveTextContent(/piel\b/i);
      });
    });
  });

  it("shows an error message when there's a server error", async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    const { getByText } = render(await App());

    expect(
      getByText('An error occurred during data fetching')
    ).toBeInTheDocument();
  });
});
