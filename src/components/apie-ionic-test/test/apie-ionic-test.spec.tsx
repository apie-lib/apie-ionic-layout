import { newSpecPage } from '@stencil/core/testing';
import { ApieIonicTest } from '../apie-ionic-test';

describe('apie-ionic-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieIonicTest],
      html: `<apie-ionic-test></apie-ionic-test>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-ionic-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-ionic-test>
    `);
  });
});
