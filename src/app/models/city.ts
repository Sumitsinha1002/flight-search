export interface Cities {
  cities: object;
  name: string;
  code: string;
}

export interface FilteredFlights {
  oneWay: Flight[];
  twoWay: Flight[];
  formVal: any;
}

export interface Flight {
  arrivalTime: string;
  date: string;
  departureTime: string;
  destination: string;
  flightNo: string;
  name: string;
  origin: string;
  price: number;
}
