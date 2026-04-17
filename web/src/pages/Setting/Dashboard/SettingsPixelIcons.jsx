import React, { useEffect, useState } from 'react';
import { Switch, Typography } from '@douyinfe/semi-ui';
import { API, showError, showSuccess } from '../../../helpers';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export default function SettingsPixelIcons({ options, refresh }) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const val = options['console_setting.pixel_icons_enabled'];
    setEnabled(val === 'true' || val === true);
  }, [options['console_setting.pixel_icons_enabled']]);

  const handleToggle = async (checked) => {
    try {
      const res = await API.put('/api/option/', {
        key: 'console_setting.pixel_icons_enabled',
        value: checked ? 'true' : 'false',
      });
      if (res.data.success) {
        setEnabled(checked);
        showSuccess(t('设置已保存'));
        refresh?.();
      } else {
        showError(res.data.message);
      }
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
        <div>
          <Text strong className='text-base'>
            {t('像素风首页')}
          </Text>
          <br />
          <Text type='tertiary' size='small'>
            {t('启用后首页将使用像素风图标替代默认供应商图标')}
          </Text>
        </div>
        <div className='flex items-center gap-2'>
          <Switch checked={enabled} onChange={handleToggle} />
          <Text>{enabled ? t('已启用') : t('已禁用')}</Text>
        </div>
      </div>
    </div>
  );
}
