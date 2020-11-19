import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/models/Plant';
import { PlantListService } from '../plants-list/plant-list.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {
  plant: Plant;

  constructor(private plantService: PlantListService, private route: ActivatedRoute, private router: Router) {
    this.plant = new Plant();
  }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      // Request information
      this.plantService.getPlantById(params.id);

      // Subscribe to receive info
      this.plantService.singlePlantSubject.subscribe((data) => {
        this.plant = data;
      });
    });
  }

}
