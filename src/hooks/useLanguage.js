import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import tr from '../locales/tr.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';

const LOCALES = { tr, en, es, fr, de };
const SUPPORTED = ['tr', 'en', 'es', 'fr', 'de'];
const STORAGE_KEY = 'calandlens_lang';

export const LANGUAGE_OPTIONS = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

function detectLanguage() {
  // 1. LocalStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  // 2. Browser language
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browserLang)) return browserLang;
  // 3. Fallback
  return 'tr';
}

/**
 * Deep-get a translation key like "nutrition.calories"
 */
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((acc, key) => {
    if (acc == null) return keyPath; // fallback: return key
    return acc[key];
  }, obj);
}

// ── Context ────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  const setLang = useCallback((code) => {
    if (!SUPPORTED.includes(code)) return;
    localStorage.setItem(STORAGE_KEY, code);
    setLangState(code);
    document.documentElement.lang = code;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /**
   * t('nutrition.calories') → "Kalori"
   * Supports simple interpolation: t('portion.x', { count: 5 }) with {{count}} in string
   */
  const t = useCallback((key, vars = {}) => {
    const locale = LOCALES[lang] || LOCALES.tr;
    let val = getNestedValue(locale, key);
    if (val == null || typeof val !== 'string') {
      // Try fallback to Turkish
      val = getNestedValue(LOCALES.tr, key);
    }
    if (val == null || typeof val !== 'string') return key;
    // Simple {{var}} interpolation
    return val.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
  }, [lang]);

  /**
   * tArr('history.months') → array
   */
  const tArr = useCallback((key) => {
    const locale = LOCALES[lang] || LOCALES.tr;
    const val = getNestedValue(locale, key);
    return Array.isArray(val) ? val : getNestedValue(LOCALES.tr, key) || [];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr, LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
