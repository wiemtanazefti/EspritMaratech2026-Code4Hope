import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingService, MeetingDto } from '../../core/services/meeting.service';
import { JitsiService } from '../../core/services/jitsi.service';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('jitsiContainer') jitsiContainer!: ElementRef<HTMLDivElement>;

  meetings: MeetingDto[] = [];
  loading = true;
  error: string | null = null;
  showJitsi = false;
  activeMeetingForCall: MeetingDto | null = null;
  displayName = '';
  showCreateForm = false;
  editingMeeting: MeetingDto | null = null;
  formModel: Partial<MeetingDto> = { title: '', description: '', startTime: '', endTime: '' };

  constructor(
    private meetingService: MeetingService,
    private jitsiService: JitsiService
  ) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  ngOnDestroy(): void {
    this.jitsiService.dispose();
  }

  ngAfterViewInit(): void {}

  loadMeetings(): void {
    this.loading = true;
    this.error = null;
    this.meetingService.getAll().subscribe({
      next: (list) => {
        this.meetings = list || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'تعذر تحميل الاجتماعات';
        this.loading = false;
      }
    });
  }

  get upcomingMeetings(): MeetingDto[] {
    const now = new Date().toISOString();
    return this.meetings
      .filter(m => m.startTime && new Date(m.startTime) >= new Date(now))
      .sort((a, b) => (a.startTime && b.startTime) ? a.startTime.localeCompare(b.startTime) : 0);
  }

  get pastMeetings(): MeetingDto[] {
    const now = new Date().toISOString();
    return this.meetings
      .filter(m => m.startTime && new Date(m.startTime) < new Date(now))
      .sort((a, b) => (a.startTime && b.startTime) ? b.startTime.localeCompare(a.startTime) : 0);
  }

  formatDate(iso?: string): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('ar', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatTime(iso?: string): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });
  }

  joinVideo(meeting: MeetingDto): void {
    this.activeMeetingForCall = meeting;
    this.showJitsi = true;
    setTimeout(() => this.startJitsi(), 100);
  }

  private startJitsi(): void {
    const container = this.jitsiContainer?.nativeElement;
    if (!container) return;
    const roomName = this.activeMeetingForCall?.id
      ? `Wasla-${this.activeMeetingForCall.id}`
      : `Wasla-${this.activeMeetingForCall?.title?.replace(/\s+/g, '') || 'meeting'}-${Date.now()}`;
    this.jitsiService.startMeeting(container, roomName, this.displayName || undefined);
  }

  closeJitsi(): void {
    this.jitsiService.dispose();
    this.showJitsi = false;
    this.activeMeetingForCall = null;
  }

  openCreateForm(): void {
    this.editingMeeting = null;
    this.formModel = { title: '', description: '', startTime: '', endTime: '' };
    this.showCreateForm = true;
  }

  openEditForm(meeting: MeetingDto): void {
    this.editingMeeting = meeting;
    const toLocalDatetime = (iso: string | undefined) => {
      if (!iso) return '';
      const d = new Date(iso);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${y}-${m}-${day}T${h}:${min}`;
    };
    this.formModel = {
      title: meeting.title,
      description: meeting.description || '',
      startTime: toLocalDatetime(meeting.startTime),
      endTime: toLocalDatetime(meeting.endTime)
    };
    this.showCreateForm = true;
  }

  closeForm(): void {
    this.showCreateForm = false;
    this.editingMeeting = null;
    this.formModel = { title: '', description: '', startTime: '', endTime: '' };
  }

  saveMeeting(): void {
    const title = (this.formModel.title || '').trim();
    if (!title || title.length < 2) {
      this.error = 'العنوان مطلوب (حرفين على الأقل)';
      return;
    }
    const start = this.formModel.startTime ? new Date(this.formModel.startTime).toISOString() : '';
    const end = this.formModel.endTime ? new Date(this.formModel.endTime).toISOString() : '';
    if (!start || !end) {
      this.error = 'وقتا البداية والنهاية مطلوبان';
      return;
    }
    if (new Date(end) <= new Date(start)) {
      this.error = 'وقت النهاية يجب أن يكون بعد وقت البداية';
      return;
    }
    const payload: MeetingDto = {
      title,
      description: this.formModel.description,
      startTime: start,
      endTime: end
    };
    if (this.editingMeeting?.id) {
      this.meetingService.update(this.editingMeeting.id, payload).subscribe({
        next: () => { this.loadMeetings(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند التحديث'
      });
    } else {
      this.meetingService.create(payload).subscribe({
        next: () => { this.loadMeetings(); this.closeForm(); },
        error: (err) => this.error = err?.message || 'خطأ عند الإنشاء'
      });
    }
  }

  deleteMeeting(meeting: MeetingDto): void {
    if (!meeting.id) return;
    if (!confirm('حذف هذا الاجتماع؟')) return;
    this.meetingService.delete(meeting.id).subscribe({
      next: () => this.loadMeetings(),
      error: (err) => this.error = err?.message || 'خطأ عند الحذف'
    });
  }
}
