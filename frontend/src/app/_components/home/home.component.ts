import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataList: any[] = [];
  public requestForm: FormGroup;
  public showModal: boolean;
  public stagedItem: any;
  public loading = false;
  public deleteItemError: any;

  constructor(
    private _requestService: RequestService,
    private _storeService: StoreService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.initializeRequestForm();
    this.getRequestStudents();
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

  getRequestStudents() {
    this._storeService.studentRequests$.subscribe(students => {
      this.dataList = students;
    });
  }

  addNewItem()  {
    this._router.navigateByUrl('/data/create');
  }

  editData (data) {
    const url = `/data/${data.requestId}/edit`;
    this._router.navigateByUrl(url);
  }

  stageItemForDeletion (data) {
    this.deleteItemError = null;
    this.stagedItem = data;
    this.showModal = true;
  }

  confirmDelete () {
    this._storeService.deleteRequest(this.stagedItem);
    this.showModal = false;
  }

  deleteItemFromDb() {
    const resource = `data/${this.stagedItem._id}`;
    this._requestService.delete(resource).subscribe(
      res => {
        this.deleteItemError = null;
        this.fetchItems();
      },
      err => this.deleteItemError = err
    );
  }
}
