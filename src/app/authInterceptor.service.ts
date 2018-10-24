import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: ApiService) {}
  intercept(req, next) {
    const authRequest = req.clone({
      headers: req.headers
        .set('Authorization', 'token ' + this.auth.token)
        .set('access_token', localStorage.getItem('access_token'))
        .set('access_token', localStorage.getItem('id_token'))
    });
    return next.handle(authRequest);
  }
}
