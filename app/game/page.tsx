'use client';

import { useState, useEffect, useCallback } from 'react';

export default function GamePage() {
  const [boxSize, setBoxSize] = useState(100);
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setBoxSize(100);
    setClickCount(0);
    setTimeLeft(10);
    setIsPlaying(true);
    setShowResult(false);
  };

  const endGame = () => {
    setIsPlaying(false);
    setShowResult(true);
  };

  const handleBoxClick = useCallback(() => {
    if (isPlaying) {
      setBoxSize(prev => prev + 5);
      setClickCount(prev => prev + 1);
    }
  }, [isPlaying]);

  const getScore = () => boxSize - 100;

  const submitScore = async () => {
    if (!playerName.trim()) return;
    
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_name: playerName,
          score: getScore(),
          click_count: clickCount
        })
      });
      // ランキングページへ遷移
      window.location.href = '/ranking';
    } catch (error) {
      console.error('スコア送信エラー:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-white mb-8 animate-pulse">
          連打チャレンジ！箱を育てろ
        </h1>

        {!isPlaying && !showResult && (
          <button
            onClick={startGame}
            className="px-8 py-4 text-2xl bg-yellow-400 text-gray-800 rounded-full font-bold hover:bg-yellow-300 transform hover:scale-110 transition-transform"
          >
            スタート！
          </button>
        )}

        {isPlaying && (
          <>
            <div className="mb-4">
              <span className="text-4xl text-white font-bold">残り時間: {timeLeft}秒</span>
            </div>
            <div className="mb-4">
              <span className="text-2xl text-yellow-300">クリック数: {clickCount}回</span>
            </div>
            <button
              onClick={handleBoxClick}
              className="mx-auto block transition-all"
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                backgroundColor: '#FFD700',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            />
          </>
        )}

        {showResult && (
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ゲーム終了！</h2>
            <p className="text-2xl mb-2">スコア: <span className="text-5xl text-purple-600">{getScore()}</span></p>
            <p className="text-xl mb-6">クリック数: {clickCount}回</p>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="名前を入力"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="px-4 py-2 text-lg border-2 border-gray-300 rounded-lg"
                maxLength={50}
              />
            </div>
            
            <div className="space-x-4">
              <button
                onClick={submitScore}
                disabled={!playerName.trim()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-gray-400"
              >
                スコア送信
              </button>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
              >
                もう一度
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}