import { NextResponse } from 'next/server';

const BOT_IMAGE = {
  imageUrl: '/assets/logo/logo.png',
};

export async function GET() {
  return NextResponse.json(BOT_IMAGE);
}
