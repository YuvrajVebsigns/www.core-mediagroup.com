'use client';

import { useEffect, useState } from 'react';

type EventItem = {
  id: number;
  title: string;
};

type EventApiItem = {
  id: number;
  title: string;
};

export default function RegisterPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | ''>('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    selectedEvent?: string;
  }>({});

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data: EventApiItem[]) =>
        setEvents(data.map((event) => ({ id: event.id, title: event.title }))),
      )
      .catch(() => setEvents([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email.';
    }

    if (!selectedEvent) {
      nextErrors.selectedEvent = 'Please select an event.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          organization,
          eventId: selectedEvent,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus('Registration successful — thank you!');

        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setSelectedEvent('');
        setErrors({});
      } else {
        setStatus(json?.message || 'Registration failed.');
      }
    } catch (err) {
      setStatus('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="registration-section">
      <div className="registration-container">
        <div className="registration-wrapper">
          <h2 className="registration-title">Event Registration</h2>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* NAME */}
            <label className="registration-label">
              Name*
              <input
                type="text"
                placeholder="Full name"
                value={name}
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

            {/* EMAIL */}
            <label className="registration-label">
              Email*
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
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

            {/* PHONE */}
            <label className="registration-label">
              Phone
              <input
                type="tel"
                placeholder="+1 555 555 5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            {/* ORGANIZATION */}
            <label className="registration-label">
              Organization
              <input
                type="text"
                placeholder="Company name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </label>

            {/* EVENT */}
            <label className="registration-label">
              Select Event*
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value ? Number(e.target.value) : '');

                  if (errors.selectedEvent) {
                    setErrors({
                      ...errors,
                      selectedEvent: undefined,
                    });
                  }
                }}
              >
                <option value="">-- Select an event --</option>

                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
              {errors.selectedEvent && (
                <div className="registration-error">{errors.selectedEvent}</div>
              )}
            </label>

            {/* BUTTON */}
            <div className="registration-button-wrap">
              <button
                type="submit"
                className="registration-btn"
                disabled={
                  loading ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.selectedEvent ||
                  !name ||
                  !email ||
                  !selectedEvent
                }
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
            </div>

            {/* STATUS */}
            {status && <p className="registration-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
