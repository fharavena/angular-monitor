
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private url: string;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public getdbbapp(): Observable<any> {

    let params = new HttpParams();
    params = params.append("funcion", 'sen');
    let token = localStorage.getItem("token");
    params = params.append("token", token);

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "caller.php", { params: params });
  }
}
