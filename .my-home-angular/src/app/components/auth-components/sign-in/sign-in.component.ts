import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from 'src/classes/User';
import { user_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/tools/auth.tools';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  verify = false;
  
  constructor(private authService: AuthService, private authTools:AuthTools, private router: Router) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  Globals_User = user_config;

  nickname = '';
  password = '';

  formError = {
    email:{text:"", class:""},
    password:{text:"", class:""}
  }

  verifyToken(){
    if(this.authTools.getToken()){
      this.authService.verifyToken().subscribe(
        sucess=>{
          const user = this.dataToUser(sucess.user);
          this.authTools.setUserSession(user);
          this.authTools.goLastURI();
        },
        err=>{
          console.error(err);
          this.verify = true;
          this.authTools.destroySession();
        }
      );
    }
    else{
      this.verify = true;
    }
  }

  login(){
    this.authService.login(this.nickname, this.password).subscribe(
      sucess=>{
        const token = sucess.access_token;
        const user = this.dataToUser(sucess.user);

        this.authTools.setUserSessionToken(user, token);
        this.resetForm();
        this.authTools.goLastURI();
      },
      err=>{
        this.formError.password.text = 'Usuario o contraseña incorrectos';
        console.error(err);
      }
    );
  }

  dataToUser(reqUser: User): User{
    return new User(
      reqUser.name, 
      reqUser.surname1, 
      reqUser.surname2,
      reqUser.range, 
      reqUser.date, 
      reqUser.description,
      reqUser.email, 
      reqUser.playListMusic, 
      reqUser.playListVideo, 
      reqUser.gallery, 
      true
    );
  }

  resetForm(): void{
    this.nickname = '';
    this.password = '';

    this.formError = {
      email:{text:"", class:""},
      password:{text:"", class:""}
    }
  }

}
