import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CpuComponent } from './components/monitor/cpu/cpu.component';
import { HddComponent } from './components/monitor/hdd/hdd.component';
import { HddpieComponent } from './components/monitor/hddpie/hddpie.component';
import { BarChartComponent } from './components/graph/bar-chart/bar-chart.component';
import { BubbleChartComponent } from './components/graph/bubble-chart/bubble-chart.component';
import { LineChartComponent } from './components/graph/line-chart/line-chart.component';
import { PieChartComponent } from './components/graph/pie-chart/pie-chart.component';
import { RadarChartComponent } from './components/graph/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './components/graph/doughnut-chart/doughnut-chart.component';
import { DbbComponent } from './components/monitor/dbb/dbb.component';
import { UsermoodleComponent } from './components/monitor/usermoodle/usermoodle.component';
import { MaquetaComponent } from './components/test/maqueta/maqueta.component';
import { SensorComponent } from './components/monitor/sensor/sensor.component';
import { UserperdayComponent } from './components/monitor/userperday/userperday.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CpuComponent,
    HddComponent,
    HddpieComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent,
    DbbComponent,
    UsermoodleComponent,
    MaquetaComponent,
    SensorComponent,
    UserperdayComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
