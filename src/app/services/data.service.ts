import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cities } from './../../assets/data/cities';
import { FilteredFlights, Flight } from '../models/city';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public twoWaySearch = false;
  public filteredFlight: FilteredFlights;
  public maxPrice: number;
  public minPrice: number;

  private flightEndpoint = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';

  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() priceRange: EventEmitter<any> = new EventEmitter();
  @Output() priceFilterEvent: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getCities() {
    return cities;
  }

  getAllFlights(formVal) {
    this.http.get(this.flightEndpoint)
    .subscribe((allFlightsData: Flight) => {
      sessionStorage.setItem('allFlightsData', JSON.stringify(allFlightsData));
      this.sendDataToComponents(allFlightsData, formVal);

    });
  }

  flightSearch(formVal) {
    const allFlightsData: Flight = JSON.parse(sessionStorage.getItem('allFlightsData'));

    allFlightsData ?
      this.sendDataToComponents(allFlightsData, formVal) :
      this.getAllFlights(formVal);

  }

  setPriceRange(flightData) {
    this.maxPrice = Math.max.apply(Math, flightData.oneWay.map((flight) => flight.price * flightData.formVal.passengers));
    this.minPrice = Math.min.apply(Math, flightData.oneWay.map((flight) => flight.price * flightData.formVal.passengers));
    isFinite(this.minPrice)
    ? this.priceRange.emit({max: this.maxPrice + 2000, min: this.minPrice - 2000})
    : this.priceRange.emit({max: 0, min: 0});
  }

  sendDataToComponents(allFlightsData, formVal) {
    const oneWay: Flight[] = this.filterFlights(allFlightsData, formVal.origin, formVal.dest, formVal.startDate);
    let twoWay: Flight[];
    if (formVal.returnDate) {
      twoWay = this.filterFlights(allFlightsData, formVal.dest, formVal.origin, formVal.returnDate);
    }
    const formValData = formVal;
    this.filteredFlight = {
      oneWay,
      twoWay,
      formVal: formValData
    };
    this.setPriceRange(this.filteredFlight);
    this.search.emit(this.filteredFlight);
  }

  filterFlights(allFlightsData, origin: string, dest: string, date: string) {
    return allFlightsData.filter((flight) => {
      return flight.origin.split('(').pop().split(')')[0] === origin &&
        flight.destination.split('(').pop().split(')')[0] === dest &&
        flight.date.replace(new RegExp('/', 'g'), '-') === date;
    });
  }

  filterByPrice(val) {
    this.priceFilterEvent.emit(val);
  }

}
