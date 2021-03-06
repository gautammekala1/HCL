import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';
@Injectable()
export class AuthenticationService {
  
    constructor(private http: Http) { }

    login(username: string, password: string) {

           let headers = new Headers();
           headers.set('Content-Type', 'application/json');
           let myParams = new URLSearchParams();
           myParams.set('username', username);
            myParams.set('password', password);
            let body = JSON.stringify({ username: username, password: password });
           let options = new RequestOptions({ headers: headers });

        return this.http.post(`${environment.basc_Url}authenticate/login`,body,options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }


}