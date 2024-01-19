import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

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
    this.router.navigate
  }
}
