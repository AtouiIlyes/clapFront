import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-account-hierarchy',
  templateUrl: './account-hierarchy.component.html',
  styleUrls: ['./account-hierarchy.component.scss']
})
export class AccountHierarchyComponent implements AfterViewInit {
  @ViewChild('myId') myId: ElementRef;

  expanded = false;
  hovered = false;
  clientX = 'opx';
  clientY = '0px';
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
  }

  expandHierarchy() {
    this.expanded = !this.expanded;
  }

  accountHover(event, action: string) {
    if (action == 'enter') {
      this.clientX = event.pageX + 'px';
      this.clientY = event.pageY + 'px';
      this.renderer.setStyle(this.myId.nativeElement, 'z-index', '10');
      this.renderer.setStyle(this.myId.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(this.myId.nativeElement, 'left', this.clientX);
      this.renderer.setStyle(this.myId.nativeElement, 'top', this.clientY);
      this.hovered = true;

    } else {
      this.hovered = false;
    }
  }

}
