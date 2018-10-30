import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {StorageService} from './services/storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    public storageService: StorageService
  ) {}
  intercept(req, next) {
    const authRequest = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${this.storageService.GetItem('id_token')}` )
    });
    return next.handle(authRequest);
  }
}
