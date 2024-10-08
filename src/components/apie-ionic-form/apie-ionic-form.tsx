import { Component, Element, Prop, h } from '@stencil/core';
import { IonicFormRender } from '../../utils/IonicFormRender';

@Component({
  tag: 'apie-ionic-form',
  styleUrl: 'apie-ionic-form.css',
  shadow: false,
})
export class ApieIonicForm {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) polymorphicFormDefinition?: Record<string, string> = undefined;

  render() {
    const attributes = Array.from(this.el.attributes).reduce((acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    const renderInfo = new IonicFormRender();

    return <ion-card>
      <ion-card-content>
        <apie-form renderInfo={renderInfo} polymorphicFormDefinition={this.polymorphicFormDefinition} {...attributes}><slot></slot></apie-form>
      </ion-card-content>
    </ion-card>;
  }
}
