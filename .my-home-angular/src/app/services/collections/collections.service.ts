import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { FileAbstract } from 'src/classes/File/FileAbstract';
import { service_config } from 'src/utils/variables/Globals';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private http: HttpClient) { }

  getSystemCollection(type:string): Observable<{status: boolean, type:string, message: PlayListMusic[]}>{
    return this.http.get<{status: boolean, type:string, message: PlayListMusic[]}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/collection/system/${type}`);
  }
}
