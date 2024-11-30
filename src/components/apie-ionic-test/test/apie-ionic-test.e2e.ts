import { newE2EPage } from '@stencil/core/testing';

describe('apie-ionic-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-ionic-test></apie-ionic-test>');

    const element = await page.find('apie-ionic-test');
    expect(element).toHaveClass('hydrated');
  });
});
