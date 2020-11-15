import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantListService } from '../plants-list/plant-list.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {
  plant = {};

  constructor(private plantService: PlantListService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    this.plantService.loadPlants();
    this.route.params.subscribe( (params) => {
      this.plantService.plantSubject.subscribe((data) => {
        this.plant = this.plantService.getPlantByIndex(params.id);
      });
    });
  }

}
