import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type StatutProjet = 'EN_COURS' | 'TERMINE' | 'ANNULE';

export interface ProjetDto {
  id?: string;
  titre: string;
  description?: string;
  chefProjet?: string;
  utilisateurId?: string;
  statut?: StatutProjet;
}

@Injectable({ providedIn: 'root' })
export class ProjetService {

  private api = `${environment.apiUrl}/projets`;

  constructor(private http: HttpClient) {}

  getListe(): Observable<ProjetDto[]> {
    return this.http.get<ProjetDto[]>(`${this.api}/liste`);
  }

  getById(id: string): Observable<ProjetDto> {
    return this.http.get<ProjetDto>(`${this.api}/${id}`);
  }

  creer(projet: ProjetDto, chefProjet: string): Observable<ProjetDto> {
    return this.http.post<ProjetDto>(`${this.api}/creer?chefProjet=${encodeURIComponent(chefProjet)}`, projet);
  }

  modifier(id: string, projet: ProjetDto, chefProjet: string): Observable<ProjetDto> {
    return this.http.put<ProjetDto>(
      `${this.api}/modifier/${id}?chefProjet=${encodeURIComponent(chefProjet)}`,
      projet
    );
  }

  changerStatut(id: string, statut: StatutProjet, utilisateurId: string): Observable<ProjetDto> {
    return this.http.put<ProjetDto>(
      `${this.api}/changerStatut/${id}?statut=${statut}&utilisateurId=${encodeURIComponent(utilisateurId)}`,
      {}
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
