import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,
  backEndUrl: 'https://blooming-ocean-36906.herokuapp.com',
  // backEndUrl: 'http://45e7c460.ngrok.io',
  logger: NgxLoggerLevel.OFF,
  logoutUrl: 'http://clockwiseclockwork.eu.auth0.com/v2/logout',
  currentUrl: 'ec2-34-244-145-145.eu-west-1.compute.amazonaws.com',
  auth0tenant: 'clockwiseclockwork.eu.auth0.com',
  auth0ClientId: '38arKe47zBt0ZGILpZBfgaMIBSsrpt8Y'
  ///
};
