'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DownloadReportPage() {
  const searchParams = useSearchParams();
  const downloadUrl = searchParams.get('url');
  const [urlStatus, setUrlStatus] = useState<'valid' | 'invalid' | 'checking'>('checking');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    if (!downloadUrl) {
      setUrlStatus('invalid');
      return;
    }

    try {
      const reportUrl = new URL(downloadUrl);
      setUrlStatus(
        reportUrl.protocol === 'https:' &&
          reportUrl.hostname === 'coremediagroup.sgp1.digitaloceanspaces.com'
          ? 'valid'
          : 'invalid',
      );
    } catch {
      setUrlStatus('invalid');
    }
  }, [downloadUrl]);

  const finalUrl =
    urlStatus === 'valid' && downloadUrl
      ? `/api/download-report?url=${encodeURIComponent(downloadUrl)}`
      : null;

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!finalUrl) {
      setDownloadError(
        'The 2020 report download link is unavailable. Please submit the form again.',
      );
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(finalUrl);

      if (!response.ok) {
        setDownloadError('The 2020 report could not be downloaded. Please try again later.');
        return;
      }

      const blob = await response.blob();
      downloadBlob(blob, 'Business-Pulse-Report-2020.pdf');
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? `Unable to fetch the 2020 report: ${error.message}`
          : 'Unable to fetch the 2020 report. Please try again later.',
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="download-report-section">
      <div className="download-report-card">
        <div className="download-report-icon" aria-hidden="true">
          😊
        </div>

        <h1>Thank you for submitting your details!</h1>

        <p>Click the button below to download the Business Pulse Report.</p>
        {downloadError && (
          <p role="alert" aria-live="polite">
            {downloadError}
          </p>
        )}

        <a
          href="#"
          onClick={handleDownload}
          className="download-report-btn"
          aria-disabled={isDownloading || urlStatus !== 'valid'}
          style={{
            pointerEvents: isDownloading ? 'none' : 'auto',
            opacity: isDownloading ? 0.6 : 1,
          }}
        >
          {isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD REPORT'}
        </a>

        <br />
        <br />

        <p className="download-report-brand">CORE MEDIA GROUP</p>

        <br />
        <Link href="/research-2020" className="download-report-back">
          Back to Survey
        </Link>
      </div>
    </section>
  );
}
