import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MeetingMinutes {
  id?: string;
  content?: string;
}

export interface MeetingDto {
  id?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  googleEventId?: string;
  minutes?: MeetingMinutes[];
}

@Injectable({ providedIn: 'root' })
export class MeetingService {

  private api = `${environment.apiUrl}/Code4Hope/meetings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MeetingDto[]> {
    return this.http.get<MeetingDto[]>(this.api);
  }

  getById(id: string): Observable<MeetingDto> {
    return this.http.get<MeetingDto>(`${this.api}/${id}`);
  }

  create(meeting: MeetingDto): Observable<MeetingDto> {
    return this.http.post<MeetingDto>(this.api, meeting);
  }

  update(id: string, meeting: MeetingDto): Observable<MeetingDto> {
    return this.http.put<MeetingDto>(`${this.api}/${id}`, meeting);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
