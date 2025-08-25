import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtCreateComponent } from './debt-create.component';

describe('DebtCreateComponent', () => {
  let component: DebtCreateComponent;
  let fixture: ComponentFixture<DebtCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
