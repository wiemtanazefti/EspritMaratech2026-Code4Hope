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
    { title: 'Gestion de Projets', description: 'Organisez vos projets efficacement', color: '#6b5ce7' },
    { title: 'Réunions Productives', description: 'Planifiez vos réunions en toute simplicité', color: '#a29bfe' },
    { title: 'Documentation Centralisée', description: 'Tous vos documents au même endroit', color: '#74b9ff' }
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
