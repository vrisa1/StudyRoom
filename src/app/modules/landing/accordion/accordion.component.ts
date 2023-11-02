import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  ngOnInit(): void {
    this.prueba();
  }

  public prueba() {
    const cardsContainer: HTMLElement | null =
      document.querySelector('.container');

    cardsContainer?.addEventListener('click', (e: MouseEvent) => {
      const target: HTMLElement | null = (e.target as HTMLElement).closest(
        '.card'
      );

      if (!target) return;

      cardsContainer?.querySelectorAll('.card').forEach((card: any) => {
        card.classList.remove('active');
      });

      target.classList.add('active');
    });
  }
}
