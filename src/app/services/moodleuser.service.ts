import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './globals';

@Injectable({
  providedIn: 'root',
})
export class MoodleuserService {
  private url: string;
  public token;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  public get_user_action_moodle(): Observable<any> {
    let params = new HttpParams();
    let token = localStorage.getItem('token');

    params = params.append('funcion', 'usu');
    params = params.append('token', token);

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'caller.php', { params: params });
  }

  public get_user_per_day(): Observable<any> {
    let params = new HttpParams();
    let token = localStorage.getItem('token');

    params = params.append('funcion', 'daiusu');
    params = params.append('token', token);

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'caller.php', { params: params });
  }
}
