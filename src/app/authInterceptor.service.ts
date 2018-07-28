import { Injectable } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import { ApiService } from './api.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private auth: ApiService){}
  intercept(req, next) {
    // console.log("req: ", req)
    var authRequest = req.clone({
      headers: req.headers.set('Authorization', 'token ' + this.auth.token)
    })
    return next.handle(authRequest)
  }
}