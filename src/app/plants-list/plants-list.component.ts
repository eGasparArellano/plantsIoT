import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/models/Plant';
import { PlantListService } from './plant-list.service';

// Use JQuery
declare var $: any;

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {
  plantList;
  newPlant: Plant;

  constructor(private route: ActivatedRoute,  private router: Router, private plantService: PlantListService) { 
    this.newPlant = new Plant();
  }

  ngOnInit(): void {
    this.plantList = this.plantService.getPlants();

    this.plantService.plantSubject.subscribe(
      (data) => {
        console.log(data);
        this.plantList = data;
      }
    );
  }

  saveNewPlant() {
    this.plantService.addPlant(this.newPlant);
    $('#addPlantModal').modal('toggle');
  }
}
