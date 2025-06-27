import { NextResponse } from 'next/server';

// モックデータ
const mockScores = [
  { player_name: "ステラ", score: 450, click_count: 90, created_at: new Date().toISOString() },
  { player_name: "セイラ", score: 420, click_count: 84, created_at: new Date().toISOString() },
  { player_name: "ネビィ", score: 380, click_count: 76, created_at: new Date().toISOString() },
  { player_name: "ヘリン", score: 350, click_count: 70, created_at: new Date().toISOString() },
  { player_name: "視聴者A", score: 320, click_count: 64, created_at: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json(mockScores);
}

export async function POST(request: Request) {
  const { player_name, score, click_count } = await request.json();
  console.log('新しいスコア:', { player_name, score, click_count });
  return NextResponse.json({ success: true });
}