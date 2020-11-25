import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Plant } from 'src/models/Plant';

@Injectable({
  providedIn: 'root'
})
export class PlantListService {
  plantList: any[];
  plantSubject = new Subject<any>();
  singlePlantSubject = new Subject<Plant>();

  constructor(private http: HttpClient) {
    this.loadPlants();
  }

  loadPlants() {
    this.http.get<any[]>(environment.url + '/api/plants').subscribe(
      (data) => {
        this.plantList = data;
        this.plantSubject.next(this.getPlants());
      },
      (err) => console.log(err)
    );
  }

  getPlantById(id) {
    this.http.get<Plant>(environment.url + '/api/plants/' + id).subscribe(
      (data: Plant) => {
        this.singlePlantSubject.next(data);
      },
      (err) => console.log(err)
    );
  }

  getPlants() {
    return this.plantList;
  }

  getNextPlantNumber() {
    return this.plantList.length + 1;
  }

  getPlantByIndex(index) {
    return  this.plantList.find((element) => element.id === index);
  }

  addPlant(plant) {
    this.http.post<any>(environment.url + '/api/plants', plant).subscribe(
      (data) => {
        this.plantList.push(data);
        this.plantSubject.next(this.getPlants());
      },
      (err) => console.log(err)
    );
  }

  deletePlant(id) {
    this.http.delete<any>(environment.url + '/api/plants/' + id).subscribe(
      (data) => {
        // console.log(data);
        const index = this.plantList.findIndex((plant) => plant.id === id);
        this.plantList.splice(index, 1);
        this.plantSubject.next(this.getPlants());
      },
      (err) => console.log(err)
    );
  }
}
