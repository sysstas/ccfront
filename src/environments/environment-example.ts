// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  backEndUrl: 'http://localhost:5000',
  logger: NgxLoggerLevel.DEBUG,
  logoutUrl: 'https://[your app name on Auth0].auth0.com/v2/logout',
  currentUrl: 'localhost:4200',
  auth0tenant: '[your Auth0 tenant].auth0.com',
  auth0ClientId: '[your Auth0 client id]',
  sandbox: '[paypal sandbox id]'
};
