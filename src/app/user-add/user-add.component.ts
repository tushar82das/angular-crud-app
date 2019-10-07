import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _fb: FormBuilder, private userService: UserService) { }

  isShowAlert: boolean = false;
  alertType: string = '';
  alertMsg: string = '';

  isUpdateForm: boolean = false;
  url_id: number;

  registerForm = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required, phoneNumberValidator]],
    address: ['']
  });

  ngOnInit() {
    this.initCheckIfUpdate();
  }

  /*This function is to check activatedRoute for update*/
  initCheckIfUpdate() {
    this.url_id = this.activatedRoute.snapshot.params['id'];
    if (this.url_id != null && this.url_id != undefined) {
      this.getUserDetails(this.url_id);
      this.isUpdateForm = true;
    } else {
      this.isUpdateForm = false;
    }
  }

  /*This function is to get user data and update the registerForm*/
  getUserDetails(id) {
    this.userService.getUserDetails(id).subscribe(data => {
      this.registerForm.patchValue({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address
      });
    });
  }

  submitForm(valid) {
    if (valid) {
      let formObj = this.registerForm.value;

      if (this.isUpdateForm) {
        this.updateUserRecord(this.url_id, formObj);
      } else {
        this.addUserRecord(formObj);
      }

    } else {
      this.alertType = 'warning';
      this.alertMsg = 'Please Fill all the record !!';
      this.isShowAlert = true;
    }
  }

  /*#addUserRecord method is used to add user data*/
  addUserRecord(formObj) {
    this.userService.addUserRecord(formObj).subscribe(data => {
      if (data != null && data != undefined) {
        this.userService.getAllUsersGlobal();
        this.alertType = 'success';
        this.alertMsg = 'User Added Successfully !!';
        this.isShowAlert = true;
      }
    });
  }

  /*#updateUserRecord method is used to update user data*/
  updateUserRecord(id, formObj) {
    this.userService.updateUserRecord(id, formObj).subscribe(data => {
      if (data != null && data != undefined) {
        this.userService.getAllUsersGlobal();
        this.alertType = 'success';
        this.alertMsg = 'User Updated Successfully !!';
        this.isShowAlert = true;
      }
    });
  }

  /*#closeAlertBox method is used to close the Alert box*/
  closeAlertBox() {
    this.isShowAlert = false;
  }

}
