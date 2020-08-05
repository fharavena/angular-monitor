import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public status: string;
  public token;
  public identity;
  public user;
  public pass;
  public mensaje;

  constructor(
    private _userservice: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.logout();
    //this.getuser('lms', 'educandus');
  }

  onSubmit(form) {
    //console.log("hola te pico la cola");
    this._userservice.getuser(this.user, this.pass).subscribe(
      (response) => {
        if (response['status'] === 'success') {
          this.token = response['data'][0]['token'];

          localStorage.setItem('token', this.token);
          this._router.navigate(['/inicio']);
        } else if (response['status'] === 'error') {
          this.mensaje= response['message']
        }
      },
      (error) => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this._router.navigate(['login']);
      }
    });
  }
}
