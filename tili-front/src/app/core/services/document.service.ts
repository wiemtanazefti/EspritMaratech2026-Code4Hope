import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Aligné avec l’entité Document du backend (titre, type, dateCreation, etc.) */
export interface Document {
  id?: string;
  titre?: string;
  description?: string;
  type?: string;
  dateCreation?: string;
  cheminFichier?: string;
  actif?: boolean;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private api = `${environment.apiUrl}/Code4Hope/documents`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Document[]> {
    return this.http.get<Document[]>(this.api);
  }

  getByType(type: string): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.api}/type/${encodeURIComponent(type)}`);
  }

  getById(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.api}/${id}`);
  }

  create(doc: Document): Observable<Document> {
    return this.http.post<Document>(this.api, doc);
  }

  update(id: string, doc: Document): Observable<Document> {
    return this.http.put<Document>(`${this.api}/${id}`, doc);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
