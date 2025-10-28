export const SUPPORTED_LANGUAGES = [
  'tr', 'en', 'ar', 'de', 'fr', 'es', 'it', 'ru', 'zh', 'ja', 'ko', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'el', 'hu', 'ro', 'bg', 'uk', 'sk', 'hr', 'sr', 'lt', 'lv', 'et', 'sl', 'he', 'fa'
];

export const RTL_LANGUAGES = ['ar', 'he', 'fa'];

export function isRtl(lang: string) {
  return RTL_LANGUAGES.includes(lang);
}

export const translations = {
  tr: {
    homeTitle: 'Livben - Çok Dilli E-Ticaret',
    homeDescription: 'Hoş geldiniz! Türkçe ana sayfa.',
    notFound: 'Sayfa bulunamadı.',
    adminTitle: 'Admin Paneli',
    adminWelcome: 'Yönetim işlemlerini buradan yapabilirsiniz.',
    userTitle: 'Kullanıcı Paneli',
    userWelcome: 'Kullanıcı işlemlerinizi buradan yapabilirsiniz.',
    storeTitle: 'Mağaza Paneli',
    storeWelcome: 'Mağaza işlemlerinizi buradan yapabilirsiniz.'
  },
  en: {
    homeTitle: 'Livben - Multilingual E-Commerce',
    homeDescription: 'Welcome! English homepage.',
    notFound: 'Page not found.',
    adminTitle: 'Admin Panel',
    adminWelcome: 'You can manage the site here.',
    userTitle: 'User Panel',
    userWelcome: 'You can manage your user actions here.',
    storeTitle: 'Store Panel',
    storeWelcome: 'You can manage your store actions here.'
  },
  ar: {
    homeTitle: 'ليفبن - تجارة إلكترونية متعددة اللغات',
    homeDescription: 'مرحبًا! الصفحة الرئيسية بالعربية.',
    notFound: 'الصفحة غير موجودة.',
    adminTitle: 'لوحة الإدارة',
    adminWelcome: 'يمكنك إدارة الموقع من هنا.',
    userTitle: 'لوحة المستخدم',
    userWelcome: 'يمكنك إدارة إجراءات المستخدم هنا.',
    storeTitle: 'لوحة المتجر',
    storeWelcome: 'يمكنك إدارة متجرك هنا.'
  }
}; 