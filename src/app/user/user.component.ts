import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  allUsers: any;

  ngOnInit(): void {


    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })//get user id
      .subscribe((changes: any) => {
        this.allUsers = changes;
        console.log(this.allUsers);
      });
  }

  position: any;

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
