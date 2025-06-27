import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-white mb-4 animate-bounce">
          🎮 連打チャレンジ！
        </h1>
        <h2 className="text-4xl text-yellow-300 mb-12">
          箱を育てろ
        </h2>
        
        <div className="space-y-6">
          <Link
            href="/game"
            className="block w-64 mx-auto px-8 py-6 bg-yellow-400 text-gray-800 rounded-full text-2xl font-bold hover:bg-yellow-300 transform hover:scale-110 transition-all shadow-lg"
          >
            ゲームスタート！
          </Link>
          
          <Link
            href="/ranking"
            className="block w-64 mx-auto px-8 py-4 bg-white text-purple-600 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
          >
            🏆 ランキングを見る
          </Link>
        </div>
        
        <div className="mt-16 text-white">
          <h3 className="text-2xl font-bold mb-4">遊び方</h3>
          <div className="text-lg space-y-2">
            <p>1. スタートボタンを押す</p>
            <p>2. 10秒間、箱をクリック！</p>
            <p>3. 大きくなった分がスコア！</p>
            <p>4. ランキングに挑戦！</p>
          </div>
        </div>
      </div>
    </div>
  );
}