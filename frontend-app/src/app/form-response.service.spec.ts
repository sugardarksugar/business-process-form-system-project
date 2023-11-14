import { TestBed } from '@angular/core/testing';

import { FormResponseService } from './form-response.service';

describe('FormResponseService', () => {
  let service: FormResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
