import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public username: string = "";
  public password: string = "";

constructor( public apiService: ApiService){}

public onSubmit(): void{
  this.apiService.login(this.username, this.password).subscribe(
    data => {
        console.log('Logowanie zakończone sukcesem', data);
        // Tutaj możesz przekierować użytkownika, zapisać token itp.
    },
    error => {
        console.error('Błąd logowania', error);
    }
)
}
}
