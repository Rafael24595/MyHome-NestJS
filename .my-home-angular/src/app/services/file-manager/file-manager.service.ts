import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from 'src/classes/Path';
import { service_config } from 'src/utils/variables/Globals';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private http: HttpClient) {}

  getDirectory(path?:string): Observable<{status: boolean, message: Path[]}>{
    path = (path) ? path : "";
    return this.http.get<{status: boolean, message: Path[]}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/directory/${path}`);
  }
}
