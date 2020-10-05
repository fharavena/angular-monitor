import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SensoresService } from 'src/app/services/sensores.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [SensoresService],
})
export class SensorComponent implements OnInit {
  hora = [];
  ramapp = [];
  cpuapp = [];
  avgapp = [];
  ramdbb = [];
  cpudbb = [];
  avgdbb = [];

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

  constructor(private _sensorservice: SensoresService) { }

  ngOnInit(): void {
    //this.gethsensor();
    this.gethsensor();
    setInterval(() => {
      this.hora = [];
      this.ramapp=[];
      this.cpuapp=[];
      this.avgapp=[];
      this.ramdbb=[];
      this.cpudbb=[];
      this.avgdbb=[];
      this.gethsensor();
    }, 60000); //cada un minuto
  }

  fulldatachart() {
    this.lineChartData = [
      { data: this.ramapp, label: 'cpu app' },
      { data: this.cpuapp, label: 'ram app' },
      { data: this.avgapp, label: 'avg app' },
      { data: this.cpudbb, label: 'cpu dbb' },
      { data: this.ramdbb, label: 'ram dbb' },
      { data: this.avgdbb, label: 'avg dbb' },
    ];
    this.lineChartLabels = this.hora;
  }

  temp;

  gethsensor() {
    this._sensorservice.getdbbapp().subscribe(
      (response) => {
        if(response.status=='success'){
          this.fulldatachart();
          this.temp=response.data;
          //console.log(this.temp);
          this.temp.forEach((element) => {
            if(element['hora'] !== '01:00' && element['hora'] !== '05:00' && element['hora'] !== '07:00'){
              if (element['tipo'].replace(/ /g, '') == 'cpu' && element['servidor']=="43") {
                this.hora.unshift(element['hora']);
                this.cpuapp.unshift(element['valor']);
              } else if (element['tipo'].replace(/ /g, '') == 'ram' && element['servidor']=="43") {
                this.ramapp.unshift(element['valor']);
              } else if (element['tipo'].replace(/ /g, '') == 'avg' && element['servidor']=="43") {
                this.avgapp.unshift(element['valor']);
              } else if (element['tipo'].replace(/ /g, '') == 'cpu' && element['servidor']=="109") {
                this.cpudbb.unshift(element['valor']);
              } else if (element['tipo'].replace(/ /g, '') == 'ram' && element['servidor']=="109") {
                this.ramdbb.unshift(element['valor']);
              } else if (element['tipo'].replace(/ /g, '') == 'avg' && element['servidor']=="109") {
                this.avgdbb.unshift(element['valor']);
              }
            }
           });
        }
        else{
          console.log("Error al obtener los datos");
        }

        // this.fulldatachart();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}
