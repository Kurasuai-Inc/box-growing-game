'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Score {
  player_name: string;
  score: number;
  click_count: number;
  created_at: string;
}

export default function RankingPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
    // 5秒ごとに自動更新
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error('ランキング取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          🏆 ランキング TOP10 🏆
        </h1>

        <div className="bg-white rounded-xl shadow-2xl p-6">
          {loading ? (
            <p className="text-center text-2xl">読み込み中...</p>
          ) : scores.length === 0 ? (
            <p className="text-center text-xl text-gray-600">まだスコアがありません</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-4 text-xl">順位</th>
                  <th className="text-left p-4 text-xl">名前</th>
                  <th className="text-right p-4 text-xl">スコア</th>
                  <th className="text-right p-4 text-xl">クリック数</th>
                  <th className="text-right p-4 text-xl">日時</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index} className={`border-b ${index < 3 ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4">
                      <span className={`text-2xl font-bold ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-orange-600' : ''
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}位`}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-lg">{score.player_name}</td>
                    <td className="p-4 text-right text-2xl font-bold text-purple-600">{score.score}</td>
                    <td className="p-4 text-right text-lg">{score.click_count}回</td>
                    <td className="p-4 text-right text-sm text-gray-600">
                      {new Date(score.created_at).toLocaleString('ja-JP')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/game"
            className="inline-block px-8 py-4 bg-yellow-400 text-gray-800 rounded-full text-xl font-bold hover:bg-yellow-300 transform hover:scale-110 transition-transform"
          >
            ゲームに挑戦！
          </Link>
        </div>

        <p className="text-center text-white mt-4 text-sm">
          ※ ランキングは5秒ごとに自動更新されます
        </p>
      </div>
    </div>
  );
}