'use client';
import { useState, useEffect } from 'react';
import { salesContent } from '../data/salesContent';

export default function Wizard({
    currentStep,
    notes,
    handleNext,
    handlePrevious,
    language,
    stepError,
    prospectInfo,
    setProspectInfo
}) {
    const [questionAnswers, setQuestionAnswers] = useState({});
    const [generalNote, setGeneralNote] = useState('');
    const [showObjections, setShowObjections] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [missionStarted, setMissionStarted] = useState(false);

    useEffect(() => {
        setQuestionAnswers({});
        setGeneralNote('');
        if (notes[currentStep]) {
            setGeneralNote(notes[currentStep]);
        }
    }, [currentStep, notes]);

    const handleAnswerChange = (index, value) => {
        setQuestionAnswers(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const handleProspectChange = (field, value) => {
        setProspectInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const startMission = () => {
        if (!prospectInfo.name || !prospectInfo.company) {
            alert("TARGET IDENTIFICATION REQUIRED: ENTER NAME AND COMPANY.");
            return;
        }
        setMissionStarted(true);
    };

    const onNextClick = () => {
        let formattedNote = "";

        const phase = salesContent.phases[currentStep];
        if (phase && phase.questions) {
            phase.questions.forEach((q, idx) => {
                const answer = questionAnswers[idx] || "-(No Answer)-";
                formattedNote += `Q: ${q[language]}\n`;
                formattedNote += `A: ${answer}\n\n`;
            });
        }

        if (generalNote) {
            formattedNote += `[NOTES / OBSERVATIONS]:\n${generalNote}`;
        }

        handleNext(formattedNote);
    };

    const isComplete = currentStep >= salesContent.phases.length;

    const copyToClipboard = () => {
        let text = `MISSION REPORT: ${prospectInfo.company.toUpperCase()} - ${prospectInfo.name.toUpperCase()}\n`;
        text += `DATE: ${new Date().toLocaleDateString()}\n`;
        text += `CONTACT: ${prospectInfo.email} | ${prospectInfo.phone}\n`;
        text += `WEBSITE: ${prospectInfo.website}\n`;
        text += `=================================================\n\n`;

        text += Object.entries(notes).map(([step, note]) => {
            const p = salesContent.phases[step];
            return `=== ${p.title[language]} ===\n${note}\n-----------------------------------\n`;
        }).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert("FULL SALES LOG COPIED TO CLIPBOARD");
        });
    };

    const sendEmail = async () => {
        setIsSending(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes, prospectInfo }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("REPORT SENT TO FETIVEAUKEVIN@GMAIL.COM");
            } else {
                console.error("Email Error:", result);
                alert(`ERROR SENDING EMAIL: ${result.error?.message || result.error || "Unknown Error"}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("NETWORK ERROR SENDING EMAIL");
        } finally {
            setIsSending(false);
        }
    };

    if (!missionStarted) {
        return (
            <div className="prospect-form-container" style={{ border: '2px solid #00FF7F', padding: '2rem', background: 'rgba(10,10,10,0.8)' }}>
                <h2 style={{ color: '#00FF7F', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Target Acquisition (Intel)
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>PROSPECT NAME *</label>
                        <input
                            type="text"
                            value={prospectInfo.name}
                            onChange={(e) => handleProspectChange('name', e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>COMPANY NAME *</label>
                        <input
                            type="text"
                            value={prospectInfo.company}
                            onChange={(e) => handleProspectChange('company', e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                            placeholder="Acme Corp"
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>EMAIL</label>
                            <input
                                type="email"
                                value={prospectInfo.email}
                                onChange={(e) => handleProspectChange('email', e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>PHONE</label>
                            <input
                                type="tel"
                                value={prospectInfo.phone}
                                onChange={(e) => handleProspectChange('phone', e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                                placeholder="+1 555..."
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>WEBSITE URL</label>
                        <input
                            type="url"
                            value={prospectInfo.website}
                            onChange={(e) => handleProspectChange('website', e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                            placeholder="https://..."
                        />
                    </div>

                    <button
                        onClick={startMission}
                        className="button-primary"
                        style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.2rem' }}
                    >
                        INITIATE MISSION &rarr;
                    </button>
                </div>
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="summary-section" style={{ padding: '2rem', border: '1px solid #333', marginTop: '2rem' }}>
                <h2 style={{ color: '#00FF7F', textTransform: 'uppercase' }}>Mission Complete</h2>

                <div style={{ background: '#111', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid #00FF7F' }}>
                    <h3 style={{ color: 'white', margin: 0 }}>{prospectInfo.company} - {prospectInfo.name}</h3>
                    <p style={{ color: '#888', margin: '0.5rem 0 0 0' }}>{prospectInfo.email} | {prospectInfo.phone}</p>
                </div>

                <div style={{ margin: '2rem 0' }}>
                    {Object.entries(notes).map(([step, note]) => {
                        const p = salesContent.phases[step];
                        if (!p) return null;
                        return (
                            <div key={step} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>{p.title[language]}</h4>
                                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', color: '#CCC' }}>{note}</p>
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={copyToClipboard}
                        className="button-secondary"
                        style={{ flex: 1 }}
                    >
                        COPY TO CLIPBOARD
                    </button>
                    <button
                        onClick={sendEmail}
                        className="button-primary"
                        style={{ flex: 1 }}
                        disabled={isSending}
                    >
                        {isSending ? "SENDING..." : "SEND TO EMAIL"}
                    </button>
                </div>
            </div>
        );
    }

    const phase = salesContent.phases[currentStep];

    return (
        <div className="wizard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>

            {/* Context Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>
                <span>TARGET: {prospectInfo.company.toUpperCase()}</span>
                <span>CONTACT: {prospectInfo.name.toUpperCase()}</span>
            </div>

            {/* Objections Overlay */}
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

            {/* Header */}
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

            {/* Dynamic Discovery Questions Form */}
            <div className="questions-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ color: '#00FF7F', textTransform: 'uppercase', fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                    Step-by-Step Discovery
                </h3>

                {phase.questions && phase.questions.map((q, idx) => (
                    <div key={idx} style={{ background: '#111', padding: '1rem', border: '1px solid #333', borderRadius: '4px' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', color: '#EEE', fontSize: '0.95rem', fontWeight: '500' }}>
                            {idx + 1}. {q[language]}
                        </label>
                        <input
                            type="text"
                            value={questionAnswers[idx] || ''}
                            onChange={(e) => handleAnswerChange(idx, e.target.value)}
                            placeholder="Candidate Answer..."
                            style={{
                                width: '100%',
                                background: '#1A1A1A',
                                border: '1px solid #444',
                                color: 'white',
                                padding: '0.8rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* General Notes Input */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    Additional Notes / Observations
                </label>
                <textarea
                    className="input-field"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    placeholder="Anything else relevant..."
                    rows={3}
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
