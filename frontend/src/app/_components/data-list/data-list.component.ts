import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestService } from '../../_services/request.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  public dataList: any[] = [];
  public requestForm: FormGroup;
  public showModal: boolean;
  public stagedItem: any;
  public loading = true;
  public deleteItemError: any;

  constructor(
    private _requestService: RequestService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit() {
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

  addNewItem()  {
    this._router.navigateByUrl('/data/create');
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
}
