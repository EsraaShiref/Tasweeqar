import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  @Input() maxTilt = 8;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.1s ease';
    // Fix for 3D rendering
    this.el.nativeElement.style.transformStyle = 'preserve-3d';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -this.maxTilt;
    const tiltY = ((x - centerX) / centerX) * this.maxTilt;
    
    this.el.nativeElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (window.matchMedia('(hover: none)').matches) return;
    
    this.el.nativeElement.style.transition = 'transform 0.4s ease';
    this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    setTimeout(() => {
      this.el.nativeElement.style.transition = 'transform 0.1s ease';
    }, 400);
  }
}
