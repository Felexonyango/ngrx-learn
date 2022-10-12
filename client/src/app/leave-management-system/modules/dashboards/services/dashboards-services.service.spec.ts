import { TestBed } from '@angular/core/testing';

import { DashboardsServicesService } from './dashboards-services.service';

describe('DashboardsServicesService', () => {
  let service: DashboardsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
