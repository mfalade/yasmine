import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  public dataList: any[] = [];
  public requestForm: FormGroup;
  public showModal: boolean;
  public stagedItem: any;
  public loading = false;
  public deleteItemError: any;
  public showCancelRequestModal: boolean;
  public errorMessage: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public showRemarksInput = false;

  constructor(
    private _requestService: RequestService,
    private _storeService: StoreService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.initializeRequestForm();
    this.getRequestStudents();
    this._storeService.clearCache();
  }

  initializeRequestForm() {
    this.requestForm = this._formBuilder.group({
      appId: ['default-1'],
      name: [''],
      environment: ['default-1'],
      remarks: [''],
      status: ['under_construction'],
      students: [[]],
    });
  }

  setRemarkVisibility(ev) {
    this.showRemarksInput = ev.target.checked;
  }

  getRequestStudents() {
    this._storeService.studentRequests$.subscribe(students => {
      const lenStudents = students.length;
      this.dataList = students.map((student, index) => ({
        ...student,
        displayId: this.formatStudentId(lenStudents - index)
      }));
    });
  }

  addNewItem()  {
    this._router.navigateByUrl('/user/create');
  }

  editData (data) {
    const url = `/user/${data._id}/edit`;
    this._router.navigateByUrl(url);
  }

  submitRequest(requestStatus) {
    const studentsId = this.dataList.map(user => user._id);
    this.loading = true;
    this.requestForm.controls['students'].setValue(studentsId);
    this.requestForm.controls['status'].setValue(requestStatus);
    this._requestService.post('requests', this.requestForm.value).subscribe(
      res => {
        this.loading = false;
        this.showSuccessMessage = true;
        this._storeService.clearCache();

        setTimeout(() => {
          this._router.navigateByUrl('/');
        }, 2000);
      },
      err => {
        this.loading = false;
        const errorMessage = err.constructor === Object ? (err.message || 'An error occurred') : err;
        this.errorMessage = errorMessage;
        this.showErrorMessage = true;
      }
    );
  }

  stageItemForDeletion (data) {
    this.deleteItemError = null;
    this.stagedItem = data;
    this.showModal = true;
  }

  confirmCancelRequest() {
    this.requestForm.reset({
      appId: 'default-1',
      name: '',
      environment: 'default-1',
      remarks: false
    });
    this._storeService.clearCache();
    this.showCancelRequestModal = false;
  }

  confirmDelete () {
    this._storeService.deleteRequest(this.stagedItem);
    this.showModal = false;
  }

  deleteItemFromDb() {
    const resource = `users/${this.stagedItem._id}`;
    this._requestService.delete(resource).subscribe(
      res => {
        this.deleteItemError = null;
        this.getRequestStudents();
      },
      err => this.deleteItemError = err
    );
  }

  formatStudentId(id) {
    const lengthID = (id + '').length;
    const numPaddings = 3 - lengthID;
    return `Student #${'0'.repeat(numPaddings)}${id}`;
  }
}
