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
    const [showObjections, setShowObjections] = useState(false);

    // Sync local note input with global notes when step changes
    useEffect(() => {
        if (notes[currentStep]) {
            setCurrentNote(notes[currentStep]);
        } else {
            setCurrentNote('');
        }
    }, [currentStep, notes]);

    const onNextClick = () => {
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
                        if (!p) return null;
                        return (
                            <div key={step} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>{p.title[language]}</h4>
                                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{note}</p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={copyToClipboard} className="button-primary" style={{ width: '100%' }}>
                    EXPORT TO CRM (COPY)
                </button>
            </div>
        );
    }

    const phase = salesContent.phases[currentStep];

    return (
        <div className="wizard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>

            {/* Objections Cheat Sheet Overlay */}
            {showObjections && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '400px',
                    height: '100vh',
                    background: 'rgba(10, 10, 10, 0.95)',
                    borderLeft: '2px solid #FF0033',
                    padding: '2rem',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ color: '#FF0033', textTransform: 'uppercase', margin: 0 }}>⚠️ Objection Detected</h3>
                        <button onClick={() => setShowObjections(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {salesContent.objections.map((obj) => (
                            <div key={obj.id} style={{ border: '1px solid #333', padding: '1rem', borderRadius: '4px' }}>
                                <h4 style={{ color: '#FFF', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{obj.label[language]}</h4>
                                <p style={{ color: '#CCC', fontStyle: 'italic', fontSize: '0.95rem' }}>"{obj.rebuttal[language]}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Progress */}
            <div style={{ background: '#333', height: '4px', width: '100%', borderRadius: '2px' }}>
                <div style={{
                    background: '#00FF7F',
                    height: '100%',
                    width: `${((currentStep) / salesContent.phases.length) * 100}%`,
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Header + Objection Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ borderLeft: '4px solid #00FF7F', paddingLeft: '1.5rem' }}>
                    <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                        Phase {currentStep + 1} / {salesContent.phases.length}
                    </h4>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', textTransform: 'uppercase' }}>
                        {phase.title[language]}
                    </h1>
                </div>
                <button
                    onClick={() => setShowObjections(!showObjections)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #FF0033',
                        color: '#FF0033',
                        padding: '8px 16px',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}
                >
                    ⚠️ Anti-Sèche
                </button>
            </div>

            {/* Script Box */}
            <div className="beast-mode-border" style={{ padding: '2rem', background: 'rgba(0, 255, 127, 0.05)' }}>
                <h3 style={{ color: '#00FF7F', marginBottom: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>SAY THIS:</h3>
                <p style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: '500' }}>
                    "{phase.script[language]}"
                </p>
            </div>

            {/* Discovery Questions (Only if available) */}
            {phase.questions && phase.questions.length > 0 && (
                <div style={{ marginTop: '-1rem' }}>
                    <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>Discovery Questions:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                        {phase.questions.map((q, idx) => (
                            <li key={idx} style={{
                                background: '#151515',
                                padding: '0.8rem',
                                borderLeft: '2px solid #444',
                                color: '#EEE',
                                fontSize: '0.95rem'
                            }}>
                                {q[language]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
