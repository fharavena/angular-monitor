import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HddService } from 'src/app/services/hdd.service';

@Component({
  selector: 'app-hdd',
  templateUrl: './hdd.component.html',
  styleUrls: ['./hdd.component.css'],
  providers: [HddService],
})
export class HddComponent implements OnInit {
  disco;
  fecha;

  lineChartData: ChartDataSets[] = [{ data: [], label: '' }];

  lineChartLabels: Label[] = ['5', '4', '3'];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 75, // minimum will be 0, unless there is a lower value.
            suggestedMax: 100
            // OR //
            //beginAtZero: true, // minimum value will be 0.
          },
        },
      ],
    },
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

  constructor(private _hddservice: HddService) {}

  ngOnInit(): void {
    this.gethdds();
    setInterval(() => {
      this.gethdds();
    }, 3600000); //cada un minuto
  }

  fulldatachart(fecha, disco) {
    this.lineChartData = [{ data: disco, label: 'Crecimiento uso de disco duro' }];
    this.lineChartLabels = fecha;
  }

  gethdds() {
    this._hddservice.gethdds().subscribe(
      (response) => {
        this.fecha = response.data.map(function (value) {
          return value.fecha;
        });
        this.disco = response.data.map(function (value) {
          return value.valor;
        });
        this.fulldatachart(this.fecha, this.disco);

      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
