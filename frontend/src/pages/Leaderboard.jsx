import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
export function Leaderboard() {
    const navigate = useNavigate();
    const { data: players, loading, error } = useFetch('http://localhost:5000/api/users/leaderboard');
    return (
        <div style={{ padding: '2rem', maxWidth: '500px',margin: '0 auto', fontFamily: 'sans-serif',textAlign: 'center' }}>
            <h1>\ Classement Général</h1>
            <p style={{ color: '#666' }}>Les 10 meilleuresperformances de PolyQuiz</p>
            {loading && <p>Récupération des champions...</p>}
            {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
            {players && (
                <table style={{ width: '100%', borderCollapse:'collapse', margin: '2rem 0', fontSize: '1.1rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd',backgroundColor: '#f1f1f1' }}>
                            <th style={{ padding: '0.75rem' }}>Rang</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Joueur</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player._id} style={{ borderBottom: '1pxsolid #eee' }}>
                                <td style={{ padding: '0.75rem', fontWeight: 'bold'}}>{index + 1}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'left',textTransform: 'capitalize' }}>{player.pseudo}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right',fontWeight: 'bold', color: '#007bff' }}>{player.bestScore} pts</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button
                onClick={() => navigate('/')}
                style={{padding: '0.5rem 1rem', fontSize: '1rem',borderRadius: '4px',backgroundColor: '#6c757d', color: 'white',border: 'none', cursor: 'pointer'}}>
                Retour à l'accueil
            </button>
        </div>
    );
}