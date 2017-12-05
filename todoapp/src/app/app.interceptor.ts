import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class appInterceptor implements HttpInterceptor {

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	console.log(currentUser.token);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${currentUser.token}`)
    });
    return next.handle(authReq);
  }
}