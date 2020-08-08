import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';


import { DataService } from './data.service';
import { cities }  from './../../assets/data/cities';
import { HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cities data', () => {
    const citiesData = service.getCities();
    expect(citiesData).toEqual(cities);
  });


});
