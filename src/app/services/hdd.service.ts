import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root',
})
export class HddService {
  private url: string;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public gethdds(cantidad = null): Observable<any> {

    let params = new HttpParams();
    let token = localStorage.getItem("token");

    params = params.append("token", token);
    params = params.append("funcion", 'hdd');
    if (cantidad){
      params = params.append("last_hdd", cantidad);
    }

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "caller.php", { params: params });
  }
}
