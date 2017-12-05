import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    accessdenied:string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
       ) { 
        this.loading = false;
    }

    ngOnInit() {
        this.loading = false;
    }

    login() {
        
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                    
                },
                error => {
                    console.log(error['_body']);
                    this.accessdenied=error['_body'];
                    this.loading = false;
                });
               
    }
}
