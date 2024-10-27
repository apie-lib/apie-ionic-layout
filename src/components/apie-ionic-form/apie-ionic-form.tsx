import { Component, Element, Prop, h } from '@stencil/core';
import { IonicFormRender } from '../../utils/IonicFormRender';
import type{ NestedRecord, Primitive, SubmitField } from 'apie-form-elements/dist/types/components';
import { clone } from 'apie-form-elements';

@Component({
  tag: 'apie-ionic-form',
  styleUrl: 'apie-ionic-form.css',
  shadow: false,
})
export class ApieIonicForm {
  @Element() el: HTMLElement;

  @Prop({reflect: true, mutable: true}) value: NestedRecord<SubmitField> = {};
  @Prop({reflect: true, mutable: true}) initialValue?: NestedRecord<SubmitField>;
  @Prop({reflect: true, mutable: true}) internalState: NestedRecord<Primitive> = {};
  @Prop({reflect: true, mutable: true}) validationErrors: NestedRecord<string> = {};
  @Prop({reflect: true}) polymorphicFormDefinition?: Record<string, string> = undefined;

  render() {
    const attributes = Array.from(this.el.attributes).reduce((acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    const renderInfo = new IonicFormRender();

    return <ion-card>
      <ion-card-content>
        <apie-form
          value={this.value}
          initialValue={this.initialValue ?? clone(this.value)}
          internalState={this.internalState}
          validationErrors={this.validationErrors}
          renderInfo={renderInfo} 
          polymorphicFormDefinition={this.polymorphicFormDefinition}
          {...attributes}><slot></slot></apie-form>
      </ion-card-content>
    </ion-card>;
  }
}
