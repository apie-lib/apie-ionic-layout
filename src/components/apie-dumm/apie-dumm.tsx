import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'apie-dumm',
  styleUrl: 'apie-dumm.css',
  shadow: true,
})
export class ApieDumm {
  render() {
    return (
      <Host style={{display: 'none'}}>
        <slot></slot>
        <ion-input></ion-input><ion-textarea></ion-textarea>
        <ion-select><ion-select-option></ion-select-option></ion-select>
        <ion-list></ion-list>
        <ion-item></ion-item>
        <ion-button></ion-button>
        <ion-icon></ion-icon>
      </Host>
    );
  }
}
