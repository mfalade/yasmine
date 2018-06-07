import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';
import { StoreService } from '../../_services/store.service';
import { generateUniqueId } from '../../_shared/utils';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  public currentPage = 1;
  public dataForm: FormGroup;
  public payload: any = {};
  public errorMessage: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public isRequesting = false;
  public showPageOneExtraFields = false;

  public type = 'default';
  public id = 0;
  public selectedTab: 'firstPage';

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _storeService: StoreService,
    private _requestService: RequestService
  ) { }

  ngOnInit() {
    this.dataForm = this._formBuilder.group({
      requestType: ['first-user'],
      client: [false],
      vip: [false],
      professionalStatus: ['combo-box1'],
      universityStaffYes: [false],
      universityStaffNo: [false],
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
    this.initializeRequestForm();
    this.fetchItems();
  }


  initializeRequestForm() {
    this.requestForm = this._formBuilder.group({
      appId: ['default-1'],
      name: [''],
      environment: ['default-1'],
      remarks: [false],
    });
  }

  fetchItems() {
    this._requestService.get('data').subscribe(
      res => {
        this.dataList = res.data;
        this.loading = false;
      }, err => {
        this.loading = false;
    });
  }

  editData (data) {
    const url = `/data/${data._id}/edit`;
    this._router.navigateByUrl(url);
  }

  stageItemForDeletion (data) {
    this.deleteItemError = null;
    this.stagedItem = data;
    this.showModal = true;
  }

  confirmDelete () {
    const resource = `data/${this.stagedItem._id}`;
    this._requestService.delete(resource).subscribe(
      res => {
        this.showModal = false;
        this.deleteItemError = null;
        this.fetchItems();
      },
      err => this.deleteItemError = err
    );
  }

  handleRequestTypeChange({ target }) {
    if (target.value !== 'client-vip') {
      this.dataForm.patchValue({
        client: false,
        vip: false,
        universityStaffYes: false,
        universityStaffNo: false
      });
      this.showPageOneExtraFields = false;
      return;
    }
    this.showPageOneExtraFields = true;
  }

  submitForm() {
    this.isRequesting = true;
    const studentRequest = {
      ...this.dataForm.value,
      requestId: generateUniqueId(),
      studentId: `student_${generateUniqueId().substring(0, 6)}`,
    };

    this._storeService.addStudentRequest(studentRequest);

    this.isRequesting = false;
    this.showSuccessMessage = true;
    this.resetForm();

    setTimeout(() => {
      this._router.navigateByUrl('/');
    }, 2000);
  }

  saveToDb() {
    this._requestService.post('data', this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;
        this.resetForm();
        this.isSaved = true;

        // setTimeout(() => {
        //   this._router.navigateByUrl('/');
        // }, 2000);
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
}

