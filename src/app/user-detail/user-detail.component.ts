import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  userID: any = '';
  user: User = new User();

  //getIDfromURL
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id'); //getURL ID
      this.getUser();
    });
  }

  // get user values by id and subscribe
  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userID)
      .valueChanges()
      .subscribe((user) => {
        this.user = new User(user);
      });
  }

  editUserAddress() {
    console.log('EDIT ADDRESS');

    const dialog = this.dialog.open(DialogEditAddressComponent);

    dialog.componentInstance.user = this.user;
  }

  editUserDetail() {
    console.log('EDIT USER');

    const dialog = this.dialog.open(DialogEditUserComponent);

    dialog.componentInstance.user = this.user;
  }
}
