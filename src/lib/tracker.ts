/**
 * CoreMediaTracker - Client-side tracking utility
 */

export interface TrackerConfig {
  backendUrl: string;
  token: string;
}

export interface TrackEventData {
  eventType?: 'pageview' | 'consent_accepted' | 'consent_declined' | 'interaction';
  pageUrl?: string;
  pageTitle?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}

export class CoreMediaTracker {
  private backendUrl: string;
  private token: string;
  private cookieConsentKey = 'core_media_cookie_consent';
  private visitorIdKey = 'core_media_visitor_id';
  private sessionIdKey = 'core_media_session_id';
  private visitorId: string = '';
  private sessionId: string = '';

  constructor(config: TrackerConfig) {
    this.backendUrl = config.backendUrl.replace(/\/$/, '');
    this.token = config.token;
    this.initIds();
  }

  // Initialize unique IDs
  private initIds() {
    if (typeof window === 'undefined') return;

    // Visitor ID (Persistent)
    const storedVisitorId = localStorage.getItem(this.visitorIdKey);
    if (!storedVisitorId) {
      const newVisitorId = 'vis_' + this.generateUUID();
      localStorage.setItem(this.visitorIdKey, newVisitorId);
      this.visitorId = newVisitorId;
    } else {
      this.visitorId = storedVisitorId;
    }

    // Session ID (Temporary)
    const storedSessionId = sessionStorage.getItem(this.sessionIdKey);
    if (!storedSessionId) {
      const newSessionId = 'sess_' + this.generateUUID();
      sessionStorage.setItem(this.sessionIdKey, newSessionId);
      this.sessionId = newSessionId;
    } else {
      this.sessionId = storedSessionId;
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Consent Status management
  getConsentStatus(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.cookieConsentKey); // 'accepted', 'declined', or null
  }

  setConsent(status: 'accepted' | 'declined') {
    if (typeof window === 'undefined') return;
    if (status !== 'accepted' && status !== 'declined') return;

    localStorage.setItem(this.cookieConsentKey, status);

    // Log the consent decision to the backend
    this.trackEvent({
      eventType: status === 'accepted' ? 'consent_accepted' : 'consent_declined',
    });
  }

  // Core Track Method
  async trackEvent(eventData: TrackEventData) {
    if (typeof window === 'undefined') return;

    const consent = this.getConsentStatus();

    // If user explicitly declined cookies, do not track pageviews or interactions
    if (
      consent === 'declined' &&
      eventData.eventType &&
      !eventData.eventType.startsWith('consent_')
    ) {
      return;
    }

    const payload = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      eventType: eventData.eventType || 'pageview',
      pageUrl: eventData.pageUrl || window.location.pathname,
      pageTitle: eventData.pageTitle || document.title,
      referrer: eventData.referrer || document.referrer || 'direct',
      userAgent: navigator.userAgent,
      metadata: eventData.metadata || {},
    };

    try {
      const response = await fetch(`${this.backendUrl}/website/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Fail silently without throwing errors to the UI
      }
    } catch {
      // Fail silently without throwing errors to the UI
    }
  }

  // Shortcut for tracking pageviews
  trackPageview() {
    this.trackEvent({ eventType: 'pageview' });
  }

  // Shortcut for tracking custom interactions
  trackInteraction(
    elementId: string,
    elementText = '',
    extraMetadata: Record<string, unknown> = {},
  ) {
    this.trackEvent({
      eventType: 'interaction',
      metadata: {
        elementId,
        elementText,
        ...extraMetadata,
      },
    });
  }
}
