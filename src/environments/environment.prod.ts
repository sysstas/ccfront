import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,
  // backEndUrl: 'https://blooming-ocean-36906.herokuapp.com',
  backEndUrl: 'http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com:8080',
  logger: NgxLoggerLevel.OFF,
  logoutUrl: 'http://clockwiseclockwork.eu.auth0.com/v2/logout',
  currentUrl: 'clockwise-clockwork.s3-website-eu-west-1.amazonaws.com',
  auth0tenant: 'clockwiseclockwork.eu.auth0.com',
  auth0ClientId: '38arKe47zBt0ZGILpZBfgaMIBSsrpt8Y',
  sandbox: 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v',
  workingHours: {
    start: 8,
    finish: 19
  },
  availableToOrderHours: {
    start: 8,
    finish: 17
  }
  ///
};
