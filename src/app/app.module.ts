import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlantsListComponent } from './plants-list/plants-list.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlantItemComponent } from './plants-list/plant-item/plant-item.component';
import { HttpClientModule } from '@angular/common/http';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: (environment.mqtt.protocol === 'wss') ? 'wss' : 'ws',
  path: '/mqtt'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlantsListComponent,
    PlantDetailsComponent,
    NavbarComponent,
    PlantItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
