// frontend/src/App.jsx
import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserContext } from './context/UserContext';
import { QuizEngine } from './pages/QuizEngine';
import { Resultats } from './pages/Resultats';
import { Leaderboard } from './pages/Leaderboard'; 

// 1. COMPOSANT LOGIN (Page d'accueilmodifiée avec API)

function Login() {
    const [inputValue, setInputValue] = useState('');
    const [apiError, setApiError] = useState(null);
    const { setPseudo } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        setApiError(null);
        try {
    // Émission de la requête d'authentification versl'API
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ pseudo: inputValue })
        });
        if (!response.ok) {
            throw new Error("Impossible de s'authentifier auprès du serveur.");
        }
        const data = await response.json();
    // Sauvegarde des credentials dans le navigateur
        localStorage.setItem('token', data.token); //Enregistrement du JWT
        localStorage.setItem('pseudo', data.user.pseudo);
    // Hydratation du contexte global React
        setPseudo(data.user.pseudo);
    // Passage au jeu
        navigate('/quiz');} catch (err) {
            setApiError(err.message || "Le serveur backendn'est pas accessible.");
        }
    };
    return (
        <div style={{ padding: '2rem', textAlign: 'center',fontFamily: 'sans-serif' }}>
            <h1>PolyQuiz d</h1>
            <p>Entrez votre pseudonyme pour commencerla compétition</p>
            <form onSubmit={handleSubmit} style={{marginTop: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Votre pseudo..."
                    value={inputValue}onChange={(e) => setInputValue(e.target.value)}
                    style={{ padding: '0.5rem 1rem', fontSize: '1rem',borderRadius: '4px', border: '1px solid #ccc',marginRight: '0.5rem' }}/>
                <button type="submit" style={{ padding: '0.5rem1rem', fontSize: '1rem', borderRadius: '4px',backgroundColor: '#007bff', color: 'white', border:'none', cursor: 'pointer' }}>
                    Rejoindre le Quiz
                </button>
            </form>
            {apiError && <p style={{ color: 'red', marginTop:'1rem', fontWeight: 'bold' }}>Ô {apiError}</p>}
        </div>
    );
}

// 2. ROUTAGE GLOBAL SÉCURISÉ &LEADERBOARD

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/quiz" element={<QuizEngine />} />
                <Route path="/resultats" element={<Resultats />} />
                <Route path="/leaderboard"element={<Leaderboard />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    );
}