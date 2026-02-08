import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjetService, ProjetDto, StatutProjet } from '../../core/services/projet.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  searchTerm = '';
  selectedStatus: string = 'Tous';
  projects: ProjetDto[] = [];
  loading = true;
  error: string | null = null;

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;
    this.projetService.getListe().subscribe({
      next: (list) => {
        this.projects = list || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Impossible de charger les projets';
        this.loading = false;
      }
    });
  }

  get filteredProjects(): ProjetDto[] {
    return this.projects.filter(project => {
      const titre = (project.titre || '').toLowerCase();
      const desc = (project.description || '').toLowerCase();
      const search = this.searchTerm.toLowerCase();
      const matchesSearch = !search || titre.includes(search) || desc.includes(search);
      const matchesStatus = this.selectedStatus === 'Tous' || this.getStatutLabel(project.statut) === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatutLabel(statut?: StatutProjet): string {
    if (!statut) return '—';
    const map: Record<StatutProjet, string> = {
      EN_COURS: 'En cours',
      TERMINE: 'Terminé',
      ANNULE: 'Annulé'
    };
    return map[statut] || statut;
  }

  getStatusCount(status: string): number {
    if (status === 'Tous') return this.projects.length;
    return this.projects.filter(p => this.getStatutLabel(p.statut) === status).length;
  }

  get statusFilters(): string[] {
    return ['Tous', 'En cours', 'Terminé', 'Annulé'];
  }

  getStatutClass(statut?: StatutProjet): string {
    if (!statut) return '';
    const map: Record<StatutProjet, string> = {
      EN_COURS: 'en-cours',
      TERMINE: 'termine',
      ANNULE: 'annule'
    };
    return map[statut] || '';
  }

  changeStatut(project: ProjetDto, newStatut: StatutProjet): void {
    if (!project.id) return;
    const utilisateurId = project.utilisateurId || 'current-user';
    this.projetService.changerStatut(project.id, newStatut, utilisateurId).subscribe({
      next: () => this.loadProjects(),
      error: (err) => this.error = err?.message || 'Erreur lors du changement de statut'
    });
  }
}
