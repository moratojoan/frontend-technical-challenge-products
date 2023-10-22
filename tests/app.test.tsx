import React from 'react';
import App from '@/app/page';

import { render, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import data from './mocks/data.json';
import dataToSort from './mocks/dataToSort.json';

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
  it('shows a list of maximum 5 items with title, description, price, email and image', async () => {
    const { getAllByTestId } = render(await App());
    const products = getAllByTestId('product-item');

    data.items.slice(0, 5).forEach((item, index) => {
      expect(products.length <= 5).toBe(true);
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

  it('shows only items that has the key words submitted in the search form', async () => {
    const { getByLabelText, getAllByTestId } = render(await App());

    const searchInput = getByLabelText(/search\b/i);
    await user.type(searchInput, 'piel[Enter]');
    await waitFor(() => {
      const products = getAllByTestId('product-item');
      products.forEach((product) => {
        expect(product).toHaveTextContent(/piel\b/i);
      });
    });
  });

  it('shows items ordered asc by title after pressing the title button sorting one time', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /title\b/i });
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('iPhone 6S Oro');
      expect(products[1]).toHaveTextContent('Polaroid 635');
      expect(products[2]).toHaveTextContent('Reloj de Daniel Wellington');
    });
  });

  it('shows items ordered desc by title after pressing the title button sorting two times', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /title\b/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('Reloj de Daniel Wellington');
      expect(products[1]).toHaveTextContent('Polaroid 635');
      expect(products[2]).toHaveTextContent('iPhone 6S Oro');
    });
  });

  it('shows items ordered asc by description after pressing the description button sorting one time', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /description\b/i });
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('Cámara clásica');
      expect(products[1]).toHaveTextContent('Reloj de la ');
      expect(products[2]).toHaveTextContent('Vendo un iPhone');
    });
  });

  it('shows items ordered desc by description after pressing the description button sorting two times', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /description\b/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('Vendo un iPhone');
      expect(products[1]).toHaveTextContent('Reloj de la ');
      expect(products[2]).toHaveTextContent('Cámara clásica');
    });
  });

  it('shows items ordered asc by email after pressing the email button sorting one time', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /email\b/i });
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('cameramail@wallapop.com');
      expect(products[1]).toHaveTextContent('iphonemail@wallapop.com');
      expect(products[2]).toHaveTextContent('watchmail@wallapop.com');
    });
  });

  it('shows items ordered desc by email after pressing the email button sorting two times', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /email\b/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('watchmail@wallapop.com');
      expect(products[1]).toHaveTextContent('iphonemail@wallapop.com');
      expect(products[2]).toHaveTextContent('cameramail@wallapop.com');
    });
  });

  it('shows items ordered asc by price after pressing the price button sorting one time', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /price\b/i });
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('50');
      expect(products[1]).toHaveTextContent('100');
      expect(products[2]).toHaveTextContent('740');
    });
  });

  it('shows items ordered desc by price after pressing the price button sorting two times', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId } = render(await App());

    const button = getByRole('button', { name: /price\b/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products[0]).toHaveTextContent('740');
      expect(products[1]).toHaveTextContent('100');
      expect(products[2]).toHaveTextContent('50');
    });
  });

  it('shows the items that match the key words submitted in the search form and ordered asc by title after pressing the title button sorting one time', async () => {
    server.use(
      rest.get(
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(dataToSort));
        }
      )
    );

    const { getByRole, getAllByTestId, getByLabelText } = render(await App());

    const searchInput = getByLabelText(/search\b/i);
    await user.type(searchInput, 'color[Enter]');
    const button = getByRole('button', { name: /title\b/i });
    await user.click(button);

    await waitFor(() => {
      const products = getAllByTestId('product-item');
      expect(products.length).toBe(2);
      expect(products[0]).toHaveTextContent('iPhone 6S Oro');
      expect(products[1]).toHaveTextContent('Polaroid 635');
    });
  });
});
