import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-humidity-graph',
  templateUrl: './humidity-graph.component.html',
  styleUrls: ['./humidity-graph.component.scss']
})
export class HumidityGraphComponent implements OnInit {
  canvasWidth: number;
  needleValue: number;
  centralLabel: string;
  name: string;
  bottomLabel: string;
  options: any;

  circleState: string;
  stringState: string;

  @Input() desiredValue: number;

  constructor() {
    this.canvasWidth = 400;
    this.needleValue = 50;
    this.centralLabel = '';
    this.name = 'Planta';
    this.bottomLabel = '50';
    this.options = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(205, 92, 92)', 'rgb(255,255,51)', 'rgb(0,153,0)', 'rgb(255,255,51)', 'rgb(205, 92, 92)'],
      arcDelimiters: [],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
    };
  }

  ngOnInit(): void {
    this.options.arcDelimiters = [this.desiredValue - 15, this.desiredValue - 5, this.desiredValue + 5, this.desiredValue + 15];
    this.updateState(50);
  }

  updateState(measurement): void{
    if (measurement >= this.desiredValue - 5 && measurement <= this.desiredValue + 5) {
      this.circleState = 'green';
      this.stringState = 'Óptimo';
    } else if (measurement < this.desiredValue - 15 || measurement > this.desiredValue + 15) {
      this.circleState = 'red';
      this.stringState = 'Critico';
    } else {
      this.circleState = 'yellow';
      this.stringState = 'No Óptimo'
    }
  }

}
