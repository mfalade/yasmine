import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../../_services/request.service';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
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
  public data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService
  ) { }

  ngOnInit() {
    this.dataForm = this._formBuilder.group({
      appId: [''],
      name: [''],
      environment: [''],
      requestType: [''],
      client: [false],
      vip: [false],
      professionalStatus: [''],
      universityStaffYes: [true],
      universityStaffNo: [false],
      status: [''],
      plainText1: [''],
      plainText2: [''],
      plainText3: [''],
      plainText4: [''],
      plainText5: [''],
      plainText6: [''],
      plainText7: [''],
      plainText8: [''],
      plainText9: [''],
      plainText10: [''],
      plainText11: [''],
      plainText12: [''],
      plainText13: [''],
      plainText14: [''],
      plainText15: [''],
      plainText16: [''],
      plainText17: [''],
      plainText18: [''],
    });
    this.fetchData();
  }

  fetchData() {
    this._route.params.subscribe((params: Params) => {
      const dataId = params['id'];
      const url = `data/${dataId}`;
      this._requestService.get(url).subscribe(
        res => {
          const data = res.data[0];
          this.data = data;
          this.dataForm.patchValue(data);
        },
        err => {
          console.log('error', err);
        });
  });
  }

  submitForm() {
    this.isRequesting = true;
    const data = this.dataForm.value;
    const url = `data/${this.data._id}`;
    this._requestService.put(url, this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;

        setTimeout(() => {
          this._router.navigateByUrl('/');
        }, 2000);
      },
      err => {
        this.isRequesting = false;
        this.errorMessage = err;
        this.showErrorMessage = true;
      }
    );
  }
}
