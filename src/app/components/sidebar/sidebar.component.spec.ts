import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { DataService } from 'src/app/services/data.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockedDataService: DataService;

  beforeEach(async(() => {

    mockedDataService = jasmine.createSpyObj('DataService', ['flightSearch']);
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      providers: [
        {provide: DataService, useValue: mockedDataService},
        FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
