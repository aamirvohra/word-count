import { Directive, OnDestroy, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[word-count], textarea[word-count]',
  exportAs: 'word-count',
})

export class WordCountDirective implements OnDestroy {

  private totalCharacter: number;

  @Input('max-chars') private maxCharacters: number;

  constructor(private el: ElementRef) {
    this.totalCharacter =  0;
  }

  public ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  @HostListener('keypress', ['$event'])
  public keypress(event: KeyboardEvent) {

    if (this.el.nativeElement.value.length >= this.maxCharacters) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  @HostListener('keyup', ['$event'])
  public keyup(event: KeyboardEvent) {
    if (this.el.nativeElement.value.length > this.maxCharacters) {
      return;
    }

    this.totalCharacter = this.el.nativeElement.value.length;
  }
}
