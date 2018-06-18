import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit {
  @Input() linkTitle: string;
  @Input() hasChildren: boolean;
  @Input() prefix: any;

  public isCollapsed = true;

  handleClick() {
    if (this.hasChildren) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
