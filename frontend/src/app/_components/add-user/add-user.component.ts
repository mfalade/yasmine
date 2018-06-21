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
  public isSaved = false;
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
    this.initializeDataForm();
    this.initializeRequestForm();
    this._nav.currentView$.subscribe(currentView => this.selectedTab = currentView);
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

  handleRequestTypeChange({ target }) {
    if (target.value !== 'client-vip') {
      this.dataForm.patchValue({
        client: false,
        vip: false,
        isUniversityStaff: true,
      });
      this.showPageOneExtraFields = false;
      return;
    }
    this.showPageOneExtraFields = true;
  }

  submitForm() {
    this._requestService.post('users', this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;
        this.resetForm();
        this.isSaved = true;
        this._storeService.addStudentRequest(res.data);

        setTimeout(() => {
          this._router.navigateByUrl('/requests/add');
        }, 1000);
      },
      err => {
        this.isRequesting = false;
        const errorMessage = err.constructor === Object ? (err.message || 'An error occurred') : err;
        this.errorMessage = errorMessage;
        this.showErrorMessage = true;
      }
    );
  }

  finalValidation() {
    this._router.navigateByUrl('/');
  }

  resetForm() {
    setTimeout(() => {
      this.dataForm.reset({
        field1: 'default-1',
        field2: '',
        field3: 'default-1',
        field4: 'default-1',
        client: false,
        newMember: false,
        field7: '',
        field8: 'default-1',
      });
    }, 1500);
  }

  onTabSelected(selectedView) {
    this._nav.setCurrentView(selectedView);
  }
}

