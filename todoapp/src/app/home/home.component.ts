import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
   selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: any;
    users: any = [];
    userName:string;
    constructor(private TodoService: TodoService,private router: Router,
      public authenticationService: AuthenticationService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if(this.currentUser && this.currentUser.message){
           
           this.userName=this.currentUser.message;
        }
        
        if(!this.currentUser) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deletetodo(id: number) {

      this.TodoService.deleteTodo(id).subscribe(users => { 
           this.loadAllUsers();
       });
        
    }

  addnew(){

  this.TodoService.todoArray =[];
  this.router.navigate(['/add']);
  }
    edittodo(id:number){
        console.log(id);
        this.TodoService.todoArray = this.users[id];
        this.router.navigate(['/add']);
    }

    private loadAllUsers() {

       this.TodoService.getAll().subscribe(users => { 
           console.log(users);
           this.users = users; 
       });
    }

        logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}