import { LoginPageComponent} from './login-page/login-page.component'; 
import { InfoComponent} from './info/info.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
 { path: 'login-page', component: LoginPageComponent },
 { path: 'info', component: InfoComponent},

];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }

