import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/guards/login.guard';
import { HouseDetailPageComponent } from './components/house-detail-page/house-detail-page.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:HouseDetailComponent},
  {path:"houses",component:HouseDetailComponent},
  {path:"houses/category/:categoryId",component:HouseDetailComponent},
  {path:"houses/city/:cityId",component:HouseDetailComponent},
  {path:"houses/detail/:houseId",component:HouseDetailPageComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user/logout",component:LogoutComponent,canActivate:[LoginGuard]},
  {path:"profile",component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
