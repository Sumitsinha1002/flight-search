import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // view child to get hold of form for resetting it on tab change
  @ViewChild('form') form: any;

  public model: any = {};
  public activeTab: string;
  public cities: object;
  public today: string;
  public maxPrice: number;
  public minPrice: number;

  constructor(private readonly dataService: DataService) {

  }

  ngOnInit() {
    this.activeTab = 'oneway';
    this.cities = this.dataService.getCities();
    this.today = new Date().toISOString().split('T')[0];
    this.dataService.priceRange.subscribe(range => {
      this.maxPrice = range.max;
      this.minPrice = range.min;
      console.log(this.minPrice);
      });
  }

  flightSearch(formVal) {
    this.dataService.flightSearch(formVal);
  }

  toggleTab(value) {
    this.activeTab = value;
  }

  filterByPrice(value) {
    this.dataService.filterByPrice(value);
  }
}
