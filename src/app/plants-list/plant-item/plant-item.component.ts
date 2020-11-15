import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
  }

  showDetails(): void {
    this.router.navigateByUrl('/details');
  }

}
