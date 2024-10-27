import { TextFieldTypes } from '@ionic/core';
import { h, VNode }  from '@stencil/core';
import { InputState, FallbackRenderInfo, RenderInfo, toString, toArray, toFileList, toEmptyFileList, FormGroupState, FormListRowState, FormListRowAddState, SubmitButtonState, createErrorMessage } from 'apie-form-elements';
import { Constraint } from 'apie-form-elements/dist/types/components';

async function openFileDialog(callback: (newValue: any) => void)
{
    const [handle] = await (window as any).showOpenFilePicker();
    const fileData = await handle.getFile();
    callback(fileData);
}

const flexBasis = { width: "100%", minWidth: 'fit', display: 'flex', alignItems: 'center', gap: '10px', flexBasis: 'auto', overflow: 'visible' };

function renderIonInput(
    state: InputState,
    type: TextFieldTypes,
    subNodes: VNode[]|VNode = [],
    attributes: any = {}
) {
    const messages = state.validationResult.messages.filter((v) => !v.valid && v.message && v.serverSide)
        .map((v) => {
            v.message
        }).join("\n");
    const checks = state.validationResult.messages.filter((v) => v.message && !v.serverSide)
        .map((v) => {
            return <ion-row><ion-col><ion-note>{ v.message }</ion-note></ion-col><ion-col><ion-note>{ v.valid ? '✅' : '❌' }<br /></ion-note></ion-col></ion-row>
        })
    return <ion-grid>
        <ion-row>
            <ion-col size="11">
                <ion-input
                    style={ {"--padding-top": '4px'} }
                    class={'ion-touched' + ((state.validationResult.valid && undefined === state.serverValidationError['']) ? '' : ' ion-invalid')}
                    label={state.label}
                    type={type}
                    label-placement="floating"
                    fill="outline" 
                    disabled={state.disabled}
                    onIonInput={(ev: any) => state.valueChanged(ev.target?.value)}
                    name={state.name}
                    value={toString(state.value)}
                    error-text={messages || null}
                    {...attributes}
                    >{subNodes}</ion-input>
            </ion-col>
            <ion-col>
                {(state.validationResult.valid && undefined === state.serverValidationError[''])  ? <div style={{color: 'green'}}>✅</div> : <div style={{color: 'red'}}>❌</div>}
            </ion-col>
        </ion-row>
        {Object.keys(state.serverValidationError).length > 0 && <ion-row style={{ color: 'red', fontWeight: 'bold', padding: '10px', backgroundColor: '#fdd' }}>
            <ion-col>{Object.entries(state.serverValidationError).map((v) => toString(v[1] as any)) }</ion-col>
        </ion-row>}
        {checks}
    </ion-grid>;
}

export class IonicFormRender extends RenderInfo
{
    constructor(
    ) {
        super(new FallbackRenderInfo());
        this.singleInputRenderers = {
            "date-display"(state: InputState) {
                return renderIonInput(state, 'text', <ion-icon slot="end" icon="calendar-outline"></ion-icon>)
            },
            "date-hours"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'HH', label: 'Hours', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-minutes"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'MM', label: 'Minutes', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-seconds"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'SS', label: 'Seconds', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-milliseconds"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'Ms', label: 'Milliseconds', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-microseconds"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: '000000', label: 'Microseconds', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-date"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'DD', label: 'Date', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-month"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'MM', label: 'Month', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            "date-year"(state: InputState) {
                return renderIonInput(state, 'number', [], { placeholder: 'YYYY', label: 'Year', style: {"--padding-top": '4px', maxWidth: '33%' } })
            },
            text(state: InputState) {
              return renderIonInput(state, 'text');
            },
            number(state: InputState) {
                return renderIonInput(state, 'number');
            },
            integer(state: InputState) {
                return renderIonInput(state, 'number');
            },
            password(state: InputState) {
                return renderIonInput(state, 'password', state.value && <ion-input-password-toggle slot="end"></ion-input-password-toggle>)
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
            multi(state: InputState) {
                const value = new Set(toArray(state.value));
                if (!Array.isArray(state.additionalSettings?.options)) {
                  return <ion-select
                    label={state.label}
                    label-placement="floating"
                    fill="outline"
                    value={state.value}
                    disabled>
                        <ion-select-option value={state.value}>{toString(value)}</ion-select-option>
                    </ion-select>
                }
              
                return <ion-select
                    interface="popover"
                    label={state.label}
                    label-placement="floating"
                    fill="outline"
                    multiple
                    disabled={state.disabled}
                    value={Array.from(value)}
                    onIonChange={(ev: any) => state.valueChanged(ev.target.value)}>
                  {state.additionalSettings.options.map((opt) => <ion-select-option value={toString(opt.value as any)}>{opt.name}</ion-select-option>)}
                  </ion-select>
            },
            select(state: InputState) {
                if (!Array.isArray(state.additionalSettings?.options)) {
                  return <ion-select
                    label={state.label}
                    label-placement="floating"
                    fill="outline"
                    value={state.value}
                    disabled>
                        <ion-select-option value={state.value}>{state.value}</ion-select-option>
                    </ion-select>
                }
              
                return <ion-select
                    interface="popover"
                    label={state.label}
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
        if (errorMessage && state.serverSide) {
            return <ul>
                <li style={ errorMessage ? { color: '#B00' } : { color: '#080'}}>
                    <ion-icon name={ errorMessage ? 'close-outline' : 'checkmark-outline' }></ion-icon>
                    { state.message }
                </li>
            </ul>
        }
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

    public renderListOrMapRow(state: FormListRowState, subElement: VNode|VNode[]): VNode|VNode[]
    {
        if (Array.isArray(subElement) && subElement.length === 0) {
            return [];
        }
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