import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  constructor(
    public router: Router,
    public apiService: ApiService
    ){}
  public goToLoginPage(): void {
    this.router.navigate(['/login-page']);
  }
}
