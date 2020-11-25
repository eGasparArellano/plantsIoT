import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/models/Plant';
import { PlantListService } from '../plants-list/plant-list.service';

// Use JQuery
declare var $: any;

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {
  plant: Plant;
  chartSource: string;
  humidity: number;

  constructor(private plantService: PlantListService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    this.plant = new Plant();
    this.chartSource = '';
    this.humidity = 50;
  }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      // Request information
      this.plantService.getPlantById(params.id);
      // Subscribe to receive info
      this.plantService.singlePlantSubject.subscribe((data) => {
        this.plant = data;
        this.chartSource = `https://thingspeak.com/channels/1233836/charts/${data.plantNumber}?bgcolor=%23ffffff&color=%23d62020&dynamic=true&max=300&min=0&results=60&title=${data.name}&type=line&yaxis=Humidity+level&yaxismax=300&yaxismin=0`;
      });
    });

  }

  async deletePlant() {
    this.plantService.deletePlant(this.plant.id);
    $('#deletePlantModal').modal('toggle');
    this.router.navigateByUrl('/list');
  }


}

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
