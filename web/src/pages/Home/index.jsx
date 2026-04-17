/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, ScrollList, ScrollItem } from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { IconCopy } from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import Starfield from './Starfield';
import IconGrid from './IconGrid';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const isDark = actualTheme === 'dark';
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const status = statusState?.status || {};
  const isDemoSiteMode = status.demo_site_enabled || false;
  const docsLink = status.docs_link || '';
  const serverAddress = status.server_address || window.location.origin;
  const systemName = status.system_name || 'New API';
  const version = status.version || '';
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);

  const features = [
    { label: 'Chat', enabled: !!status.chats },
    { label: 'Drawing', enabled: !!status.enable_drawing },
    { label: 'Task', enabled: !!status.enable_task },
  ];

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) content = marked.parse(data);
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) showSuccess(t('已复制到剪切板'));
  };

  useEffect(() => {
    (async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      if (lastCloseDate !== new Date().toDateString()) {
        try {
          const res = await API.get('/api/notice');
          if (res.data.success && res.data.data?.trim()) setNoticeVisible(true);
        } catch (_) { /* ignore */ }
      }
    })();
  }, []);

  useEffect(() => {
    displayHomePageContent();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setEndpointIndex((p) => (p + 1) % endpointItems.length),
      3000,
    );
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  const accent = isDark ? '#facc15' : '#6366f1';
  const muted = isDark ? '#666' : '#999';
  const txt = isDark ? '#ccc' : '#444';
  const dashed = isDark ? '#333' : '#ccc';

  return (
    <div className='pixel-home w-full overflow-x-hidden'>
      <NoticeModal visible={noticeVisible} onClose={() => setNoticeVisible(false)} isMobile={isMobile} />
      {homePageContentLoaded && homePageContent === '' ? (
        <div
          className='w-full min-h-screen relative overflow-hidden'
          style={{ background: isDark ? '#0f0f23' : '#e8e4d9' }}
        >
          <Starfield theme={actualTheme} />
          <div className='pixel-scanlines' />

          <div className='relative z-10 px-4 md:px-8 pt-24 pb-12 max-w-6xl mx-auto'>

            {/* Hero panel */}
            <div className='pixel-container mb-6' style={{ padding: isMobile ? '16px' : '24px' }}>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div style={{ minWidth: 0 }}>
                  <p className='pixel-label' style={{ color: muted }}>
                    {'// ' + systemName}
                  </p>
                  <h1 className='pixel-title mt-2' style={{ color: isDark ? '#fff' : '#212529' }}>
                    {t('统一的')}{' '}
                    <span className='pixel-title-accent'>{t('大模型接口网关')}</span>
                  </h1>
                  <p className='pixel-subtitle mt-3' style={{ color: isDark ? '#b0b0b0' : '#555' }}>
                    {t('更好的价格，更好的稳定性，只需要将模型基址替换为：')}
                  </p>
                </div>
                {version && (
                  <div className='pixel-badge' style={{ color: accent }}>
                    v{version}
                  </div>
                )}
              </div>
            </div>

            {/* URL + Status row */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6 mb-6`}>

              {/* Left 2/3: URL + CTA */}
              <div className={isMobile ? '' : 'col-span-2'}>
                <div className='pixel-container mb-4' style={{ padding: '12px 16px' }}>
                  <p className='pixel-label mb-2' style={{ color: muted }}>BASE URL</p>
                  <Input
                    readonly
                    value={serverAddress}
                    className='pixel-input'
                    size={isMobile ? 'default' : 'large'}
                    suffix={
                      <div className='flex items-center gap-2'>
                        <ScrollList bodyHeight={32} style={{ border: 'unset', boxShadow: 'unset' }}>
                          <ScrollItem
                            mode='wheel'
                            cycled
                            list={endpointItems}
                            selectedIndex={endpointIndex}
                            onSelect={({ index }) => setEndpointIndex(index)}
                          />
                        </ScrollList>
                        <Button
                          type='primary'
                          onClick={handleCopyBaseURL}
                          icon={<IconCopy />}
                          className='!rounded-none'
                        />
                      </div>
                    }
                  />
                </div>
                <div className='flex flex-wrap gap-3'>
                  <Link to='/console'>
                    <button type='button' className='pixel-btn pixel-btn-primary'>
                      ▶ {t('获取密钥')}
                    </button>
                  </Link>
                  {isDemoSiteMode && version ? (
                    <button
                      type='button'
                      className='pixel-btn'
                      onClick={() => window.open('https://github.com/QuantumNous/new-api', '_blank')}
                    >
                      ★ GitHub
                    </button>
                  ) : docsLink ? (
                    <button
                      type='button'
                      className='pixel-btn'
                      onClick={() => window.open(docsLink, '_blank')}
                    >
                      ◆ {t('文档')}
                    </button>
                  ) : null}
                  {status.chats && (
                    <Link to='/chat'>
                      <button type='button' className='pixel-btn'>✦ Chat</button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Right 1/3: Status panel */}
              <div className='pixel-container' style={{ padding: '16px' }}>
                <p className='pixel-label mb-3' style={{ color: accent }}>♦ STATUS</p>
                <div className='flex flex-col gap-2'>
                  {features.map((f) => (
                    <div key={f.label} className='flex items-center justify-between'>
                      <span className='pixel-label' style={{ color: txt }}>{f.label}</span>
                      <span
                        className='pixel-label'
                        style={{ color: f.enabled ? '#22c55e' : '#ef4444' }}
                      >
                        {f.enabled ? '● ON' : '○ OFF'}
                      </span>
                    </div>
                  ))}
                  <div className='mt-2 pt-2' style={{ borderTop: `1px dashed ${dashed}` }}>
                    <div className='flex items-center justify-between'>
                      <span className='pixel-label' style={{ color: txt }}>{t('供应商')}</span>
                      <span className='pixel-label' style={{ color: isDark ? '#38bdf8' : '#2563eb' }}>
                        30+
                      </span>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <span className='pixel-label' style={{ color: txt }}>API</span>
                      <span className='pixel-label' style={{ color: isDark ? '#38bdf8' : '#2563eb' }}>
                        OpenAI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Providers panel */}
            <div className='pixel-container' style={{ padding: isMobile ? '16px' : '24px' }}>
              <p className='pixel-label mb-4' style={{ color: accent }}>
                ♦ {t('支持众多的大模型供应商')}
              </p>
              <IconGrid />
            </div>

          </div>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe src={homePageContent} className='w-full h-screen border-none' />
          ) : (
            <div className='mt-[60px]' dangerouslySetInnerHTML={{ __html: homePageContent }} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
