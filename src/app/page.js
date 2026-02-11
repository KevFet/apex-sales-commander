'use client';

import { useSalesState } from '../hooks/useSalesState';
import Wizard from '../components/Wizard';
import LanguageToggle from '../components/LanguageToggle';

export default function Home() {
  const {
    currentStep,
    notes,
    language,
    error,
    handleNext,
    handlePrevious,
    handleLanguageChange
  } = useSalesState();

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      background: '#0A0A0A',
      color: '#FFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      {/* Header / HUD Top Bar */}
      <header style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        borderBottom: '1px solid #333',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '12px', height: '12px', background: '#00FF7F', borderRadius: '50%', boxShadow: '0 0 10px #00FF7F' }}></div>
          <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
            APEX SALES COMMANDER
          </h2>
        </div>

        <LanguageToggle
          currentLanguage={language}
          onChange={handleLanguageChange}
        />
      </header>

      {/* Main Interface */}
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Wizard
          currentStep={currentStep}
          notes={notes}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          language={language}
          stepError={error}
        />
      </div>

      {/* Footer / Copyright */}
      <footer style={{ marginTop: '4rem', color: '#444', fontSize: '0.8rem', textTransform: 'uppercase' }}>
        System Status: Online // Mode: Beast
      </footer>

    </main>
  );
}
