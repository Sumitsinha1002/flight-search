import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  @Input() flightData: any;
  @Input() passengers: number;
  @Input() returnFlight: boolean;
  constructor() {

  }

  ngOnInit() {
  }

}
