import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseDetailComponent } from './license-detail.component';

describe('LicenseDetailComponent', () => {
  let component: LicenseDetailComponent;
  let fixture: ComponentFixture<LicenseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
