import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() isUpdate: boolean = false;
  @Input() registerForm: FormGroup;
  @Output() submitEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /*#onSubmit will call on form submit*/
  onSubmit(valid) {
    this.submitEvent.emit(valid);
  }

  /*getter for name field*/
  get name() {
    return this.registerForm.get('name');
  }

  /*getter for phone field*/
  get phone() {
    return this.registerForm.get('phone');
  }

  /*getter for password field*/
  get password() {
    return this.registerForm.get('password');
  }

  /*getter for email field*/
  get email() {
    return this.registerForm.get('email');
  }

  /*#revert method is used to reset the form values*/
  revert() {
    this.registerForm.reset();
  }

}
