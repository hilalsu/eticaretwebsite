export const SUPPORTED_LANGUAGES = [
  'tr', 'en', 'ar', 'de', 'fr', 'es', 'it', 'ru', 'zh', 'ja', 'ko', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'el', 'hu', 'ro', 'bg', 'uk', 'sk', 'hr', 'sr', 'lt', 'lv', 'et', 'sl', 'he', 'fa'
];

export const RTL_LANGUAGES = ['ar', 'he', 'fa'];

export function isRtl(lang: string) {
  return RTL_LANGUAGES.includes(lang);
}
