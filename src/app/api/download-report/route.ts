import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const REPORT_HOST = 'coremediagroup.sgp1.digitaloceanspaces.com';

function getFilename(reportUrl: URL): string {
  const filename = reportUrl.pathname.split('/').pop();
  return filename?.toLowerCase().endsWith('.pdf') ? filename : 'Core-Media-Report.pdf';
}

async function proxyReport(reportUrl: URL) {
  const response = await fetch(reportUrl, { cache: 'no-store' });

  if (!response.ok) {
    return NextResponse.json({ error: 'Report file could not be downloaded' }, { status: 502 });
  }

  const file = await response.arrayBuffer();

  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(file.byteLength),
      'Content-Disposition': `attachment; filename="${getFilename(reportUrl)}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const remoteUrl = requestUrl.searchParams.get('url');

    if (remoteUrl) {
      const reportUrl = new URL(remoteUrl);

      if (reportUrl.protocol !== 'https:' || reportUrl.hostname !== REPORT_HOST) {
        return NextResponse.json({ error: 'Invalid report URL' }, { status: 400 });
      }

      return proxyReport(reportUrl);
    }

    const filePath = path.join(process.cwd(), 'public', 'reports', 'CIO OUTLOOK SURVEY 2021.pdf');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Report file not found' }, { status: 404 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Return with proper download headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(fileBuffer.length),
        'Content-Disposition': 'attachment; filename="CIO-Outlook-Survey-2021.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    // console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download report' }, { status: 500 });
  }
}
