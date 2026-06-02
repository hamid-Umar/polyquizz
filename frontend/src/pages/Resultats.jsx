import { useContext, useMemo, useEffect } from'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
export function Resultats() {
    const { pseudo, score } =useContext(UserContext);
    const navigate = useNavigate();
    const totalQuestions = 10;
    // Envoi automatique du score au serveur au chargement de l'écran final
    useEffect(() => {
        const pushScoreToDatabase = async () => {
            try {
                const token = localStorage.getItem('token');
                await fetch('http://localhost:5000/api/users/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Transmissionsécurisée
                    },
                    body: JSON.stringify({ score: score })
                }); 
            } catch (error) {
                console.error("Échec de la sauvegarde du score:", error);
            }
        };
        if (score !== undefined) {pushScoreToDatabase();}
    }, [score]);
    const ratioSelection = useMemo(() => {
        if (totalQuestions === 0) return 0;
        return (score / totalQuestions) * 100;
    }, [score, totalQuestions]);
    const handleRestart = () => {
        navigate('/quiz'); // Relance la partie sans détruire la session JWT
    };
    return (
        <div style={{ padding: '2rem', textAlign: 'center',fontFamily: 'sans-serif' }}>
            <h1>\ Fin de la partie !</h1>
            <h2>Félicitations, {pseudo} !</h2>
            <div style={{ margin: '2rem 0', fontSize: '1.25rem'}}>
                <p>Votre score final : <strong>{score} /{totalQuestions}</strong></p>
                <p>Taux de réussite :<strong>{ratioSelection.toFixed(1)}%</strong></p>
            </div>
            <div style={{ display: 'flex', gap: '1rem',justifyContent: 'center' }}>
                <button
                    onClick={handleRestart}
                    style={{padding: '0.75rem 1.5rem', fontSize: '1rem',borderRadius: '4px',backgroundColor: '#28a745', color: 'white',border: 'none', cursor: 'pointer'}}>
                    Recommencer un Quiz
                </button>
                <button
                    onClick={() => navigate('/leaderboard')}
                    style={{padding: '0.75rem 1.5rem', fontSize: '1rem',borderRadius: '4px',backgroundColor: '#ffc107', color: 'black', border:'none', cursor: 'pointer', fontWeight: 'bold'}}>
                    Voir le Leaderboard \
                </button>
            </div>
        </div>
    );
}