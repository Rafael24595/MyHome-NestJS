import { Component, OnInit } from '@angular/core';
import { use } from 'passport';
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from 'src/classes/User';
import { user_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/variables/tools/auth.tools';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private authTools:AuthTools) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  nickname = '';
  password = '';

  formError = {
    email:{text:"", class:""},
    password:{text:"", class:""}
  }

  verifyToken(){
    if(this.authTools.getToken())
    this.authService.verifyToken().subscribe(
      sucess=>{
        const user = this.dataToUser(sucess.user);
        this.authTools.setUserSession(user);
      },
      err=>{
        console.error(err);
      }
    );
  }

  login(){
    this.authService.login(this.nickname, this.password).subscribe(
      sucess=>{
        console.log(sucess)
        const token = sucess.access_token;
        const user =this.dataToUser(sucess.user)

        this.authTools.setUserSessionToken(user, token);
        this.resetForm();

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
