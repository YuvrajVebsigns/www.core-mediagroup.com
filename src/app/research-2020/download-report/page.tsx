'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DownloadReportPage() {
  const searchParams = useSearchParams();
  const downloadUrl = searchParams.get('url');
  const [urlStatus, setUrlStatus] = useState<'valid' | 'invalid' | 'checking'>('checking');
  const [isDownloading, setIsDownloading] = useState(false);

  // Validate the API URL if provided
  useEffect(() => {
    if (!downloadUrl) {
      setUrlStatus('invalid');
      return;
    }

    // Check if URL contains error indicators
    if (
      downloadUrl.includes('NoSuchBucket') ||
      downloadUrl.includes('error') ||
      downloadUrl.includes('null')
    ) {
      setUrlStatus('invalid');
      return;
    }

    // Accept valid URLs from trusted domains or PDF files
    if (downloadUrl.startsWith('http') && downloadUrl.includes('.pdf')) {
      setUrlStatus('valid');
      return;
    }

    setUrlStatus('invalid');
  }, [downloadUrl]);

  // Use API endpoint for direct download, only use external URL if valid
  const finalUrl = urlStatus === 'valid' && downloadUrl ? downloadUrl : '/api/download-report';
  const isExternalUrl = urlStatus === 'valid' && downloadUrl && downloadUrl.startsWith('http');

  // Handle direct download with proper error handling and fallback
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const response = await fetch(finalUrl);

      // If external URL fails, fall back to local endpoint
      if (!response.ok && isExternalUrl) {
        const fallbackResponse = await fetch('/api/download-report');
        if (fallbackResponse.ok) {
          const blob = await fallbackResponse.blob();
          downloadBlob(blob, 'Business-Pulse-Report.pdf');
          return;
        }
      }

      if (response.ok) {
        const blob = await response.blob();
        downloadBlob(blob, 'Business-Pulse-Report.pdf');
      } else {
        console.error('Download failed:', response.status);
        alert('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      // Try local fallback if external fails
      try {
        const fallbackResponse = await fetch('/api/download-report');
        if (fallbackResponse.ok) {
          const blob = await fallbackResponse.blob();
          downloadBlob(blob, 'Business-Pulse-Report.pdf');
        } else {
          alert('Download failed. Please try again.');
        }
      } catch {
        alert('Download failed. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper function to trigger download
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

        <a
          href="#"
          onClick={handleDownload}
          className="download-report-btn"
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
