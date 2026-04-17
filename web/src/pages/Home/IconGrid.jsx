import React, { useContext } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { StatusContext } from '../../context/Status';
import PixelProviderIcon, { PIXEL_PROVIDER_NAMES } from './PixelIcons';
import {
  Moonshot, OpenAI, XAI, Zhipu, Volcengine, Cohere, Claude, Gemini,
  Suno, Minimax, Wenxin, Spark, Qingyan, DeepSeek, Qwen, Midjourney,
  Grok, AzureAI, Hunyuan, Xinference,
} from '@lobehub/icons';

// Original lobehub icons in the same order as pixel icon keys
const ORIGINAL_ICONS = [
  { key: 'openai', el: <OpenAI size={40} /> },
  { key: 'claude', el: <Claude.Color size={40} /> },
  { key: 'gemini', el: <Gemini.Color size={40} /> },
  { key: 'deepseek', el: <DeepSeek.Color size={40} /> },
  { key: 'xai', el: <XAI size={40} /> },
  { key: 'moonshot', el: <Moonshot size={40} /> },
  { key: 'zhipu', el: <Zhipu.Color size={40} /> },
  { key: 'volcengine', el: <Volcengine.Color size={40} /> },
  { key: 'cohere', el: <Cohere.Color size={40} /> },
  { key: 'suno', el: <Suno size={40} /> },
  { key: 'minimax', el: <Minimax.Color size={40} /> },
  { key: 'wenxin', el: <Wenxin.Color size={40} /> },
  { key: 'spark', el: <Spark.Color size={40} /> },
  { key: 'qingyan', el: <Qingyan.Color size={40} /> },
  { key: 'qwen', el: <Qwen.Color size={40} /> },
  { key: 'midjourney', el: <Midjourney size={40} /> },
  { key: 'grok', el: <Grok size={40} /> },
  { key: 'azure', el: <AzureAI.Color size={40} /> },
  { key: 'hunyuan', el: <Hunyuan.Color size={40} /> },
  { key: 'xinference', el: <Xinference.Color size={40} /> },
];

export default function IconGrid() {
  const [statusState] = useContext(StatusContext);
  const usePixel = statusState?.status?.pixel_icons_enabled;

  const items = usePixel ? PIXEL_PROVIDER_NAMES : ORIGINAL_ICONS;

  return (
    <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto px-4'>
      {usePixel
        ? items.map((name) => (
            <div key={name} className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
              <PixelProviderIcon name={name} size={40} />
            </div>
          ))
        : items.map(({ key, el }) => (
            <div key={key} className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
              {el}
            </div>
          ))}
      <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
        <Typography.Text className='!text-lg sm:!text-xl md:!text-2xl lg:!text-3xl font-bold'>
          30+
        </Typography.Text>
      </div>
    </div>
  );
}
