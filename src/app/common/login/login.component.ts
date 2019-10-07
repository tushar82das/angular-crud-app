import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() title: string = 'Appliaction Name';
  @Output() loginEvent = new EventEmitter();

  constructor(private _fb: FormBuilder, private userService: UserService) { }

  isLoginError: boolean = false;
  laertType: string = '';
  alertMsg: string = '';

  loginForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit(formStatus) {
    //let formObj = this.loginForm.value;
    let username = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.laertType = 'warning';
    this.alertMsg = 'Invalid Username or Password !!';

    if (formStatus == 'VALID') {
      this.isLoginError = false;
      this.userService.userLogin(username).subscribe(data => {
        if (data[0] != null && data[0] != undefined) {

          if (data[0].password == password) {
            this.loginEvent.emit(data[0]);
          } else {
            this.isLoginError = true;
          }
        } else {
          this.isLoginError = true;
        }
      });
    } else {
      this.isLoginError = true;
    }
  }

  closeAlertBox() {
    this.isLoginError = false;
  }
}
