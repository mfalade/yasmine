import { Component, OnInit, EventEmitter, Output, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavService } from '../../_services/nav.service';
import { RequestService } from '../../_services/request.service';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent implements OnInit, OnChanges {
  public isRequesting: boolean;
  public showSuccessMessage: boolean;
  public showErrorMessage: boolean;
  public errorMessage: any;
  public showPageOneExtraFields: boolean;
  public dataForm: FormGroup;
  public formData: any;

  public isNew = true;
  public selectedTab: 'Identity';

  @Input() userData: any;
  @Output() userCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() userUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _sideNavService: NavService,
    private _requestService: RequestService,
  ) {
    this.initializeDataForm();
  }

  ngOnInit() {
    this._sideNavService.currentView$.subscribe(currentView => this.selectedTab = currentView);
  }

  ngOnChanges() {
    if (!this.formData && this.userData) {
      this.isNew = false;
      this.formData = this.userData;
      this.dataForm.patchValue(this.formData);
      this.showPageOneExtraFields = this.formData.requestType === 'new-user';
    }
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

  handleRequestTypeChange({ target }) {
    this.showPageOneExtraFields = target.value === 'new-user';
    this._sideNavService.setUserType(target.value);
  }

  onTabSelected(selectedView) {
    this._sideNavService.setCurrentView(selectedView);
  }

  submitForm() {
    this.isRequesting = true;
    this.isNew ? this.createNewUser() : this.updateUser();
  }

  createNewUser() {
    this._requestService.post('users', this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;
        this.resetForm();
        this.userCreated.emit(res.data);
        this._sideNavService.resetState();
      },
      err => {
        this.isRequesting = false;
        const errorMessage = err.constructor === Object ? (err.message || 'An error occurred') : err;
        this.errorMessage = errorMessage;
        this.showErrorMessage = true;
      }
    );
  }

  updateUser() {
    const url = `users/${this.formData._id}`;
    this._requestService.put(url, this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;

        this.userUpdated.emit(res.data);
        this._sideNavService.resetState();
      },
      err => {
        this.isRequesting = false;
        this.errorMessage = err;
        this.showErrorMessage = true;
      }
    );
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
}
