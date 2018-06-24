import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';
import { StoreService } from '../../_services/store.service';
import { NavService } from '../../_services/nav.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public currentView = '';
  public dataForm: FormGroup;
  public payload: any = {};
  public errorMessage: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public isRequesting = false;
  public dataList: any[] = [];
  public requestForm: FormGroup;
  public showModal: boolean;
  public stagedItem: any;
  public loading = true;
  public deleteItemError: any;
  public showPageOneExtraFields = false;

  public type = 'default';
  public id = 0;
  public selectedTab: 'Identity';

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _storeService: StoreService,
    private _requestService: RequestService,
    private _nav: NavService,
  ) { }

  ngOnInit() {
    this.initializeRequestForm();
  }

  initializeDataForm() {
    this.dataForm = this._formBuilder.group({
      requestType: ['first-user'],
      clientType: ['vip'],
      professionalStatus: ['combo-box1'],
      isUniversityStaff: ['no'],
      status: ['Sir'],
      plainText1: ['default-1'],
      plainText2: [''],
      plainText3: [''],
      plainText4: [''],
      plainText5: [''],
      plainText6: [''],
      plainText7: [''],
      plainText8: [''],
      plainText9: [''],
      plainText10: ['default-1'],
      plainText11: [''],
      plainText12: [''],
      plainText13: ['default-1'],
      plainText14: ['default-1'],
      plainText15: [''],
      plainText16: ['default-1'],
      plainText17: ['default-1'],
      plainText18: ['default-1'],
    });
  }

  initializeRequestForm() {
    this.requestForm = this._formBuilder.group({
      appId: ['default-1'],
      name: [''],
      environment: ['default-1'],
      remarks: [false],
    });
  }

  onUserCreated(userData) {
    this._storeService.addStudentRequest(userData);

    setTimeout(() => {
      this._router.navigateByUrl('/requests/add');
    }, 1000);
  }

  finalValidation() {
    this._router.navigateByUrl('/');
  }
}

