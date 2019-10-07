import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUsers } from '../../models/users';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  isShowAlert: boolean = false;
  alertType: string = '';
  alertMsg: string = '';

  users: IUsers[];
  cols: any[];
  ctx: {};


  constructor(private userService: UserService) { }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
      { field: 'phone', header: 'Phone' },
      { field: 'address', header: 'Address' }
    ];

    this.initGetAllUsers();

  }

  initGetAllUsers() {
    this.userService.getAllUsersGlobal();
    this.userService.allUsersGlobal.subscribe(data => {
      this.users = data;
      setTimeout(() => {
        this.ctx = { coloums: this.cols, values: this.users };
      }, 500);
    })
  }

  closeAlertBox() {
    this.isShowAlert = false;
  }

  showDeleteConfirm: boolean = false;
  del_id: number;

  deleteButton(data_id) {
    this.del_id = data_id;
    this.showDeleteConfirm = true;
  }

  confirmDeleteYes() {
    let id = this.del_id;
    this.showDeleteConfirm = false;
    this.userService.deleteUserRecord(id).subscribe(data => {
      if (data != null && data != undefined) {
        this.alertType = 'success';
        this.alertMsg = 'Record Deleted Successfully !!';
        this.isShowAlert = true;
        this.initGetAllUsers();
      } else {
        this.alertType = 'warning';
        this.alertMsg = 'Record Not Deleted. Please Try Again !!';
        this.isShowAlert = true;
      }
    });
  }

}
