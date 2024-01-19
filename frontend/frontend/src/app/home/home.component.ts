import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    public router: Router,
    public apiService: ApiService
    ){}
    public  ngOnInit(): void {
      this.apiService.getData().subscribe(val=>{
        console.log(val);
      })
    }
  public goToLoginPage(): void{
    console.log("object");
    this.router.navigate(['/login-page']);
  }
}
