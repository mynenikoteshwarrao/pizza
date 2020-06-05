import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispListComponent } from './disp-list.component';

describe('DispListComponent', () => {
  let component: DispListComponent;
  let fixture: ComponentFixture<DispListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
