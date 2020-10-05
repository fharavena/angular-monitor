import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppdbbService } from 'src/app/services/appdbb.service';
import { literal } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dbb',
  templateUrl: './dbb.component.html',
  styleUrls: ['./dbb.component.css'],
  providers: [ AppdbbService],
})
export class DbbComponent implements OnInit {
  hora = [];
  ram = [];
  cpu = [];
  avg = [];
  temp;

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

  constructor(
    private _appdbbservice: AppdbbService
  ) {}

  ngOnInit(): void {
    // this.gethappdbb();
    // setInterval(() => {
    //   this.hora = [];
    //   this.ram = [];
    //   this.cpu = [];
    //   this.avg = [];
    //   this.gethappdbb();
    // }, 60000); //each minute
  }

  fulldatachart() {
    this.lineChartData = [
      { data: this.cpu, label: 'cpu' },
      { data: this.ram, label: 'ram' },
      { data: this.avg, label: 'avg' },
    ];
    this.lineChartLabels = this.hora;
  }

  gethappdbb() {
    this._appdbbservice.getdbbapp(null, 2).subscribe(
      (response) => {
        this.temp = response['data'];
        this.temp.forEach((element) => {
          if (element['tipo'].replace(/ /g, '') == 'cpu') {
            this.hora.unshift(element['hora']);
            this.cpu.unshift(element['valor']);
          } else if (element['tipo'].replace(/ /g, '') == 'ram') {
            this.ram.unshift(element['valor']);
          } else if (element['tipo'].replace(/ /g, '') == 'avg') {
            this.avg.unshift(element['valor']);
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
