import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'apie-ionic-layout',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'pages' },
      ],
    }
  ],
  testing: {
    browserHeadless: "new",
  },
};
