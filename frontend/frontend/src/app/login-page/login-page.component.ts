import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public username: string = "";
  public password: string = "";

constructor( public apiService: ApiService, public router: Router ){}

public onSubmit(): void{
  this.apiService.login(this.username, this.password).subscribe(
    data => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/info'], { queryParams: { isAdmin: data.isAdmin } });
    },
    error => {
        console.error('Błąd logowania', error);
    }
)
}
}
