import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IrrigateService {

  endpoint: string;

  constructor(private mqttService: MqttService) {
    this.endpoint = 'ITESO/IoT/GreenLife';
  }

  topic(plantNumber: string): Observable<IMqttMessage> {
    const topicName = `/${this.endpoint}/${plantNumber}`;
    return this.mqttService.observe(topicName);
  }

  irrigate(plantNumber: string) {
    const topicName = `${this.endpoint}/${plantNumber}`;
    this.mqttService.unsafePublish(
      topicName,
      '1',
      {
        qos: 1,
        retain: true
      }
    );
  }
}
