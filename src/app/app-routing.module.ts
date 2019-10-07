import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'user', component: UserAddComponent },
  { path: 'user/:id', component: UserAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
