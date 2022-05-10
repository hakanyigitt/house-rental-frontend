import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private toastrService:ToastrService,private loggedUserService:LoggedUserService,private route:Router) { }
  loginForm:FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }
  getName(){
    this.loggedUserService.getName().subscribe(response=>{
      console.log(response.message);
      let adsoyad = response.data;
      let ad = adsoyad.split(" ")[0];
      localStorage.setItem("ad",ad);
    });
  }
  getUserInfo(){
    this.loggedUserService.getProfileInfo().subscribe(response=>{
      console.log(response.message);
      let firstName = response.data.firstName;
      let lastName = response.data.lastName;
      let email = response.data.email;
      localStorage.setItem("firstName",firstName);
      localStorage.setItem("lastName",lastName);
      localStorage.setItem("email",email);
    })
  }
  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(res=>{
        if(res.success){
          this.toastrService.success(res.message);
          this.toastrService.success("Anasayfaya yönlendiriliyorsunuz");
          localStorage.setItem("token",res.data.token);
          this.getName()
          this.getUserInfo()
          setTimeout(()=>{
            this.route.navigate(['/']);
          },1000)
        }
        else{
          this.toastrService.error("Hatalı giriş","Bilgilerinizi kontrol edin");
        }
      },error=>{
        this.toastrService.error("Hatalı giriş","Bilgilerinizi kontrol edin");
      })
    }
  }
  gotoRegisterPage(){
    window.location.href="/register";
  }

}
