import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byPrice'
})
export class FilterByPricePipe implements PipeTransform {

  transform(values: any, range: number, passengers: number): any {
    if (!range) { return values; }

    return values.filter((flight) => {
      return (flight.price * passengers) <= range;
    });
  }

}
