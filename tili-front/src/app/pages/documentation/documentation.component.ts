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

  selectedCategory = 'الكل';
  searchTerm = '';
  documents: Document[] = [];
  loading = true;
  error: string | null = null;
  showForm = false;
  editingDoc: Document | null = null;
  formModel: Partial<Document> = { titre: '', description: '', type: '' };
  formErrors: Record<string, string> = {};
  typeOptions = ['تقارير', 'محاضر', 'إداري', 'مشاريع'];

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
        this.error = err?.message || 'تعذر تحميل الوثائق';
        this.loading = false;
      }
    });
  }

  get filteredDocuments(): Document[] {
    return this.documents.filter(doc => {
      const matchesCategory = this.selectedCategory === 'الكل' || doc.type === this.selectedCategory;
      const titre = (doc.titre || '').toLowerCase();
      const search = this.searchTerm.toLowerCase();
      const matchesSearch = !search || titre.includes(search);
      return matchesCategory && matchesSearch;
    });
  }

  get categories(): string[] {
    const types = [...new Set(this.documents.map(d => d.type).filter(Boolean))] as string[];
    return ['الكل', ...types];
  }

  formatDate(isoOrDate?: string): string {
    if (!isoOrDate) return '—';
    const d = new Date(isoOrDate);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('ar', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  openCreateForm(): void {
    this.editingDoc = null;
    this.formModel = { titre: '', description: '', type: '' };
    this.formErrors = {};
    this.showForm = true;
  }

  openEditForm(doc: Document): void {
    this.editingDoc = doc;
    this.formModel = {
      titre: doc.titre || '',
      description: doc.description || '',
      type: doc.type || ''
    };
    this.formErrors = {};
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingDoc = null;
    this.formModel = { titre: '', description: '', type: '' };
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
    const type = (this.formModel.type || '').trim();
    if (!type) {
      this.formErrors['type'] = 'النوع مطلوب';
      return false;
    }
    return true;
  }

  saveDocument(): void {
    if (!this.validateForm()) return;
    const payload: Document = {
      titre: (this.formModel.titre || '').trim(),
      description: (this.formModel.description || '').trim() || undefined,
      type: (this.formModel.type || '').trim(),
      actif: true
    };
    if (this.editingDoc?.id) {
      this.documentService.update(this.editingDoc.id, payload).subscribe({
        next: () => { this.loadDocuments(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند التحديث'
      });
    } else {
      this.documentService.create(payload).subscribe({
        next: () => { this.loadDocuments(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند الإنشاء'
      });
    }
  }

  downloadDocument(doc: Document): void {
    if (doc.cheminFichier) {
      window.open(doc.cheminFichier, '_blank');
    } else {
      this.error = 'لا يوجد رابط تحميل لهذا المستند';
    }
  }

  shareDocument(doc: Document): void {
    if (navigator.share) {
      navigator.share({
        title: doc.titre,
        text: doc.description
      }).catch(() => {});
    } else {
      this.error = 'المشاركة غير متاحة في متصفحك';
    }
  }

  deleteDocument(doc: Document): void {
    if (!doc.id) return;
    if (!confirm('حذف هذا المستند؟')) return;
    this.documentService.delete(doc.id).subscribe({
      next: () => this.loadDocuments(),
      error: (err) => this.error = err?.message || 'خطأ عند الحذف'
    });
  }
}
