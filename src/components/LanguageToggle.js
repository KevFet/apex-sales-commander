'use client';
import { useSalesState } from '../hooks/useSalesState';

export default function LanguageToggle({ currentLanguage, onChange }) {
    const languages = [
        { code: 'en', label: 'THE CLOSER (EN)' },
        { code: 'fr', label: 'LE STRATÈGE (FR)' },
        { code: 'es', label: 'EL PATRÓN (ES)' }
    ];

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onChange(lang.code)}
                    className={currentLanguage === lang.code ? 'button-primary' : 'button-secondary'}
                    style={{ padding: '8px 12px', fontSize: '0.8rem', textTransform: 'uppercase' }}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
