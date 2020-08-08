import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FilteredFlights } from 'src/app/models/city';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public flights: FilteredFlights;
  public priceFilter: number;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.search.subscribe(filteredFlights => {
      this.flights = filteredFlights;
      });

      this.dataService.priceFilterEvent.subscribe(val => this.priceFilter = val);
  }

}
