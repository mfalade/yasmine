import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../../_services/request.service';
import { StoreService } from '../../_services/store.service';
import { NavService } from '../../_services/nav.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
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
  public data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService,
    private _storeService: StoreService,
    private _nav: NavService,
  ) { }

  ngOnInit() {
    this.initializeDataForm();
    this.fetchData();
    this._nav.currentView$.subscribe(currentView => this.selectedTab = currentView);
  }

  initializeDataForm() {
    this.dataForm = this._formBuilder.group({
      requestType: ['first-user'],
      clientType: ['vip'],
      isUniversityStaff: ['no'],
      professionalStatus: [''],
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

  fetchData() {
    this._route.params.subscribe((params: Params) => {
      const resource = `users/${params['id']}`;
      this._requestService.get(resource).subscribe(
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

  getDataFromBe(url) {
    this._requestService.get(url).subscribe(
      res => {
        const data = res.data[0];
        this.data = data;
        this.dataForm.patchValue(data);
      },
      err => {
        console.log('error', err);
      });
  }

  updateItemInDb() {
    this.isRequesting = true;
    const data = this.dataForm.value;
    const url = `users/${this.data._id}`;
    this._requestService.put(url, this.dataForm.value).subscribe(
      res => {
        this.isRequesting = false;
        this.showSuccessMessage = true;

        setTimeout(() => {
          this._router.navigateByUrl('/requests/add');
        }, 2000);
      },
      err => {
        this.isRequesting = false;
        this.errorMessage = err;
        this.showErrorMessage = true;
      }
    );
  }

  submitForm() {
    this.isRequesting = true;

    const data = {
      ...this.dataForm.value,
    };
    this._storeService.updateRequest(data);
    this.updateItemInDb();
    this.isRequesting = false;
    this.showSuccessMessage = true;

    setTimeout(() => {
      this._router.navigateByUrl('/requests/add');
    }, 2000);
  }

  onTabSelected(selectedView) {
    this._nav.setCurrentView(selectedView);
  }
}
