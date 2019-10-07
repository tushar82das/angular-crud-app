import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { UserLoginComponent } from './user-login.component';
import { LoginComponent } from '../common/login/login.component';
import { AlertComponent } from '../common/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([]), HttpClientModule],
      declarations: [UserLoginComponent, LoginComponent, AlertComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call onLoginSuccess() after login Success', () => {
    let mockData = {
      id: 1,
      name: "Tushar Das",
      email: "tushar82das@gmail.com",
      address: "Bangalore",
      phone: "7377163306",
      password: "test@123"
    }
    component.onLoginSuccess(mockData);
  })
});
