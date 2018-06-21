import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent {
  @Input() linkTitle: string;
  @Input() hasChildren: boolean;
  @Input() prefix: any;

  @Output() navItemClick: EventEmitter<string> = new EventEmitter<string>();


  public isCollapsed = true;

  handleClick() {
    // if (this.hasChildren) {
    //   this.isCollapsed = !this.isCollapsed;
    // }
    const title = this.linkTitle.replace(/\s/g, '');
    this.navItemClick.emit(title);
  }
}
