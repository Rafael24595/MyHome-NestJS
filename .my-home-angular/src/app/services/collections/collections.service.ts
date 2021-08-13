import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { service_config } from 'src/utils/variables/Globals';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private http: HttpClient) { }

  getSystemCollection(type:string): Observable<{status: boolean, type:string, message: PlayListMusic[] | Gallery[]}>{
    return this.http.get<{status: boolean, type:string, message: PlayListMusic[]}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/collection/system/${type}`);
  }

  getSystemCollectionPage(type:string, position: number, path: string): Observable<{status: boolean, type:string, message: PlayListMusic[] | Gallery[]}>{
    return this.http.get<{status: boolean, type:string, message: PlayListMusic[]}>(`${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/collection/path/system/${type}/${position}/${path}`);
  }

}
