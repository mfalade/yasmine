import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../_services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  public dataList: any[] = [];
  public showModal: boolean;
  public stagedItem: any;
  public loading = true;
  public deleteItemError: any;

  constructor(
    private _requestService: RequestService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.fetchItems();
  }

  formatRequestId(data) {
    const requestId = data.$loki + '';
    const numPaddings = 3 - requestId.length;
    return `Request #${'0'.repeat(numPaddings)}${requestId}`;
  }

  fetchItems() {
    this._requestService.get('requests').subscribe(
      res => {
        const lenDat = res.data.length;
        this.dataList = res.data.map((data, index) => ({
          ...data,
          displayId: this.formatRequestId(data)
        }));
        this.loading = false;
      }, err => {
        this.loading = false;
    });
  }

  addNewRequest()  {
    this._router.navigateByUrl('/requests/add');
  }

  editRequest (data) {
    const url = `/requests/${data['$loki']}/edit`;
    this._router.navigateByUrl(url);
  }

  stageItemForDeletion (data) {
    this.deleteItemError = null;
    this.stagedItem = data;
    this.showModal = true;
  }

  confirmDelete () {
    const resource = `requests/${this.stagedItem['$loki']}`;
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
