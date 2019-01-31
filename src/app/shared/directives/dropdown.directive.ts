import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: `[appDropdown]`
})
export class DropdownDirective {

  isOpen = false;

  constructor(private renderer: Renderer2) {
  }

  @Input() appDropdown: string;

  @HostListener('click', ['$event']) clickin(event: MouseEvent): void {

    event.stopPropagation();

    const parent = this.getParent();

    console.log(this.isOpen);

    this.isOpen ? this.renderer.removeClass(parent, 'slds-is-open') : this.renderer.addClass(parent, 'slds-is-open');
    this.isOpen = !this.isOpen;

  }

  @HostListener('document:click') clickout(event: MouseEvent): void {
    const parent = this.getParent();

    if (this.isOpen) {
      console.log('close');
      this.renderer.removeClass(parent, 'slds-is-open');
      this.isOpen = false;
    }
  }


  getParent() {
    return this.renderer.selectRootElement(this.appDropdown, true);
  }

}
