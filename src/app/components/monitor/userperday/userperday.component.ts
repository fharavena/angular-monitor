import { Component, OnInit } from '@angular/core';
import { MoodleuserService } from 'src/app/services/moodleuser.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-userperday',
  templateUrl: './userperday.component.html',
  styleUrls: ['./userperday.component.css'],
})
export class UserperdayComponent implements OnInit {
  fecha = [];
  usuarios = [];
  temp;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Cargando ...' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private _daiusu: MoodleuserService) {}

  ngOnInit(): void {
    this.getdayuser();
    console.log(this.fecha);
    console.log(this.usuarios);
  }

  fulldatachart() {
    this.lineChartData = [
      { data: this.usuarios, label: 'Usuarios' },
    ];
    this.lineChartLabels = this.fecha;
  }

  getdayuser() {
    this._daiusu.get_user_per_day().subscribe((response) => {
      if (response.status == 'success') {
        this.fulldatachart();
        this.temp = response.data;
        this.temp.forEach((element) => {
          this.fecha.unshift(element['fecha']);
          this.usuarios.unshift(element['usuarios']);
        });

        //console.log(response.data);
      } else {
        console.log('Error al obtener los datos');
      }
    });
  }
}
