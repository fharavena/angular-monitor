import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root'
})
export class AppdbbService {
  private url: string;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public getdbbapp(date_dbb=null, last_dbb=null,inicio_dbb=null,fin_dbb=null): Observable<any> {

    let params = new HttpParams();
    params = params.append("funcion", 'dbb');

    let token = localStorage.getItem("token");
    params = params.append("token", token);
    if (date_dbb){
      params = params.append("date_dbb", date_dbb);
    }
    if (last_dbb){
      params = params.append("last_dbb", last_dbb);
    }
    if (inicio_dbb){
      params = params.append("inicio_dbb", inicio_dbb);
    }
    if (fin_dbb){
      params = params.append("fin_dbb", fin_dbb);
    }

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "caller.php", { params: params });
  }
}
