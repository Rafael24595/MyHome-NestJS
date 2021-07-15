import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { service_config } from "../../../utils/variables/Globals";
import { User } from 'src/classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(nickname:string, password: string): Observable<{status: boolean, user: User, access_token: string}>{
    return this.http.post<{status: boolean, user: User, access_token: string}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/auth/login`, {nickname, password});
  }
   
  verifyToken(): Observable<{status: boolean, user: User}>{
    return this.http.get<{status: boolean, user: User}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/auth/token/profile`);
  }

  setCookies(): Observable<{status: boolean, message: string}>{
    return this.http.get<{status: boolean, message: string}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/auth/cookie`);
  }

}
