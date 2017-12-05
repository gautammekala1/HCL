import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class TodoService {
    
    todoArray:any;

    constructor(private http: Http) { }

    getAll() {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let body = JSON.stringify({ token:currentUser.token });
        let headers = new Headers();
           headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.basc_Url}api/todo/all`,body,options)
        .map((response: Response) =>{
          return response.json();  
        });
    }

    create(todo){

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let body = {token:currentUser.token,todo};
        let headers = new Headers();
           headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.basc_Url}api/todo/create`,body,options)
        .map((response: Response) =>{
            return response.json();  
        });
    }

   deleteTodo(id){

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let body = {};
        let headers = new Headers();
           headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`${environment.basc_Url}api/todo/delete/?token=${currentUser.token}&key=${id}`,options)
        .map((response: Response) =>{
            return response.json();  
        });
    }

     updateTodo(todo) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let body = {token:currentUser.token,todo};
        let headers = new Headers();
           headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`${environment.basc_Url}api/todo/update`,body,options)
        .map((response: Response) =>{
            return response.json();  
        });
    }    
}