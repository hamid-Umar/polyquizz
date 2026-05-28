import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
export function Resultats() {
const { pseudo, score } =useContext(UserContext);
const navigate = useNavigate();
const totalQuestions = 10; // Notre fichier jsoncontient 10 questions

const ratioSelection = useMemo(() => {
if (totalQuestions === 0) return 0;
return (score / totalQuestions) * 100;
}, [score, totalQuestions]);
const handleRestart = () => {window.location.href = '/';
};
return (
    <div style={{ padding: '2rem', textAlign: 'center',fontFamily: 'sans-serif' }}>
        <h1>\ Fin de la partie !</h1>
        <h2>Félicitations, {pseudo} !</h2>
        <div style={{ margin: '2rem 0', fontSize: '1.25rem'}}>
            <p>Votre score final : <strong>{score} /{totalQuestions}</strong></p>
            <p>Taux de réussite :<strong>{ratioSelection.toFixed(1)}%</strong></p>
</div><button
onClick={handleRestart}
style={{
padding: '0.75rem 1.5rem', fontSize: '1rem',
borderRadius: '4px',
backgroundColor: '#28a745', color: 'white',
border: 'none', cursor: 'pointer'
}}
>
Recommencer un Quiz
</button>
</div>
);
}