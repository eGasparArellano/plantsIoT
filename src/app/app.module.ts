import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlantsListComponent } from './plants-list/plants-list.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlantsListComponent,
    PlantDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
