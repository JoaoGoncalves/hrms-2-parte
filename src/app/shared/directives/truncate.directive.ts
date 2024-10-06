import { AfterViewInit, Directive, ElementRef, inject, InjectionToken, Input } from '@angular/core';

export const TruncateLimit = new InjectionToken('TruncateLimit');

@Directive({
  selector: '[appTruncate]',
  standalone: true
})
export class TruncateDirective implements AfterViewInit{

  @Input() limit = 50;
  //@Input() limit = inject(TruncateLimit, {optional: true}) ?? 50;
  private readonly elRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.elRef.nativeElement.textContent = this.elRef.nativeElement.textContent.slice(0, this.limit)
  }


}
