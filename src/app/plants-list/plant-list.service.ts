import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantListService {
  plantList: any[];
  plantSubject = new Subject<any>();

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

  getPlants() {
    return this.plantList;
  }

  getPlantByIndex(index) {
    return  this.plantList.find((element) => element.id == index);
  }


}
