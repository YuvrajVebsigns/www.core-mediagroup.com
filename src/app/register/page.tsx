'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Country } from 'react-phone-number-input';
import CountryCodeSelect, { getDialCodeFromCountry } from '@/components/CountryCodeSelect';
import { submitAttendeeRegistration } from '@/services/attendees.service';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

type EventItem = WebsiteEvent;

function RegisterForm() {
  const searchParams = useSearchParams();

  /**
   * Offline QR registration flow:
   * When a user scans the on-campus QR poster the URL will include
   * `?offlineKey=<token>` (and optionally `mode=offline`).
   * We extract these so the backend can auto-approve the registration.
   */
  const offlineKey =
    searchParams.get('offlineKey') ||
    searchParams.get('key') ||
    searchParams.get('offline_key') ||
    searchParams.get('token') ||
    undefined;
  const offlineMode = searchParams.get('mode') ?? undefined;
  const isOffline = useMemo(
    () => Boolean(offlineKey) || offlineMode === 'offline',
    [offlineKey, offlineMode],
  );

  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>('IN');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const paramEvent = searchParams.get('eventId') || searchParams.get('event');
  const [selectedEvent, setSelectedEvent] = useState<string | ''>(paramEvent || '');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    countryCode?: string;
    phone?: string;
    organization?: string;
    selectedEvent?: string;
  }>({});

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data: WebsiteEvent[]) => {
        setEvents(data);
        if (paramEvent) {
          const match = data.find((e) => e.id === paramEvent || e.slug === paramEvent);
          if (match) setSelectedEvent(match.id);
          else setSelectedEvent(paramEvent);
        }
      })
      .catch(() => setEvents([]));
  }, [paramEvent]);

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      nextErrors.name = 'Only alphabets are allowed.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email.';
    }

    const dialCode = getDialCodeFromCountry(country);
    if (!country || !dialCode) {
      nextErrors.countryCode = 'Please select a country code.';
    }

    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!organization.trim()) {
      nextErrors.organization = 'Organization is required.';
    }

    if (!selectedEvent) {
      nextErrors.selectedEvent = 'Please select an event.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setPopupMessage('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setPopupMessage(null);

    try {
      const response = await submitAttendeeRegistration({
        eventId: selectedEvent as string,
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        countryCode: getDialCodeFromCountry(country),
        organization: organization.trim(),
        // Offline QR registration fields — only sent when user scanned the on-campus QR code
        ...(isOffline && {
          isOffline: true,
          offlineKey,
          registrationSource: 'offline',
          mode: offlineMode || 'offline',
        }),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String((response as { message?: string }).message)
          : '';

      setPopupMessage(apiMessage || 'Registration successful — thank you!');

      setName('');
      setEmail('');
      setCountry('IN');
      setPhone('');
      setOrganization('');
      setSelectedEvent(paramEvent || '');
      setErrors({});
    } catch (err) {
      setPopupMessage(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="registration-section">
      <div className="registration-container">
        <div className="registration-wrapper">
          {popupMessage ? (
            <div className="registration-popup" role="status" aria-live="polite">
              <span className="registration-popup-dot" aria-hidden="true" />
              <p>{popupMessage}</p>
              <button
                type="button"
                onClick={() => setPopupMessage(null)}
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          ) : null}

          <h2 className="registration-title">Event Registration</h2>

          {isOffline && (
            <div
              style={{
                marginBottom: '20px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(126, 34, 206, 0.08)',
                border: '1px solid rgba(126, 34, 206, 0.25)',
                color: '#6b21a8',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '10px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  background: '#7e22ce',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                Campus QR
              </span>
              <span>
                <strong>Exclusive On-Campus Registration:</strong> Your event entry pass will be
                automatically approved upon submission.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <label className="registration-label">
              Name*
              <input
                type="text"
                placeholder="Full name"
                value={name}
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: undefined,
                    });
                  }
                }}
              />
              {errors.name && <div className="registration-error">{errors.name}</div>}
            </label>

            <label className="registration-label">
              Email*
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors({
                      ...errors,
                      email: undefined,
                    });
                  }
                }}
              />
              {errors.email && <div className="registration-error">{errors.email}</div>}
            </label>

            <label className="registration-label" htmlFor="registration-country-code">
              Country Code*
              <CountryCodeSelect
                id="registration-country-code"
                value={country}
                disabled={loading}
                onChange={(nextCountry) => {
                  setCountry(nextCountry ?? 'IN');

                  if (errors.countryCode) {
                    setErrors({
                      ...errors,
                      countryCode: undefined,
                    });
                  }
                }}
              />
              {errors.countryCode && <div className="registration-error">{errors.countryCode}</div>}
            </label>

            <label className="registration-label">
              Phone Number*
              <input
                type="tel"
                name="phoneNumber"
                placeholder="9XXXXXXXX0"
                value={phone}
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter exactly 10 digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
                onChange={(e) => {
                  setPhone(e.target.value);

                  if (errors.phone) {
                    setErrors({
                      ...errors,
                      phone: undefined,
                    });
                  }
                }}
              />
              {errors.phone && <div className="registration-error">{errors.phone}</div>}
            </label>

            <label className="registration-label">
              Organization*
              <input
                type="text"
                placeholder="Company name"
                value={organization}
                required
                onChange={(e) => {
                  setOrganization(e.target.value);

                  if (errors.organization) {
                    setErrors({
                      ...errors,
                      organization: undefined,
                    });
                  }
                }}
              />
              {errors.organization && (
                <div className="registration-error">{errors.organization}</div>
              )}
            </label>

            <label className="registration-label">
              Select Event*{' '}
              {paramEvent && (
                <span
                  style={{
                    fontSize: '11px',
                    color: '#4f46e5',
                    fontWeight: 600,
                    marginLeft: '6px',
                  }}
                >
                  🔒 (Locked for this event)
                </span>
              )}
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value || '');

                  if (errors.selectedEvent) {
                    setErrors({
                      ...errors,
                      selectedEvent: undefined,
                    });
                  }
                }}
                disabled={Boolean(paramEvent)}
                style={
                  paramEvent
                    ? {
                        cursor: 'not-allowed',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        opacity: 0.85,
                      }
                    : undefined
                }
              >
                <option value="">-- Select an event --</option>

                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}

                {Boolean(paramEvent) && !events.some((ev) => ev.id === selectedEvent) && (
                  <option value={selectedEvent}>{selectedEvent}</option>
                )}
              </select>
              {errors.selectedEvent && (
                <div className="registration-error">{errors.selectedEvent}</div>
              )}
            </label>

            <div className="registration-button-wrap">
              <button
                type="submit"
                className="registration-btn"
                disabled={
                  loading ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.countryCode ||
                  !!errors.phone ||
                  !!errors.organization ||
                  !!errors.selectedEvent ||
                  !name ||
                  !email ||
                  !country ||
                  !getDialCodeFromCountry(country) ||
                  phone.length !== 10 ||
                  !organization.trim() ||
                  !selectedEvent
                }
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading registration...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
