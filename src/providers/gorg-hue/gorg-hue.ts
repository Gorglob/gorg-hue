import { Constants } from './../../constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GorgHueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GorgHueProvider {

  constructor(public http: HttpClient) {    
  }

  getLights(): Observable<object> {
    return this.http.get(`${Constants.API_URL}lights`);
  }

  getLight(light: any): Observable<object> {
    return this.http.get(`${Constants.API_URL}lights/${light}`);
  }

  setLightState(id: string, lightState: any): Observable<object> {
    return this.http.put(`${Constants.API_URL}lights/${id}/state`, lightState);
  }

}
