import { TestBed } from '@angular/core/testing';

import { ServiceProductoService } from './service-producto.service';

describe('ServiceProductoService', () => {
  let service: ServiceProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
