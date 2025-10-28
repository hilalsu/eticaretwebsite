import { useParams } from 'next/navigation';
import translations from '../../i18n';

export default function NotFound() {
  const { lang } = useParams();
  const t = translations[lang] || translations['tr'];

  return (
    <main style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1>404</h1>
      <p>{t.notFound || 'Sayfa bulunamadı.'}</p>
    </main>
  );
} 