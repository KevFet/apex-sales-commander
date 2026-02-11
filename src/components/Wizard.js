'use client';
import { useState, useEffect } from 'react';
import { salesContent } from '../data/salesContent';

export default function Wizard({
    currentStep,
    notes,
    handleNext,
    handlePrevious,
    language,
    stepError
}) {
    const [currentNote, setCurrentNote] = useState('');

    // Sync local note input with global notes when step changes
    useEffect(() => {
        if (notes[currentStep]) {
            setCurrentNote(notes[currentStep]);
        } else {
            setCurrentNote('');
        }
    }, [currentStep, notes]);

    const onNextClick = () => {
        // Pass the current note up to the parent handler logic
        handleNext(currentNote);
    };

    const isComplete = currentStep >= salesContent.phases.length;

    const copyToClipboard = () => {
        const text = Object.entries(notes).map(([step, note]) => {
            const p = salesContent.phases[step];
            return `${p.title[language]}:\n${note}\n`;
        }).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert("NOTES COPIED TO CLIPBOARD - PASTE INTO CRM");
        });
    };

    if (isComplete) {
        return (
            <div className="summary-section" style={{ padding: '2rem', border: '1px solid #333', marginTop: '2rem' }}>
                <h2 style={{ color: '#00FF7F', textTransform: 'uppercase' }}>Mission Complete</h2>
                <div style={{ margin: '2rem 0' }}>
                    {Object.entries(notes).map(([step, note]) => {
                        const p = salesContent.phases[step];
                        // Ensure phase exists before accessing
                        if (!p) return null;
                        return (
                            <div key={step} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>{p.title[language]}</h4>
                                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{note}</p>
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="button-primary"
                    style={{ width: '100%' }}
                >
                    EXPORT TO CRM (COPY)
                </button>
            </div>
        );
    }

    const phase = salesContent.phases[currentStep];

    return (
        <div className="wizard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Progress */}
            <div style={{ background: '#333', height: '4px', width: '100%', borderRadius: '2px' }}>
                <div style={{
                    background: '#00FF7F',
                    height: '100%',
                    width: `${((currentStep) / salesContent.phases.length) * 100}%`,
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Header */}
            <div style={{ borderLeft: '4px solid #00FF7F', paddingLeft: '1.5rem' }}>
                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    Phase {currentStep + 1} / {salesContent.phases.length}
                </h4>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', textTransform: 'uppercase' }}>
                    {phase.title[language]}
                </h1>
            </div>

            {/* Script Box */}
            <div className="beast-mode-border" style={{ padding: '2rem', background: 'rgba(0, 255, 127, 0.05)' }}>
                <h3 style={{ color: '#00FF7F', marginBottom: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>SAY THIS:</h3>
                <p style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: '500' }}>
                    "{phase.script[language]}"
                </p>
            </div>

            {/* Input */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    Client Response / Notes
                </label>
                <textarea
                    className="input-field"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Capture detailed response here..."
                    rows={6}
                    style={{ width: '100%', background: '#111', color: '#fff', border: '1px solid #333', padding: '1rem' }}
                />
                {stepError && <p style={{ color: '#FF0033', marginTop: '0.5rem', fontWeight: 'bold' }}>⚠️ {stepError}</p>}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    className="button-secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
                >
                    &larr; Previous
                </button>
                <button
                    className="button-primary"
                    onClick={onNextClick}
                >
                    Next Phase &rarr;
                </button>
            </div>

        </div>
    );
}
