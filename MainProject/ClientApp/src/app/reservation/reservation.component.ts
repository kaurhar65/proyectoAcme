import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  palabra: string = '';

  @ViewChild('pageContent', { read: ElementRef })
  pageContent!: ElementRef;

  onSearch() {
    const term = this.palabra.toLowerCase();
    const elements = this.pageContent.nativeElement.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      this.searchInElement(element, term);
    }
  }

  private searchInElement(element: HTMLElement, term: string) {
    const text = element.innerText.toLowerCase();
    if (text.includes(term)) {
      this.highlight(element);
    } else {
      this.removeHighlight(element);
    }

    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      this.searchInElement(children[i] as HTMLElement, term);
    }
  }

  private highlight(element: HTMLElement) {
    element.style.color = 'blue';
  }

  private removeHighlight(element: HTMLElement) {
    element.style.backgroundColor = '';
  }
}
