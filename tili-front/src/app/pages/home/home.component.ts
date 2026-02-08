import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentSlide = 0;
  slides = [
    { title: 'إدارة المشاريع', description: 'نظّم مشاريعك بفعالية', color: '#6b5ce7' },
    { title: 'اجتماعات منتجة', description: 'خطّط لاجتماعاتك بكل سهولة', color: '#a29bfe' },
    { title: 'وثائق مركزية', description: 'كل وثائقك في مكان واحد', color: '#74b9ff' }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
