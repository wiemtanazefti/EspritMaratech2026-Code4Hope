import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService, Document } from '../../core/services/document.service';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  selectedCategory = 'Tous';
  searchTerm = '';
  documents: Document[] = [];
  loading = true;
  error: string | null = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.error = null;
    this.documentService.getAll().subscribe({
      next: (list) => {
        this.documents = list || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Impossible de charger les documents';
        this.loading = false;
      }
    });
  }

  get filteredDocuments(): Document[] {
    return this.documents.filter(doc => {
      const matchesCategory = this.selectedCategory === 'Tous' || doc.type === this.selectedCategory;
      const titre = (doc.titre || '').toLowerCase();
      const search = this.searchTerm.toLowerCase();
      const matchesSearch = !search || titre.includes(search);
      return matchesCategory && matchesSearch;
    });
  }

  get categories(): string[] {
    const types = [...new Set(this.documents.map(d => d.type).filter(Boolean))] as string[];
    return ['Tous', ...types];
  }

  formatDate(isoOrDate?: string): string {
    if (!isoOrDate) return '—';
    const d = new Date(isoOrDate);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  downloadDocument(doc: Document): void {
    if (doc.cheminFichier) {
      window.open(doc.cheminFichier, '_blank');
    } else {
      console.log('Téléchargement:', doc.titre, '(pas de fichier associé)');
    }
  }

  shareDocument(doc: Document): void {
    console.log('Partager:', doc.titre);
  }

  deleteDocument(doc: Document): void {
    if (!doc.id) return;
    if (!confirm('Supprimer ce document ?')) return;
    this.documentService.delete(doc.id).subscribe({
      next: () => this.loadDocuments(),
      error: (err) => this.error = err?.message || 'Erreur lors de la suppression'
    });
  }
}
