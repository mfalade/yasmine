import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(
    private _router: Router,
    private _storeService: StoreService,
  ) { }

  onUserCreated(userData) {
    this._storeService.addStudentRequest(userData);

    setTimeout(() => {
      this._router.navigateByUrl('/requests/add');
    }, 1000);
  }
}

