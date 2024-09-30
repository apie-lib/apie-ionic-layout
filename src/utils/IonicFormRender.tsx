import { h, VNode }  from '@stencil/core';
import { InputState, FallbackRenderInfo, RenderInfo, toString, toFileList, toEmptyFileList, FormGroupState, FormListRowState, FormListRowAddState, SubmitButtonState, createErrorMessage } from 'apie-form-elements';
import { Constraint } from 'apie-form-elements/dist/types/components';

async function openFileDialog(callback: (newValue: any) => void)
{
    const [handle] = await (window as any).showOpenFilePicker();
    const fileData = await handle.getFile();
    callback(fileData);
}

const flexBasis = { width: "100%", minWidth: 'fit', display: 'flex', alignItems: 'center', gap: '10px', flexBasis: 'auto', overflow: 'visible' };

export class IonicFormRender extends RenderInfo
{
    constructor(
    ) {
        super(new FallbackRenderInfo());
        this.singleInputRenderers = {
            text(state: InputState) {
              return <ion-input
                style={ {"--padding-top": '4px'} }
                label={state.label}
                type="text"
                label-placement="floating"
                fill="outline" 
                disabled={state.disabled}
                onIonInput={(ev: any) => state.valueChanged(ev.target?.value)}
                name={state.name}
                value={toString(state.value)}></ion-input>;
            },
            password(state: InputState) {
                return <ion-input
                  style={ {"--padding-top": '4px'} }
                  label={state.label}
                  type="password"
                  clear-input="true"
                  label-placement="floating"
                  fill="outline" 
                  disabled={state.disabled}
                  onIonInput={(ev: any) => state.valueChanged(ev.target?.value)}
                  name={state.name}
                  value={toString(state.value)}>
                    {state.value && <ion-input-password-toggle slot="end"></ion-input-password-toggle>}
                  </ion-input>;
              },
            textarea(state: InputState) {
                return <ion-textarea
                    label={state.label}
                    label-placement="floating"
                    fill="outline" 
                    auto-grow="true"
                    disabled={state.disabled}
                    onIonInput={(ev: any) => state.valueChanged(ev.target?.value)}
                    name={state.name}
                    value={toString(state.value)}></ion-textarea>;
            },
            file(state: InputState) {
                return (
                  <div style={flexBasis} onClick={(ev) => {ev.stopImmediatePropagation(); openFileDialog(state.valueChanged)}}>
                    <input type="file" style={ { display: 'none'} } disabled={state.disabled} onInput={(ev: any) => state.valueChanged(ev.target?.files[0])} name={state.name} files={state.value ? toFileList(state.value) : toEmptyFileList()}/>
                    <ion-input
                        style={ (state.value as any)?.name ? {"--padding-top": '4px'} : { "--padding-top": '4px', 'fontStyle': 'italic' }}
                        label={state.label}
                        label-placement={ state.value ? "floating" : 'stacked' }
                        fill="outline"
                        type="text"
                        placeholder="no file selected"
                        value={ state.value ? (state.value as any).name : 'no file selected'}
                        readonly
                        >{ state.value
                            ? []
                            : <ion-icon slot="end" icon="cloud-upload"></ion-icon> }
                        </ion-input>
                        { state.value && <ion-icon slot="end" icon="close-circle-outline" onClick={(ev) => { ev.stopImmediatePropagation(); state.valueChanged(null); } }></ion-icon> }
                    
                  </div>
                );
            },
            select(state: InputState) {
                if (!Array.isArray(state.additionalSettings?.options)) {
                  return <ion-select
                    label-placement="floating"
                    fill="outline"
                    value={state.value}
                    disabled>
                        <ion-select-option value={state.value}>{state.value}</ion-select-option>
                    </ion-select>
                }
              
                return <ion-select
                    interface="popover"
                    label-placement="floating"
                    fill="outline"
                    disabled={state.disabled}
                    value={state.value}
                    onIonChange={(ev: any) => state.valueChanged(ev.target.value)}>
                  {state.additionalSettings.options.map((opt) => <ion-select-option value={toString(opt.value as any)}>{opt.name}</ion-select-option>)}
                  </ion-select>
            },
        };
    }

    public renderValidationError(state: Constraint, value: any): VNode|VNode[]
    {
        const errorMessage: string | null = createErrorMessage(state, value);
        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
            fontSize: '14px',
            margin: '15px',
            maxWidth: '100%',
        }
        const iconStyle = {
            margin: '10px',
            fontSize: '18px',
            color: '#721c24',
        }
        if (errorMessage) {
            return <div style={style}>
              <ion-icon name="alert-circle-outline" style={iconStyle}></ion-icon>
              <span>{errorMessage}</span>
            </div>
        }
        return [];
    }

    public renderSubmitButton(state: SubmitButtonState): VNode|VNode[] {
        return <ion-button type="submit" disabled={state.disabled}>{state.label}</ion-button>
    }

    public renderFormGroup(state: FormGroupState, subElements: VNode[], key: number | string | null = null): VNode|VNode[] {
        return <ion-list style={ { width: "100%" } } key={key ?? state.name}>{subElements.map((elm: VNode) => <ion-item style={ { width: "100%" } } class="ion-margin-bottom ion-margin-top">{elm}</ion-item>)}</ion-list>
    }

    public renderListOrMapRow(state: FormListRowState, subElement: VNode): VNode|VNode[]
    {
        if (!state.onRowRemove) {
            return subElement;
        }
        return <div key={state.mappingKey} style={flexBasis}>
            { subElement }
            { <ion-button type="button" onClick={() => state.onRowRemove()}><ion-icon slot="icon-only" icon="close-circle-outline"></ion-icon></ion-button> }
        </div>
    }

    public renderAddItemToList(state: FormListRowAddState): VNode|VNode[]
    {
        return <ion-button type="button" disabled={state.disabled} onClick={() => state.onRowAdd() }>Add</ion-button>
    }

    public renderAddItemToMap(keyField: VNode|VNode[], button: VNode|VNode[]): VNode|VNode[]
    {
        return <div style={flexBasis}>
            { keyField }
            { button }
            </div>;
    }
}