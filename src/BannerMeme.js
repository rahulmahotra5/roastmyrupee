// components/BannerMeme.js
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const BannerMeme = ({ lastTransaction }) => {
  const [bannerMeme, setBannerMeme] = useState(null);
  const [isLoadingMeme, setIsLoadingMeme] = useState(true);

  const generateBannerMeme = async () => {
    setIsLoadingMeme(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 800;
      canvas.height = 300;

      // 🎨 White Background First
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 300);

      // 🌞 Draw Radiating Sunburst (6 segments) using triangles
      const centerX = 400;
      const centerY = 150;
      const radius = 1800;
      const segments = 6;
      const angleStep = (2 * Math.PI) / segments;

      for (let i = 0; i < segments; i++) {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        // Alternate between soft gold & warm orange
        ctx.fillStyle = i % 2 === 0 ? '#efecdfff' : '#f6d39dff'; // Light gold / light orange
        ctx.fill();
      }

      // 🎭 Central Emoji (Random from list)
      const emojis = ['😊', '🤣', '💸', '😭', '🔥', '🤑', '🤯', '🫣', '🎭'];
      const centerEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      ctx.font = 'bold 102px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(centerEmoji, centerX, centerY + 30); // Adjust vertical centering

      // 🖋️ Top Text: "ME FINDING OUT"
      ctx.font = 'bold 32px Impact, Arial';
      ctx.fillStyle = '#000';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.fillText(`YOU SPENT ₹${lastTransaction.amount} ON ${lastTransaction.merchant}`, centerX, 50);
      ctx.strokeText(`YOU SPENT ₹${lastTransaction.amount} ON ${lastTransaction.merchant}`, centerX, 50);

      // 🖋️ Bottom Text: Transaction Roast
      const roasts = [
        `YOUR WALLET JUST CRIED`,
        `EMERGENCY FUND LEFT THE CHAT`,
        `FINANCIAL ADVISOR IS LOOKING FOR YOU`,
        `SAVINGS ACCOUNT IS DEPRESSED RN`
      ];
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

      ctx.font = 'bold 32px Impact, Arial';
      ctx.fillText(randomRoast, centerX, 250);
      ctx.strokeText(randomRoast, centerX, 250);

      // 🎈 Sprinkle small random emojis around the edges
      const edgeEmojis = ['✨', '💥', '🎯', '📈', '📉', '💎', '👑', '💸'];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const x = centerX + Math.cos(angle) * 300;
        const y = centerY + Math.sin(angle) * 150;

        ctx.font = 'bold 22px Arial';
        ctx.fillText(edgeEmojis[Math.floor(Math.random() * edgeEmojis.length)], x, y);
      }

      const memeDataUrl = canvas.toDataURL();
      setBannerMeme(memeDataUrl);
    } catch (error) {
      console.error('Error generating meme:', error);
    }

    setIsLoadingMeme(false);
  };

  useEffect(() => {
    if (lastTransaction) generateBannerMeme();
  }, [lastTransaction]);

  return (
    <div className="mb-8 transition-all duration-300 hover:shadow-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-orange-100">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-gray-900">Latest FamX Transaction</h2>
            <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-bold border border-yellow-200">
              AI Powered
            </span>
          </div>
          <button
            onClick={generateBannerMeme}
            disabled={isLoadingMeme}
            className="flex items-center gap-1 text-orange-700 hover:text-orange-900 disabled:opacity-50 bg-white px-3 py-1.5 rounded-lg text-sm border border-orange-200 hover:shadow-sm transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingMeme ? 'animate-spin' : ''}`} />
            Re-Roast
          </button>
        </div>

        {/* Meme Output */}
        {isLoadingMeme ? (
          <div className="h-80 flex flex-col items-center justify-center bg-gray-25">
            <p className="text-gray-600 font-medium">Generating your roast...</p>
            <p className="text-sm text-gray-500 mt-1">One sarcastic meme coming up</p>
          </div>
        ) : bannerMeme ? (
          <img
            src={bannerMeme}
            alt="Spending roast meme"
            className="w-full h-80 object-contain"
            style={{ imageRendering: 'auto' }}
          />
        ) : (
          <div className="h-80 flex items-center justify-center bg-gray-25">
            <p className="text-gray-500 text-sm">Failed to generate meme.</p>
          </div>
        )}

        {/* Footer */}
        {!isLoadingMeme && bannerMeme && (
          <div className="bg-black text-center py-1.5">
            <p className="text-yellow-300 text-sm font-medium">
              👉 Share this before your mom see this 💀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerMeme;