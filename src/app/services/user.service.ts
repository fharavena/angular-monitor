import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public test() {
    console.log('respuesta desde service user');
  }

  public getuser(username, password) {
    // Setup query parameter
    let params = new HttpParams();
    params = params.append("funcion", "login");
    params = params.append("user", username);
    params = params.append("pass", password);

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "monitorcpu.php", { params: params });
  }

  getToken() {
    let params = new HttpParams();
    let token = localStorage.getItem("token");

    params = params.append("funcion", "validate_token");
    params = params.append("token", token);

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.get(this.url + "monitorcpu.php", { params: params });
  }
}
