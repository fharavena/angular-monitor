import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url = 'https://lms.educandus.cl/carpeta/log/';
  titulo = 'nuevo';
  //mymodel;

  ahora = new Date();
  month = ('0' + (this.ahora.getMonth() + 1)).slice(-2);
  date = ('0' + this.ahora.getDate()).slice(-2);
  fecha_hoy = this.ahora.getFullYear() + '-' + this.month + '-' + this.date;
  fecha_fin = this.ahora.getFullYear() + '-' + this.month + '-' + this.date;

  urldescargadhh = this.url + 'app/hdd/hdd.csv';
  urldescargacpu = this.url + 'app/cpu/out' + this.fecha_hoy.replace(/-/gi, '') + '.csv';

  constructor() {}

  ngOnInit(): void {}

  cambiodeenlace() {
    this.urldescargacpu = this.url + 'app/cpu/out' + this.fecha_hoy.replace(/-/gi, '') + '.csv';
  }
}
