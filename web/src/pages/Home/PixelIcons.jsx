import React from 'react';

/**
 * Pixel art icons using CSS box-shadow technique.
 * Each icon is an 8x8 grid. The `pixels` array contains [x, y, color] tuples.
 * A single 1px div is scaled up, and box-shadows form the pixel grid.
 */

const GRID = 8;

// Helper: generate box-shadow string from pixel array
function toBoxShadow(pixels, scale) {
  return pixels
    .map(([x, y, c]) => `${x * scale}px ${y * scale}px 0 0 ${c}`)
    .join(',');
}

// --- Icon pixel data (8×8 grids) ---
// Colors are chosen to be recognizable silhouettes of each brand.

const icons = {
  openai: {
    color: '#10a37f',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[1,3],[3,3],[4,3],[6,3],
      [1,4],[3,4],[4,4],[6,4],[2,5],[5,5],[3,6],[4,6],[3,7],[4,7],
    ],
  },
  claude: {
    color: '#d97757',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[1,3],[6,3],[1,4],[6,4],
      [2,5],[5,5],[3,6],[4,6],[4,7],
    ],
  },
  gemini: {
    color: '#4285f4',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[1,3],[3,3],[4,3],[1,4],[6,4],
      [2,5],[5,5],[3,6],[4,6],[3,7],[4,7],
    ],
  },
  deepseek: {
    color: '#4d6bfe',
    pixels: [
      [1,0],[2,0],[1,1],[3,1],[1,2],[4,2],[1,3],[5,3],[1,4],[4,4],
      [1,5],[3,5],[1,6],[2,6],[1,7],[2,7],[3,7],
    ],
  },
  xai: {
    color: '#f5f5f5',
    pixels: [
      [1,0],[6,0],[2,1],[5,1],[3,2],[4,2],[3,3],[4,3],[3,4],[4,4],
      [2,5],[5,5],[1,6],[6,6],[1,7],[6,7],
    ],
  },
  moonshot: {
    color: '#5b5fc7',
    pixels: [
      [3,0],[4,0],[5,0],[2,1],[6,1],[1,2],[6,2],[1,3],[5,3],[1,4],
      [4,4],[1,5],[5,5],[2,6],[6,6],[3,7],[4,7],[5,7],
    ],
  },
  zhipu: {
    color: '#3b82f6',
    pixels: [
      [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[3,1],[4,1],[3,2],[4,2],
      [2,3],[5,3],[1,4],[6,4],[1,5],[6,5],[2,6],[5,6],[3,7],[4,7],
    ],
  },
  volcengine: {
    color: '#3370ff',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[7,3],[0,4],[7,4],
      [1,5],[6,5],[2,6],[5,6],[3,7],[4,7],
    ],
  },
  cohere: {
    color: '#39594d',
    pixels: [
      [3,0],[4,0],[5,0],[2,1],[6,1],[1,2],[1,3],[1,4],[1,5],[2,6],
      [6,6],[3,7],[4,7],[5,7],
    ],
  },
  suno: {
    color: '#f59e0b',
    pixels: [
      [3,1],[4,1],[3,2],[5,2],[3,3],[6,3],[3,4],[6,4],[3,5],[5,5],
      [3,6],[4,6],[1,4],[1,5],[1,6],[1,7],
    ],
  },
  minimax: {
    color: '#6366f1',
    pixels: [
      [0,1],[1,0],[2,1],[3,0],[4,1],[5,0],[6,1],[7,0],
      [0,3],[1,4],[2,3],[3,4],[4,3],[5,4],[6,3],[7,4],
      [0,5],[1,6],[2,5],[3,6],[4,5],[5,6],[6,5],[7,6],
    ],
  },
  wenxin: {
    color: '#2563eb',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[3,3],[4,3],[7,3],
      [0,4],[3,4],[4,4],[7,4],[1,5],[6,5],[2,6],[5,6],[3,7],[4,7],
    ],
  },
  spark: {
    color: '#ef4444',
    pixels: [
      [4,0],[3,1],[5,1],[2,2],[6,2],[1,3],[3,3],[4,3],[5,3],[7,3],
      [2,4],[6,4],[3,5],[5,5],[4,6],[4,7],
    ],
  },
  qingyan: {
    color: '#8b5cf6',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[1,3],[3,3],[4,3],[6,3],
      [1,4],[6,4],[2,5],[5,5],[3,6],[4,6],[3,7],[4,7],
    ],
  },
  qwen: {
    color: '#6d28d9',
    pixels: [
      [1,0],[6,0],[1,1],[6,1],[1,2],[3,2],[4,2],[6,2],[1,3],[2,3],
      [5,3],[6,3],[2,4],[5,4],[3,5],[4,5],[3,6],[4,6],[3,7],[4,7],
    ],
  },
  midjourney: {
    color: '#f0f0f0',
    pixels: [
      [1,0],[6,0],[0,1],[2,1],[5,1],[7,1],[0,2],[3,2],[4,2],[7,2],
      [0,3],[3,3],[4,3],[7,3],[1,4],[6,4],[2,5],[5,5],[3,6],[4,6],
      [3,7],[4,7],
    ],
  },
  grok: {
    color: '#f97316',
    pixels: [
      [2,0],[3,0],[4,0],[5,0],[1,1],[1,2],[1,3],[2,3],[3,3],[4,3],
      [5,3],[1,4],[5,4],[1,5],[4,5],[1,6],[3,6],[1,7],[2,7],
    ],
  },
  azure: {
    color: '#0078d4',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[7,3],[0,4],[3,4],
      [4,4],[7,4],[1,5],[6,5],[2,6],[5,6],[3,7],[4,7],
    ],
  },
  hunyuan: {
    color: '#00b4d8',
    pixels: [
      [3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[7,3],[0,4],[7,4],
      [1,5],[6,5],[2,6],[5,6],[3,7],[4,7],
    ],
  },
  xinference: {
    color: '#22c55e',
    pixels: [
      [0,0],[7,0],[1,1],[6,1],[2,2],[5,2],[3,3],[4,3],[3,4],[4,4],
      [2,5],[5,5],[1,6],[6,6],[0,7],[7,7],
    ],
  },
};

export default function PixelProviderIcon({ name, size = 40 }) {
  const icon = icons[name];
  if (!icon) return null;

  const scale = Math.max(1, Math.floor(size / GRID));
  const actualSize = GRID * scale;
  const shadow = toBoxShadow(
    icon.pixels.map(([x, y]) => [x, y, icon.color]),
    scale,
  );

  return (
    <div
      style={{
        width: actualSize,
        height: actualSize,
        position: 'relative',
        imageRendering: 'pixelated',
      }}
      title={name}
    >
      <div
        style={{
          width: scale,
          height: scale,
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: shadow,
          background: 'transparent',
        }}
      />
    </div>
  );
}

// Export the list of provider keys for iteration
export const PIXEL_PROVIDER_NAMES = Object.keys(icons);
