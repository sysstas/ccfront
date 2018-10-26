// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  // backEndUrl: 'https://e20a91ad.ngrok.io',
  // backEndUrl: 'https://blooming-ocean-36906.herokuapp.com',
  backEndUrl: 'http://localhost:5000',
  logger: NgxLoggerLevel.DEBUG,
  logoutUrl: 'https://clockwiseclockwork.eu.auth0.com/v2/logout',
  currentUrl: 'localhost:4200',
  auth0tenant: 'clockwiseclockwork.eu.auth0.com',
  auth0ClientId: '38arKe47zBt0ZGILpZBfgaMIBSsrpt8Y'
};
