import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';

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

  public type = 'default';
  public id = 0;
  public selectedTab: 'firstPage';

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _requestService: RequestService
  ) { }

  ngOnInit() {
    this.dataForm = this._formBuilder.group({
      field1: ['default-1'],
      field2: [''],
      field3: ['default-1'],
      field4: ['default-1'],
      client: [false],
      newMember: [false],
      field7: [''],
      field8: ['combo-box1']
    });
  }

  submitForm() {
    this.isRequesting = true;
    this._requestService.post('data', this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;
        this.resetForm();

        setTimeout(() => {
          this._router.navigateByUrl('/');
        }, 2000);
      },
      err => {
        this.isRequesting = false;
        const errorMessage = err.constructor === Object ? (err.message || 'An error occurred') : err;
        this.errorMessage = errorMessage;
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

