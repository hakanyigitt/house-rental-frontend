import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { CityComponent } from './components/city/city.component';
import { UserComponent } from './components/user/user.component';

import { ToastrModule } from 'ngx-toastr';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { CityFilterPipe } from './pipes/city-filter.pipe';
import { HouseDetailPageComponent } from './components/house-detail-page/house-detail-page.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { HouseFilterPipe } from './pipes/house-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CategoryComponent,
    CityComponent,
    UserComponent,
    CategoryFilterPipe,
    CityFilterPipe,
    HouseDetailPageComponent,
    HouseDetailComponent,
    RentalComponent,
    HouseFilterPipe,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
