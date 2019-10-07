import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IUsers } from '../models/users';

import { UserAddComponent } from './user-add.component';
import { FormComponent } from '../common/form/form.component';
import { AlertComponent } from '../common/alert/alert.component';

import { UserService } from '../services/user.service';
import { DebugElement } from '@angular/core';

import { of } from 'rxjs';

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let userService: UserService;

  let fixture: ComponentFixture<UserAddComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule],
      declarations: [UserAddComponent, AlertComponent, FormComponent],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should get user detail in case of update', () => {
    const mockResponse: IUsers = {
      id: 1,
      name: "Tushar Das",
      email: "tushar82das@gmail.com",
      address: "Bangalore",
      password: "test@123",
      phone: "7377163666"
    };

    spyOn(userService, 'getUserDetails').and.returnValue(of(mockResponse));

    component.getUserDetails(1);

    expect(component.registerForm.get('email').value).toEqual(mockResponse.email);
    expect(userService.getUserDetails).toHaveBeenCalled();
  });

  it('should add new user by calling addUserRecord()', () => {
    spyOn(userService, 'addUserRecord').and.returnValue(of('success'));
    let formObj = component.registerForm.value;
    component.addUserRecord(formObj);

    expect(component.alertType).toEqual('success');
    expect(userService.addUserRecord).toHaveBeenCalled();

    // console.log('<-------------------->');
    // console.log(component.alertType);
    // console.log(component.alertMsg);
    // console.log(component.isShowAlert);
    // console.log('<-------------------->');
  });

  it('should update user record by calling updateUserRecord()', () => {
    spyOn(userService, 'updateUserRecord').and.returnValue(of('success'));

    let userId = 1;
    let formObj = component.registerForm.value;
    component.updateUserRecord(userId, formObj);

    expect(component.alertType).toEqual('success');
    expect(userService.updateUserRecord).toHaveBeenCalled();
  });

  it('should call submitForm() with VALID form ststus', () => {
    let valid = true;
    component.submitForm(valid);

  });

  it('should call submitForm() and go to else part with INVALID form ststus', () => {
    let valid = false;
    component.submitForm(valid);

  });

  it('should call closeAlertBox() to close the Alert Box', () => {
    component.closeAlertBox();
    expect(component.isShowAlert).toBeFalsy();
  });

});
