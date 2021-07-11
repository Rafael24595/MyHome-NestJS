import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { service_config } from "../../../utils/variables/Globals";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(nickname:string, password: string): Observable<{status: boolean, access_token: string}>{
    return this.http.post<{status: boolean, access_token: string}>(`${service_config.connection.protocol}://${service_config.connection.host}/api/auth/login`, {nickname, password});
   }
   
}
