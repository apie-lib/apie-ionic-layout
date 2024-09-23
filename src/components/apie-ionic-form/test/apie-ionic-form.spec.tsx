import { newSpecPage } from '@stencil/core/testing';
import { ApieIonicForm } from '../apie-ionic-form';

describe('apie-ionic-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieIonicForm],
      html: `<apie-ionic-form></apie-ionic-form>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-ionic-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-ionic-form>
    `);
  });
});
