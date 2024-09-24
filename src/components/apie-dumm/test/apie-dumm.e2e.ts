import { newE2EPage } from '@stencil/core/testing';

describe('apie-dumm', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-dumm></apie-dumm>');

    const element = await page.find('apie-dumm');
    expect(element).toHaveClass('hydrated');
  });
});
