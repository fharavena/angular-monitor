import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root',
})
export class AppcpuService {
  private url: string;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public getcpuapp(date_cpu=null, last_cpu=null,inicio_cpu=null,fin_cpu=null): Observable<any> {

    let params = new HttpParams();
    let token = localStorage.getItem("token");

    params = params.append("funcion", 'cpu');
    params = params.append("token", token);

    if (date_cpu){
      params = params.append("date_cpu", date_cpu);
    }
    if (last_cpu){
      params = params.append("last_cpu", last_cpu);
    }
    if (inicio_cpu){
      params = params.append("inicio_cpu", inicio_cpu);
    }
    if (fin_cpu){
      params = params.append("fin_cpu", fin_cpu);
    }

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "caller.php", { params: params });
  }

}
