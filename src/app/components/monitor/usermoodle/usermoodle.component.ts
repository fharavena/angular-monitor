import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { literal } from '@angular/compiler/src/output/output_ast';
import { MoodleuserService } from 'src/app/services/moodleuser.service';

@Component({
  selector: 'app-usermoodle',
  templateUrl: './usermoodle.component.html',
  styleUrls: ['./usermoodle.component.css'],
  providers: [MoodleuserService],
})
export class UsermoodleComponent implements OnInit {
  hora = [];
  usu = [];
  act = [];
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

  constructor(private _moodleuserservice: MoodleuserService) {}

  ngOnInit(): void {
    this.getmoodleusu();
    setInterval(() => {
      this.hora = [];
      this.usu = [];
      this.act = [];
      this.getmoodleusu();
    }, 60000); //each minute
  }

  fulldatachart() {
    this.lineChartData = [
      { data: this.act, label: 'acciones' },
      { data: this.usu, label: 'usuarios' },
    ];
    this.lineChartLabels = this.hora;
  }

  getmoodleusu() {
    this._moodleuserservice.get_user_action_moodle().subscribe(
      (response) => {
        this.temp = response['data'];
        this.temp.forEach((element) => {
          if (element['tipo'].replace(/ /g, '') == 'usu') {
            this.hora.unshift(element['hora']);
            this.usu.unshift(element['valor']);
          } else if (element['tipo'].replace(/ /g, '') == 'act') {
            this.act.unshift(element['valor']);
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
