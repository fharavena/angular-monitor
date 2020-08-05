import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppcpuService } from 'src/app/services/appcpu.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css'],
  providers: [AppcpuService],
})
export class CpuComponent implements OnInit {
  hora = [];
  ram = [];
  cpu = [];
  avg = [];

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
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


  constructor(private _appcpuservice: AppcpuService) {}

  ngOnInit(): void {

    this.gethappcpu();
    setInterval(() => {
      this.hora = [];
      this.ram = [];
      this.cpu = [];
      this.avg = [];
      this.gethappcpu();
    }, 60000); //cada un minuto
  }

  fulldatachart() {
    this.lineChartData = [
      { data: this.cpu, label: 'cpu' },
      { data: this.ram, label: 'ram' },
      { data: this.avg, label: 'avg' },
    ];
    this.lineChartLabels = this.hora;
  }

  temp;

  gethappcpu() {
    this._appcpuservice.getcpuapp(null, 2).subscribe(
      (response) => {
        this.temp = response['data'];
        this.temp.forEach((element) => {

          if(element['hora'] !== '01:00' && element['hora'] !== '05:00' && element['hora'] !== '07:00'){
            if (element['tipo'].replace(/ /g, '') == 'cpu') {
              this.hora.unshift(element['hora']);
              this.cpu.unshift(element['valor']);
            } else if (element['tipo'].replace(/ /g, '') == 'ram') {
              this.ram.unshift(element['valor']);
            } else if (element['tipo'].replace(/ /g, '') == 'avg') {
              this.avg.unshift(element['valor']);
            }
          }
        });

        this.fulldatachart();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
