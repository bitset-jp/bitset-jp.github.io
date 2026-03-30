import { ui, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang | string | undefined) {
  const l = (lang && lang in ui ? lang : defaultLang) as Lang;
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[l] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLocalizedPath(path: string, lang: Lang | string | undefined): string {
  const cleanPath = path.replace(/^\/en(\/|$)/, '/');
  if (lang === 'en') {
    return `/en${cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '')}`;
  }
  return cleanPath;
}

export function getAlternateLang(lang: Lang | string | undefined): Lang {
  return lang === 'en' ? 'ja' : 'en';
}
