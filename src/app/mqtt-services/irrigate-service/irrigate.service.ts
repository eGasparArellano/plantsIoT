import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IrrigateService {

  endpoint: string;

  constructor(private mqttService: MqttService) {
    this.endpoint = 'irrigation';
  }

  topic(plantId: string): Observable<IMqttMessage> {
    const topicName = `/${this.endpoint}/${plantId}`;
    return this.mqttService.observe(topicName);
  }

  irrigate(plantId: string) {
    const topicName = `${this.endpoint}/${plantId}`;
    this.mqttService.unsafePublish(
      topicName,
      'r',
      {
        qos: 1,
        retain: true
      }
    );
  }
}
