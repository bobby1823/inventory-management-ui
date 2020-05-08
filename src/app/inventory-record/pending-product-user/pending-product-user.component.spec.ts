import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProductUserComponent } from './pending-product-user.component';

describe('PendingProductUserComponent', () => {
  let component: PendingProductUserComponent;
  let fixture: ComponentFixture<PendingProductUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProductUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProductUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
