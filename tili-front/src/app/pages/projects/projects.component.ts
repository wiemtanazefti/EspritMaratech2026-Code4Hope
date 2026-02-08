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
  selectedStatus: string = 'الكل';
  projects: ProjetDto[] = [];
  loading = true;
  error: string | null = null;
  showForm = false;
  editingProject: ProjetDto | null = null;
  formModel: Partial<ProjetDto> = { titre: '', description: '', chefProjet: '' };
  formErrors: Record<string, string> = {};

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
        this.error = err?.message || 'تعذر تحميل المشاريع';
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
      const matchesStatus = this.selectedStatus === 'الكل' || this.getStatutLabel(project.statut) === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatutLabel(statut?: StatutProjet): string {
    if (!statut) return '—';
    const map: Record<StatutProjet, string> = {
      EN_COURS: 'قيد التنفيذ',
      TERMINE: 'منتهي',
      ANNULE: 'ملغى'
    };
    return map[statut] || statut;
  }

  getStatusCount(status: string): number {
    if (status === 'الكل') return this.projects.length;
    return this.projects.filter(p => this.getStatutLabel(p.statut) === status).length;
  }

  get statusFilters(): string[] {
    return ['الكل', 'قيد التنفيذ', 'منتهي', 'ملغى'];
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

  openCreateForm(): void {
    this.editingProject = null;
    this.formModel = { titre: '', description: '', chefProjet: '' };
    this.formErrors = {};
    this.showForm = true;
  }

  openEditForm(project: ProjetDto): void {
    this.editingProject = project;
    this.formModel = {
      titre: project.titre || '',
      description: project.description || '',
      chefProjet: project.chefProjet || ''
    };
    this.formErrors = {};
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingProject = null;
    this.formModel = { titre: '', description: '', chefProjet: '' };
    this.formErrors = {};
  }

  private validateForm(): boolean {
    this.formErrors = {};
    const t = (this.formModel.titre || '').trim();
    if (!t) {
      this.formErrors['titre'] = 'العنوان مطلوب';
      return false;
    }
    if (t.length < 2) {
      this.formErrors['titre'] = 'العنوان يجب أن يكون حرفين على الأقل';
      return false;
    }
    return true;
  }

  saveProject(): void {
    if (!this.validateForm()) return;
    const payload: ProjetDto = {
      titre: (this.formModel.titre || '').trim(),
      description: (this.formModel.description || '').trim() || undefined,
      chefProjet: (this.formModel.chefProjet || '').trim() || undefined
    };
    const chefProjet = (this.formModel.chefProjet || '').trim() || '';
    if (this.editingProject?.id) {
      this.projetService.modifier(this.editingProject.id, payload, chefProjet).subscribe({
        next: () => { this.loadProjects(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند التحديث'
      });
    } else {
      this.projetService.creer(payload, chefProjet).subscribe({
        next: () => { this.loadProjects(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند الإنشاء'
      });
    }
  }

  changeStatut(project: ProjetDto, newStatut: StatutProjet): void {
    if (!project.id) return;
    const utilisateurId = project.utilisateurId || 'current-user';
    this.projetService.changerStatut(project.id, newStatut, utilisateurId).subscribe({
      next: () => this.loadProjects(),
      error: (err) => this.error = err?.message || 'خطأ عند تغيير الحالة'
    });
  }

  deleteProject(project: ProjetDto): void {
    if (!project.id) return;
    if (!confirm('حذف هذا المشروع؟')) return;
    this.projetService.delete(project.id).subscribe({
      next: () => this.loadProjects(),
      error: (err) => this.error = err?.message || 'خطأ عند الحذف'
    });
  }
}
