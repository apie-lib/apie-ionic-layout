/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ApieIonicForm {
    }
}
declare global {
    interface HTMLApieIonicFormElement extends Components.ApieIonicForm, HTMLStencilElement {
    }
    var HTMLApieIonicFormElement: {
        prototype: HTMLApieIonicFormElement;
        new (): HTMLApieIonicFormElement;
    };
    interface HTMLElementTagNameMap {
        "apie-ionic-form": HTMLApieIonicFormElement;
    }
}
declare namespace LocalJSX {
    interface ApieIonicForm {
    }
    interface IntrinsicElements {
        "apie-ionic-form": ApieIonicForm;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "apie-ionic-form": LocalJSX.ApieIonicForm & JSXBase.HTMLAttributes<HTMLApieIonicFormElement>;
        }
    }
}