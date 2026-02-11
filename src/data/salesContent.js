export const salesContent = {
    phases: [
        {
            id: 1,
            title: {
                en: "Phase 1: The Frame (Upfront Contract)",
                fr: "Phase 1: Le Cadre (L'Accord Préalable)",
                es: "Fase 1: El Marco (Acuerdo Inicial)"
            },
            script: {
                en: "Is it fair if we decide today if this is a fit?",
                fr: "Est-ce qu'on peut convenir d'une décision à la fin ?",
                es: "¿Le parece bien si al final decidimos si avanzamos?"
            },
            questions: [
                {
                    en: "Why did you agree to this call today?",
                    fr: "Pourquoi avez-vous accepté cet appel aujourd'hui ?",
                    es: "¿Por qué aceptó esta llamada hoy?"
                },
                {
                    en: "How long do we have for this call?",
                    fr: "Combien de temps avons-nous ?",
                    es: "¿Cuánto tiempo tenemos?"
                }
            ]
        },
        {
            id: 2,
            title: {
                en: "Phase 2: Pain Extraction (Discovery)",
                fr: "Phase 2: L'Extraction de la Douleur",
                es: "Fase 2: Extracción del Dolor"
            },
            script: {
                en: "What is this cost of inaction costing you monthly?",
                fr: "Quel est le manque à gagner réel chaque mois ?",
                es: "¿Cuánto dinero está dejando sobre la mesa al mes?"
            },
            questions: [
                {
                    en: "How long has this been a problem?",
                    fr: "Depuis combien de temps est-ce un problème ?",
                    es: "¿Cuánto tiempo ha sido esto un problema?"
                },
                {
                    en: "What have you tried to fix it?",
                    fr: "Qu'avez-vous essayé pour résoudre ça ?",
                    es: "¿Qué ha intentado para solucionarlo?"
                },
                {
                    en: "How is this impacting you personally?",
                    fr: "Comment cela vous impacte-t-il personnellement ?",
                    es: "¿Cómo le afecta esto personalmente?"
                },
                {
                    en: "Who else is affected by this?",
                    fr: "Qui d'autre est affecté par cela ?",
                    es: "¿Quién más se ve afectado por esto?"
                },
                {
                    en: "If nothing changes, where will you be in 6 months?",
                    fr: "Si rien ne change, où serez-vous dans 6 mois ?",
                    es: "¿Si no cambia nada, dónde estará en 6 meses?"
                }
            ]
        },
        {
            id: 3,
            title: {
                en: "Phase 3: The Financial Gap (ROI Calculation)",
                fr: "Phase 3: L'Écart Financier (ROI)",
                es: "Fase 3: La Brecha Financiera (ROI)"
            },
            script: {
                en: "Based on these numbers, doing nothing is actually more expensive than solving the problem. Do you agree?",
                fr: "D'après ces chiffres, ne rien faire coûte plus cher que de résoudre le problème. Êtes-vous d'accord ?",
                es: "Basado en estos números, no hacer nada le cuesta más que solucionar el problema. ¿Está de acuerdo?"
            },
            questions: [
                {
                    en: "What is the financial impact of this problem?",
                    fr: "Quel est l'impact financier de ce problème ?",
                    es: "¿Cuál es el impacto financiero de este problema?"
                },
                {
                    en: "Can you afford to wait another month?",
                    fr: "Pouvez-vous vous permettre d'attendre un autre mois ?",
                    es: "¿Puede permitirse esperar otro mes?"
                }
            ]
        },
        {
            id: 4,
            title: {
                en: "Phase 4: The Value Bridge (The Pitch)",
                fr: "Phase 4: Le Pont de Valeur (Le Pitch)",
                es: "Fase 4: El Puente de Valor (El Pitch)"
            },
            script: {
                en: "Based on your pain, here is the bridge...",
                fr: "Vu vos enjeux, voici la solution stratégique...",
                es: "Basado en sus retos, este es el plan de acción..."
            },
            questions: []
        },
        {
            id: 5,
            title: {
                en: "Phase 5: The Hard Landing (The Close)",
                fr: "Phase 5: L'Atterrissage Difficile (La Conclusion)",
                es: "Fase 5: El Aterrizaje Duro (El Cierre)"
            },
            script: {
                en: "Are you ready to commit to solving this today?",
                fr: "Êtes-vous prêt à vous engager aujourd'hui ?",
                es: "¿Está listo para comprometerse hoy?"
            },
            questions: []
        }
    ],
    objections: [
        {
            id: "price",
            label: {
                en: "IT'S TOO EXPENSIVE",
                fr: "C'EST TROP CHER",
                es: "ES DEMASIADO CARO"
            },
            rebuttal: {
                en: "Expensive compared to what? The cost of doing nothing? Let's look at the ROI we just calculated.",
                fr: "Cher par rapport à quoi ? Au coût de l'inaction ? Regardons le ROI que nous venons de calculer.",
                es: "¿Caro comparado con qué? ¿Con el costo de no hacer nada? Miremos el ROI que acabamos de calcular."
            }
        },
        {
            id: "think",
            label: {
                en: "I NEED TO THINK ABOUT IT",
                fr: "JE DOIS Y RÉFLÉCHIR",
                es: "TENGO QUE PENSARLO"
            },
            rebuttal: {
                en: "That usually means 'No' or 'I don't trust you'. Which one is it? What specifically is stopping you right now?",
                fr: "Ça veut souvent dire 'Non' ou 'Je n'ai pas confiance'. C'est quoi le vrai blocage maintenant ?",
                es: "Eso suele significar 'No' o 'No confío'. ¿Cuál es? ¿Qué le detiene específicamente ahora?"
            }
        },
        {
            id: "partner",
            label: {
                en: "I NEED TO ASK MY PARTNER",
                fr: "JE DOIS PARLER À MON ASSOCIÉ",
                es: "TENGO QUE CONSULTARLO"
            },
            rebuttal: {
                en: "If your partner says 'No', what will you do? If it were 100% up to you, would we be doing this?",
                fr: "Si votre associé dit 'Non', que faites-vous ? Si ça ne dépendait que de vous, on commencerait ?",
                es: "Si su socio dice 'No', ¿qué hará? Si dependiera 100% de usted, ¿lo haríamos?"
            }
        },
        {
            id: "competitor",
            label: {
                en: "I'M LOOKING AT OTHERS",
                fr: "JE COMPARE AVEC D'AUTRES",
                es: "ESTOY VIENDO OTRAS OPCIONES"
            },
            rebuttal: {
                en: "Great. What are you looking for in them that you haven't seen here?",
                fr: "Super. Que cherchez-vous chez eux que vous n'avez pas vu ici ?",
                es: "Genial. ¿Qué busca en ellos que no haya visto aquí?"
            }
        },
        {
            id: "trust",
            label: {
                en: "I DON'T KNOW IF IT WILL WORK",
                fr: "JE NE SAIS PAS SI CA MARCHERA",
                es: "NO SÉ SI FUNCIONARÁ"
            },
            rebuttal: {
                en: "What specifically makes you doubt? Is it the process or your ability to execute?",
                fr: "Qu'est-ce qui vous fait douter ? Le processus ou votre capacité à l'exécuter ?",
                es: "¿Qué le hace dudar? ¿El proceso o su capacidad de ejecución?"
            }
        }
    ]
};
