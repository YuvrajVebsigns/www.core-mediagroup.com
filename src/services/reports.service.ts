// import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import { ensureWebsiteAuth, buildWebsiteAuthHeaders } from '@/lib/website-auth';

export type ReportDownloadRequest = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  designation: string;
  industry?: string;
  reportId: string;
};

export type ReportDownloadResponse = {
  success: boolean;
  message?: string;
  data?: {
    downloadUrl?: string;
    reportUrl?: string;
    url?: string;
  };
  downloadUrl?: string;
  reportUrl?: string;
  url?: string;
};

// export async function submitReportDownload(
//   payload: ReportDownloadRequest,
// ): Promise<ReportDownloadResponse> {
//   try {
//     // Ensure we have a valid website token
//     const auth = await ensureWebsiteAuth();
//     const authHeaders = buildWebsiteAuthHeaders(auth);

//     const response = await apiFetch<ReportDownloadResponse>('/api/v1/website/reports/download', {
//       method: 'POST',
//       requireAuth: false,
//       headers: {
//         'Content-Type': 'application/json',
//         ...authHeaders,
//       },
//       body: JSON.stringify(payload),
//     });

//     return response || { success: false, message: 'No response from server' };
//   } catch (error) {
//     // console.error('Report download submission error:', error);
//     throw error;
//   }
// }

export async function submitReportDownload(
  payload: ReportDownloadRequest,
): Promise<ReportDownloadResponse> {
  const auth = await ensureWebsiteAuth();
  const authHeaders = buildWebsiteAuthHeaders(auth);

  const response = await apiFetch<ReportDownloadResponse>('/api/v1/website/reports/download', {
    method: 'POST',
    requireAuth: false,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(payload),
  });

  return (
    response || {
      success: false,
      message: 'No response from server',
    }
  );
}

export function getDownloadUrl(response: ReportDownloadResponse): string | null {
  if (!response) return null;

  const urls = [
    response.downloadUrl,
    response.reportUrl,
    response.url,
    response.data?.downloadUrl,
    response.data?.reportUrl,
    response.data?.url,
  ];

  return urls.find((url) => typeof url === 'string' && url.trim().length > 0)?.trim() ?? null;
}
