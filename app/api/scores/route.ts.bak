import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT player_name, score, click_count, created_at 
      FROM scores 
      ORDER BY score DESC 
      LIMIT 10
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('スコア取得エラー:', error);
    return NextResponse.json({ error: 'スコア取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { player_name, score, click_count } = await request.json();
    
    if (!player_name || score === undefined || click_count === undefined) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await sql`
      INSERT INTO scores (player_name, score, click_count)
      VALUES (${player_name}, ${score}, ${click_count})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('スコア保存エラー:', error);
    return NextResponse.json({ error: 'スコア保存に失敗しました' }, { status: 500 });
  }
}