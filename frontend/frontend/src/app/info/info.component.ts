import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tracks } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public musicList: Tracks[] = [];
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
     public apiService: ApiService
     ){}
  public  ngOnInit(): void {
    this.apiService.getData().subscribe(val=>{
    this.musicList = val;
    })
  }
  public logout():void{
    localStorage.removeItem('token');
    this.router.navigate(['/login-page']);
  }
  public checkIsAdmin():Observable<boolean>{
    return this.route.queryParams.pipe(
      map(params => {
        return params['isAdmin'] === 'true';
      })
    );
  }
}
