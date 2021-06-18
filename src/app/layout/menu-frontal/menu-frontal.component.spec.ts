import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFrontalComponent } from './menu-frontal.component';

describe('MenuFrontalComponent', () => {
  let component: MenuFrontalComponent;
  let fixture: ComponentFixture<MenuFrontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFrontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFrontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
