import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCounter]',
  standalone: true
})
export class CounterDirective implements AfterViewInit, OnDestroy {
  @Input() appCounter: number = 0;
  @Input() duration: number = 1500;

  private observer!: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.textContent = '0';
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animate();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.5 });

    this.observer.observe(this.el.nativeElement);
  }

  private animate() {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = this.appCounter;

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < this.duration) {
        const progress = elapsedTime / this.duration;
        const currentVal = Math.floor(startValue + (endValue - startValue) * this.easeOutQuad(progress));
        this.el.nativeElement.textContent = currentVal.toString();
        requestAnimationFrame(updateCounter);
      } else {
        this.el.nativeElement.textContent = endValue.toString();
      }
    };

    requestAnimationFrame(updateCounter);
  }

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
