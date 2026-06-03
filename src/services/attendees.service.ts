import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

/** Matches backend RegisterAttendeeDto — all 6 fields sent on every request. */
export type RegisterAttendeeApiBody = {
  eventId: string;
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  organization: string;
};

export type AttendeeRegistrationInput = {
  eventId: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode?: string;
  organization: string;
};

type RegistrationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

function buildRegisterAttendeeBody(input: AttendeeRegistrationInput): RegisterAttendeeApiBody {
  return {
    eventId: input.eventId,
    name: input.name,
    email: input.email,
    countryCode: input.countryCode ?? '+91',
    phoneNumber: input.phoneNumber,
    organization: input.organization,
  };
}

function assertRegistrationSaved(response: RegistrationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Registration was not saved.');
  }
}

async function postAttendeeRegistration(body: RegisterAttendeeApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<RegistrationResponse>(API_ENDPOINTS.WEBSITE.ATTENDEES.REGISTER, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

export async function submitAttendeeRegistration(input: AttendeeRegistrationInput) {
  const body = buildRegisterAttendeeBody(input);

  try {
    const response = await postAttendeeRegistration(body);
    assertRegistrationSaved(response);
    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();
      const response = await postAttendeeRegistration(body);
      assertRegistrationSaved(response);
      return response;
    }

    throw error;
  }
}
