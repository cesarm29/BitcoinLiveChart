import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent  {

  title = 'Highcharts  Angular 7';

  @ViewChild('chartTarget') chartTarget: ElementRef;
  @ViewChild('usdChartTarget') usdChartTarget: ElementRef;

  chart: Highcharts.ChartObject;
  usdChart: Highcharts.ChartObject;

  //url's
  inr_url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=INR&apikey=MIX93213R84R24Z9';
  usd_url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=MIX93213R84R24Z9';

  inrRate = 0;
  usdRate = 0;

  constructor(private http: Http) {}

  ngOnInit() {
    setInterval(() => {
      this.http.get(this.inr_url).subscribe(response => {
        let data = response.json();
        let value = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        value = +value;

        this.inrRate = value;

        this.chart.series[0].addPoint(value);
        this.chart.series[0].yAxis.setExtremes(value-10, value+10,true);
        console.log(JSON.stringify(data));
      })

      this.http.get(this.usd_url).subscribe(response => {
        let data = response.json();
        let value = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        value = +value;
        this.usdRate = value;        
        this.usdChart.series[0].yAxis.setExtremes(value-10, value+10,true);
        this.usdChart.series[0].addPoint(+value);
        console.log(JSON.stringify(data));
      })

    },
      500);
  }

  ngAfterViewInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'COP'
      },
      xAxis: {
      },
      yAxis: {
        title: {
          text: 'Price'          
        }
      },
      series: [{
        name: 'COP',
        data: []
      }]
    };

    const usdOptions: Highcharts.Options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'USD'
      },
      xAxis: {
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: [{
        name: 'USD',
        data: []
      }]
    };

    this.chart = chart(this.chartTarget.nativeElement, options);

    this.usdChart = chart(this.usdChartTarget.nativeElement, usdOptions);
  }
}
