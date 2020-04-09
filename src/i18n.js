import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';

I18n.fallbacks = true;

I18n.translations = {
    en,
    ru,
};

const currentLocale = I18n.currentLocale();

export const isRTL =
    currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

ReactNative.I18nManager.allowRTL(isRTL);

export function str(name, params = {}) {
    return I18n.t(name, params);
}

export default I18n;
