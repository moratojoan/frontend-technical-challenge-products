import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Search Items', () => {
  test('search items by keywords, shows a list of items contaning these key workds', async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(
      'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json'
    );
    const searchInput = page.getByLabel(/search\b/i);
    const keyWord = 'iphone';
    await searchInput.fill(keyWord);
    await searchInput.press('Enter');
    const response = await responsePromise;
    await response.json();
    const itemsTexts = await page.getByTestId('product-item').allInnerTexts();
    const allItemsContainTheKeyWord = itemsTexts.every((value) =>
      value.includes(keyWord)
    );
    expect(allItemsContainTheKeyWord).toBe(true);
  });
});

test.describe('Sort Items', () => {
  test("click on 'title' sorting button, shows a list of items sorted by title", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(
      'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json'
    );
    await page.getByRole('button', { name: /title\b/i }).click();
    const response = await responsePromise;
    await response.json();
    const productTitles = await page
      .getByTestId('product-item')
      .getByRole('heading')
      .allInnerTexts();
    const productTitlesSorted = productTitles.slice().sort();
    const isSorted = productTitlesSorted.every(
      (value, index) => value === productTitles[index]
    );
    expect(isSorted).toBe(true);
  });
});

test.describe('Favorite Items', () => {
  test("click on the 'add to favorites' button of an item and that item will be displayed in the 'favorite items' modal.", async ({
    page,
  }) => {
    const firstProduct = page.getByTestId('product-item').first();
    const firstProductTitle = await firstProduct
      .getByRole('heading')
      .textContent();
    await firstProduct
      .getByRole('button', { name: /add to favorites\b/i })
      .click();
    await page.getByRole('button', { name: /open favorites\b/i }).click();
    const modal = page.getByRole('dialog');
    const firstFavorite = modal.getByTestId('favorite-item').first();
    const firstFavoriteTitle = await firstFavorite
      .getByRole('heading')
      .textContent();
    expect(firstFavoriteTitle).toBe(firstProductTitle);
  });
});

test.describe('Pagination', () => {
  test('shows initially 5 products', async ({ page }) => {
    const productCount = await page.getByTestId('product-item').count();
    expect(productCount).toBe(5);
  });
  test("shows 5 products more when clicking 'show more' button", async ({
    page,
  }) => {
    const productCountBeforeClick = await page
      .getByTestId('product-item')
      .count();
    const responsePromise = page.waitForResponse(
      'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json'
    );
    await page.getByRole('button', { name: /show more items\b/i }).click();
    const response = await responsePromise;
    await response.json();
    const productCountAfterClick = await page
      .getByTestId('product-item')
      .count();
    expect(productCountAfterClick - productCountBeforeClick).toBe(5);
  });
});
