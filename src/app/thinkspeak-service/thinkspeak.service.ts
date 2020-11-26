import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import {retry, switchMap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThinkspeakService {
  stopMeasurement = new Subject<any>();

  humidityLevel$: Observable<any>;

  constructor(private http: HttpClient) {}

  getFieldValue(id): Observable<any> {
    this.humidityLevel$ = timer(1, 2000).pipe(
      switchMap(() => this.http.get(`https://api.thingspeak.com/channels/1233836/fields/${id}/last.json?api_key=R2Q3S0ZMT3CIWW5W`)),
      retry(),
      takeUntil(this.stopMeasurement)
    );
    return this.humidityLevel$;
  }

  ngOnDestroy() {
    this.stopMeasurement.next();
  }

}
