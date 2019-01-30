import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: `[appDropdown]`
})
export class DropdownDirective {

  private isOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @Input() appDropdown: string;

  @HostListener('click', ['$event']) onclick(event: MouseEvent): void {

    const parent = this.renderer.selectRootElement(this.appDropdown, true);

    this.isOpen ? this.renderer.removeClass(parent, 'slds-is-open') : this.renderer.addClass(parent, 'slds-is-open');
    this.isOpen = !this.isOpen;
  }

}
