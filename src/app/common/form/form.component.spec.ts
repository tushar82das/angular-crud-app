import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FormComponent } from './form.component';

import { HttpClientModule } from '@angular/common/http';

import { AlertComponent } from '../alert/alert.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, AlertComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes([])],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should call closeAlertBox() and update isLoginError to False', () => {
  //   component.closeAlertBox();
  //   expect(component.isShowAlert).toBeFalsy();
  // });

  // it('Testing login form onSubmit() with INVALID formStatus', () => {
  //   let mockStatus = 'INVALID';
  //   component.onSubmit(mockStatus);
  // });

  // it('Testing login form onSubmit() with VALID formStatus', () => {
  //   let mockStatus = 'VALID';
  //   component.onSubmit(mockStatus);
  // });

  // it('form invalid when empty', () => {
  //   expect(component.registerForm.valid).toBeFalsy();
  // });

  // it('name field validity', () => {
  //   let name = component.registerForm.controls['name'];
  //   expect(name.valid).toBeFalsy();

  //   // name.setValue("");
  //   // expect(name.hasError('required')).toBeTruthy();

  //   name.setValue("Tushar");
  //   expect(name.valid).toBeTruthy();
  // });

  // it('email field validity', () => {
  //   let email = component.registerForm.controls['email'];
  //   expect(email.valid).toBeFalsy();

  //   email.setValue("Tushar");
  //   expect(email.valid).toBeTruthy();
  // });

});
