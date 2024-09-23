import { newE2EPage } from '@stencil/core/testing';

describe('apie-ionic-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-ionic-form></apie-ionic-form>');

    const element = await page.find('apie-ionic-form');
    expect(element).toHaveClass('hydrated');
  });
});
