import { newSpecPage } from '@stencil/core/testing';
import { ApieDumm } from '../apie-dumm';

describe('apie-dumm', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieDumm],
      html: `<apie-dumm></apie-dumm>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-dumm>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-dumm>
    `);
  });
});
