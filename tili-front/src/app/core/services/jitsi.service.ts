import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (domain: string, options: JitsiMeetExternalAPIOptions) => JitsiMeetExternalAPIInstance;
  }
}

export interface JitsiMeetExternalAPIOptions {
  roomName: string;
  width?: number | string;
  height?: number | string;
  parentNode?: HTMLElement;
  configOverwrite?: Record<string, unknown>;
  interfaceConfigOverwrite?: Record<string, unknown>;
  userInfo?: { displayName?: string; email?: string };
  lang?: string;
  onload?: () => void;
}

export interface JitsiMeetExternalAPIInstance {
  dispose: () => void;
  executeCommand: (command: string, ...args: unknown[]) => void;
  addEventListener: (event: string, handler: (...args: unknown[]) => void) => void;
  removeEventListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

@Injectable({ providedIn: 'root' })
export class JitsiService {

  private domain = environment.jitsiDomain;
  private api: JitsiMeetExternalAPIInstance | null = null;

  /**
   * Start a Jitsi meeting in the given container.
   * roomName: unique room id (e.g. "TiliMeeting-123" or meeting id from backend).
   * displayName: optional user display name.
   */
  startMeeting(container: HTMLElement, roomName: string, displayName?: string): JitsiMeetExternalAPIInstance | null {
    this.dispose();
    if (typeof window === 'undefined' || !window.JitsiMeetExternalAPI) {
      console.error('Jitsi Meet External API not loaded. Ensure external_api.js is included.');
      return null;
    }
    const options: JitsiMeetExternalAPIOptions = {
      roomName: this.sanitizeRoomName(roomName),
      width: '100%',
      height: '100%',
      parentNode: container,
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
      lang: 'fr',
    };
    if (displayName) {
      options.userInfo = { displayName };
    }
    this.api = new window.JitsiMeetExternalAPI(this.domain, options);
    this.api.addEventListener('videoConferenceLeft', () => this.dispose());
    return this.api;
  }

  dispose(): void {
    if (this.api) {
      try {
        this.api.dispose();
      } catch (_) {}
      this.api = null;
    }
  }

  private sanitizeRoomName(name: string): string {
    return name.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 200) || 'TiliMeeting' + Date.now();
  }
}
