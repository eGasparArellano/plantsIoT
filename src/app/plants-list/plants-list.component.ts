import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantListService } from './plant-list.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {
  plantList;

  constructor(private route: ActivatedRoute,  private router: Router, private plantService: PlantListService) { }

  ngOnInit(): void {
    this.plantList = this.plantService.getPlants();

    this.plantService.plantSubject.subscribe(
      (data) => {
        console.log(data);
        this.plantList = data;
      }
    );
  }


}
