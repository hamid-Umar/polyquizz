import { useReducer, useEffect, useContext,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/UserContext';
const initialState = {
    currentQuestionIndex: 0,
    scoreTemporaire: 0,
    quizFinished: false,
    tempsRestant: 60,
};
function quizReducer(state, action) {
    switch (action.type) {
        case 'START_QUIZ':
            return initialState;case 'ANSWER_QUESTION':
            const { isCorrect } = action.payload;
            const nextIndex = state.currentQuestionIndex +1;
            const newScore = isCorrect ?state.scoreTemporaire + 1 :state.scoreTemporaire;
            return {
                ...state,
                currentQuestionIndex: nextIndex,
                scoreTemporaire: newScore,
            };
        case 'TICK':
            if (state.tempsRestant <= 1) {
                return { ...state, tempsRestant: 0, quizFinished:true };
            }
            return { ...state, tempsRestant:state.tempsRestant - 1 };
        case 'FINISH_QUIZ':
            return { ...state, quizFinished: true };
        default:return state;
    } 
}
export function QuizEngine() {
    const { data: questions, loading, error } =useFetch('http://localhost:5000/api/questions');
    const [state, dispatch] =useReducer(quizReducer, initialState);
    const { setScore } = useContext(UserContext);
    const navigate = useNavigate();
    const timerRef = useRef(null);
    // ÉTAT LOCAL SUPPLÉMENTAIRE POUR LEVISUEL (Jalon 5 - UI Extension)
    const [selectedOption, setSelectedOption] =useState(null);
    const [hasAnswered, setHasAnswered] =useState(false);
    useEffect(() => {
        timerRef.current = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 1000);
        return () => {
            if (timerRef.current)
            clearInterval(timerRef.current);
        };
    }, []);
    useEffect(() => {
        const questionsFinies = questions &&state.currentQuestionIndex >= questions.length;if (state.quizFinished || questionsFinies) {
            if (timerRef.current)clearInterval(timerRef.current);
            setScore(state.scoreTemporaire);
            navigate('/resultats');
        }
    }, 
    [state.quizFinished,state.currentQuestionIndex, questions,state.scoreTemporaire, setScore, navigate]);
    if (loading) return <h3 style={{ textAlign: 'center',marginTop: '2rem' }}>Chargement des questionsde l'API...</h3>;
    if (error) return <h3 style={{ textAlign: 'center',color: 'red' }}>Erreur : {error}</h3>;
    if (!questions || questions.length === 0) return null;
    if (state.currentQuestionIndex >=questions.length) return null;
    const currentQuestion =questions[state.currentQuestionIndex];
    const handleAnswerClick = (option) => {
        if (hasAnswered) return; // Empêche de cliquer plusieurs fois pendant l'animation
        setSelectedOption(option);
        setHasAnswered(true);
        const isCorrect = option ===currentQuestion.correctAnswer;
        // On laisse le visuel affiché pendant 1,2seconde (1200ms) avant de valider et passer à la suite
        setTimeout(() => {
            dispatch({ type: 'ANSWER_QUESTION', payload: {isCorrect } });// Réinitialisation des états visuels pour la question suivante
            setSelectedOption(null);
            setHasAnswered(false);
        }, 1200);
    };
    // Fonction utilitaire pour déterminer le style entemps réel de chaque bouton
    const getButtonStyle = (option) => {
        const baseStyle = {
            padding: '1rem',
            fontSize: '1rem',
            textAlign: 'left',
            borderRadius: '6px',
            border: '1px solid #ddd',
            backgroundColor: '#f8f9fa',
            cursor: hasAnswered ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease, color0.3s ease, border-color 0.3s ease',color: 'black',
            fontWeight: 'normal'
        };  
        // Si l'utilisateur n'a pas encore répondu, onapplique le style normal
        if (!hasAnswered) return baseStyle;
        // Si on est en train d'afficher la correction :
        if (option === currentQuestion.correctAnswer) {
            // La bonne réponse devient TOUJOURS verte
            baseStyle.backgroundColor = '#d4edda';
            baseStyle.borderColor = '#c3e6cb';
            baseStyle.color = '#155724';
            baseStyle.fontWeight = 'bold';
        } else if (option === selectedOption) {
            // Si c'est l'option sélectionnée par l'utilisateur et qu'elle n'est pas la bonne, elle devient rouge
            baseStyle.backgroundColor = '#f8d7da';
            baseStyle.borderColor = '#f5c6cb';baseStyle.color = '#721c24';  
        }
        return baseStyle;
    };
    return (
        <div style={{ padding: '2rem', maxWidth: '600px',margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'spacebetween', marginBottom: '1rem' }}>
                <span>Catégorie :<strong>{currentQuestion.category}</strong></span>
                <span style={{ color: state.tempsRestant < 15 ?'red' : 'black', fontWeight: 'bold' }}>, {state.tempsRestant}s</span>
            </div>
            <h2 style={{ marginBottom: '1.5rem' }}>{currentQuestion.text}</h2>
            <div style={{ display: 'flex', flexDirection: 'column',gap: '0.75rem' }}>
                {currentQuestion.options.map((option, index) =>
                    (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        disabled={hasAnswered} // Désactive le bouton dès qu'un choix est fait
                        style={getButtonStyle(option)} // Styledynamique calculé
                    >
                    {option}
                    </button>
                ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign:'center', color: '#666' }}>Score actuel : {state.scoreTemporaire} pts</div>
        </div>
    );
}