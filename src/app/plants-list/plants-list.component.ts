import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
  }

  showDetails(): void {
    this.router.navigateByUrl('/details');
  }

}
