import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../../_services/request.service';
import { NavService } from '../../_services/nav.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public errorMessage: any;
  public showErrorMessage = false;
  public isFetchingUserData: boolean;

  public userData: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService,
    private _navService: NavService
  ) { }

  ngOnInit() {
    this.fetchUserData();
    this._navService.resetState();
    this._navService.setUserType('new-user');
  }

  fetchUserData() {
    this.isFetchingUserData = true;
    this.errorMessage = null;
    this.showErrorMessage = false;

    this._route.params.subscribe((params: Params) => {
      const resource = `users/${params['id']}`;
      this._requestService.get(resource).subscribe(
        res => {
          this.isFetchingUserData = false;
          this.userData = res.data;
        },
        err => {
          this.isFetchingUserData = false;
          this.errorMessage = err;
          this.showErrorMessage = true;
        });
    });
  }

  onUserDataUpdated(userData) {
    setTimeout(() => {
      this._router.navigateByUrl('/requests/add');
    }, 2000);
  }
}
