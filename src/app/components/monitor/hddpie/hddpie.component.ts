import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

import { HddService } from 'src/app/services/hdd.service';

@Component({
  selector: 'app-hddpie',
  templateUrl: './hddpie.component.html',
  styleUrls: ['./hddpie.component.css'],
  providers: [HddService],
})
export class HddpieComponent implements OnInit {
  public disco;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['En uso'], ['disponible']];
  public pieChartData: SingleDataSet = [90,10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private _hddservice: HddService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.gethdds();
    setInterval(() => {
      this.gethdds();
    }, 3600000); //cada un minuto
  }

  fulldatachart(disco) {
    this.pieChartData = [parseInt(disco), 100-parseInt(disco)];
  }

  gethdds() {
    this._hddservice.gethdds(1).subscribe(
      (response) => {
        var nuevo = response['data'].pop();
        this.fulldatachart(nuevo['valor']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
