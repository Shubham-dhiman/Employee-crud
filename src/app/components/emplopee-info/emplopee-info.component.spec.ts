import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplopeeInfoComponent } from './emplopee-info.component';

describe('EmplopeeInfoComponent', () => {
  let component: EmplopeeInfoComponent;
  let fixture: ComponentFixture<EmplopeeInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmplopeeInfoComponent]
    });
    fixture = TestBed.createComponent(EmplopeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
