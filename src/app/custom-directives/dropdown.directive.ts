import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

/**
 * This directive makes Bootstrap's dropdown interactable
 */
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  /** Defines if dropdown is activated */
  @HostBinding("class.open") isOpen: boolean = false;
  
  /** Listens to user clicks and manages the dropdown. */
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}

}
