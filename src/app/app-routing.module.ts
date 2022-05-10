import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDetailPageComponent } from './components/house-detail-page/house-detail-page.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:HouseDetailComponent},
  {path:"houses",component:HouseDetailComponent},
  {path:"houses/category/:categoryId",component:HouseDetailComponent},
  {path:"houses/city/:cityId",component:HouseDetailComponent},
  {path:"houses/detail/:houseId",component:HouseDetailPageComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
