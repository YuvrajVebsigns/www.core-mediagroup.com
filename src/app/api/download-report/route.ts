import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download report' }, { status: 500 });
  }
}
