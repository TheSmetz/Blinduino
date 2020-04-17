import { TestBed } from '@angular/core/testing';

import { GoogleCloudVisionServiceService } from './google-cloud-vision-service.service';

describe('GoogleCloudVisionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleCloudVisionServiceService = TestBed.get(GoogleCloudVisionServiceService);
    expect(service).toBeTruthy();
  });
});
