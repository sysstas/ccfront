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
  logger: NgxLoggerLevel.DEBUG
};
