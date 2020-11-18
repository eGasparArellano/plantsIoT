import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrrigateService } from 'src/app/mqtt-services/irrigate-service/irrigate.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {

  @Input() plantInformation;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private irrigateService: IrrigateService
  ) { }

  ngOnInit(): void {
  }

  showDetails(): void {
    this.router.navigateByUrl('/details/' + this.plantInformation.id);
  }

  irrigatePlant() {
    this.irrigateService.irrigate(this.plantInformation.plantNumber);
  }

}
