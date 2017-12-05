import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../services/todo.service';

@Component({
    selector: 'home',
    templateUrl: 'add.component.html'
})

export class AddComponent {
    model: any = {};
    loading = false;
    currentUser:any;
    userName:string;
    todoArray:any;
    constructor(
        private router: Router,
        private TodoService: TodoService,
        ) {
        this.model.targetDate = new Date().toISOString().replace( 'Z', '' );
        if(this.TodoService.todoArray && this.TodoService.todoArray.id){
            this.model.id = this.TodoService.todoArray.id;
            this.model.subject = this.TodoService.todoArray.subject;
            this.model.message = this.TodoService.todoArray.message;
            this.model.targetDate = new Date(this.TodoService.todoArray.targetDate).toISOString().replace( 'Z', '' );
            
        }
        this.model.status='Active';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser && this.currentUser.message){

           this.userName=this.currentUser.message;
           this.model.username=this.userName;
        }
        
        if(!this.currentUser) {
            this.router.navigate(['/login']);
        }

    }

    addtodo() {
        if(this.model.id) {
            this.updatetodo();
        }else{
        delete this.model.id;
        this.loading = true;
        console.log(this.model);
        
        this.TodoService.create(this.model)
            .subscribe(
                data => {
                    
                    this.router.navigate(['/home']);
                },
                error => {
                    
                    this.loading = false;
                });
        }
    }
    
   updatetodo() {

        this.loading = true;
        console.log(this.model);
        
        this.TodoService.updateTodo(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    
                    this.loading = false;
                });
        
    }
    logout() {
        // remove user from local storage to log user out
       // console.log('Hai');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
