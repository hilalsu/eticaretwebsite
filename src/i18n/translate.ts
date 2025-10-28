type Translations = Record<string, string>;

const translationsCache: Record<string, Translations> = {};

export async function translate(lang: string, key: string): Promise<string> {
  if (!translationsCache[lang]) {
    try {
      const module = await import(`./${lang}.json`);
      translationsCache[lang] = module.default;
    } catch {
      translationsCache[lang] = {};
    }
  }
  return translationsCache[lang][key] || key;
} 