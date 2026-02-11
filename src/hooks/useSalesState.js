import { useState } from 'react';

export const useSalesState = (initialLanguage = 'en') => {
    const [currentStep, setCurrentStep] = useState(0);
    const [notes, setNotes] = useState({});
    const [language, setLanguage] = useState(initialLanguage);
    const [error, setError] = useState('');
    const [prospectInfo, setProspectInfo] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        website: ''
    });

    const handleNext = (currentNote) => {
        if (!currentNote || currentNote.length < 10) {
            setError("YOU ARE LOSING CONTROL: Take a note on their pain before moving on.");
            return false;
        }

        // Save note for current step
        setNotes(prev => ({
            ...prev,
            [currentStep]: currentNote
        }));

        setError('');

        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
            return true;
        }
        return false; // Steps complete
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setError('');
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    return {
        currentStep,
        notes,
        language,
        error,
        prospectInfo,
        setProspectInfo,
        setCurrentStep,
        handleNext,
        handlePrevious,
        handleLanguageChange,
        setNotes
    };
};
