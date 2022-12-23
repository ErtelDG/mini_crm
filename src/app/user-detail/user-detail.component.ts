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

  //Daten an die asurufende Component übergeben
  editUserAddress() {
    console.log('EDIT ADDRESS');

    //welche component übergeben werden soll
    const dialog = this.dialog.open(DialogEditAddressComponent);
    //daten welche übergeben werden sollen und wo diese in der aufrufenden component gespeichert werden soll
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  editUserDetail() {
    console.log('EDIT USER');

    //welche component übergeben werden soll
    const dialog = this.dialog.open(DialogEditUserComponent);
    //daten welche übergeben werden sollen und wo diese in der aufrufenden component gespeichert werden soll
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
