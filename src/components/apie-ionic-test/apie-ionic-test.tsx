import { Component, Host, h } from '@stencil/core';
import { IonicFormRender } from '../../utils/IonicFormRender';

@Component({
  tag: 'apie-ionic-test',
  styleUrl: 'apie-ionic-test.css',
  shadow: true,
})
export class ApieIonicTest {
  private renderInfo = new IonicFormRender();
  render() {
    return (
      <Host>
        <apie-test-input renderInfo={this.renderInfo}></apie-test-input>
      </Host>
    );
  }
}
