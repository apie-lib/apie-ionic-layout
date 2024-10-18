# apie-ionic-form



<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute | Description | Type                                                 | Default     |
| --------------------------- | --------- | ----------- | ---------------------------------------------------- | ----------- |
| `internalState`             | --        |             | `{ [key: string]: NestedRecordField<Primitive>; }`   | `{}`        |
| `polymorphicFormDefinition` | --        |             | `{ [x: string]: string; }`                           | `undefined` |
| `validationErrors`          | --        |             | `{ [key: string]: NestedRecordField<string>; }`      | `{}`        |
| `value`                     | --        |             | `{ [key: string]: NestedRecordField<SubmitField>; }` | `{}`        |


## Dependencies

### Depends on

- ion-card
- ion-card-content
- apie-form
- ion-input

### Graph
```mermaid
graph TD;
  apie-ionic-form --> ion-card
  apie-ionic-form --> ion-card-content
  apie-ionic-form --> apie-form
  apie-ionic-form --> ion-input
  ion-card --> ion-ripple-effect
  apie-form --> apie-single-input
  apie-form --> apie-form-map
  apie-form --> apie-form-select
  apie-form --> apie-render-types
  ion-input --> ion-icon
  style apie-ionic-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
