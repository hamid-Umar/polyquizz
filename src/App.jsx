import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route,
useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserContext } from './context/UserContext';
import {QuizEngine} from './pages/QuizEngine';
import{Resultats} from './pages/Resultats'; 
//==========================================
// 1. PAGE D'ACCUEIL / LOGIN//==========================================
function Login() {
const [inputValue, setInputValue] = useState('');
const { setPseudo } = useContext(UserContext);
const navigate = useNavigate();const handleSubmit = (e) => {
e.preventDefault();
if (inputValue.trim() === '') return; // Évite les pseudos vides
setPseudo(inputValue);// Stockage dans le contexte globalspan_0
navigate('/quiz'); // Redirection automatique vers le quiz
};
return (
<div style={{ padding: '2rem', textAlign: 'center',
fontFamily: 'sans-serif' }}>
<h1>PolyQuiz d V Z</h1>
<p>Entrez votre pseudonyme pour commencer
la compétition</p>
<form onSubmit={handleSubmit} style={{
marginTop: '1.5rem' }}><input
type="text"
placeholder="Votre pseudo..."
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
style={{
padding: '0.5rem 1rem',
fontSize: '1rem',
borderRadius: '4px',
border: '1px solid #ccc',
marginRight: '0.5rem'
}}
/>
<button
type="submit"
style={{
padding: '0.5rem 1rem',
fontSize: '1rem',
borderRadius: '4px',
backgroundColor: '#007bff',color: 'white',
border: 'none',
cursor: 'pointer'
}}
>
Rejoindre le Quiz
</button>
</form>
</div>
);
}


export default function App() {
return (<BrowserRouter>
<Routes>
{/* Route publique */}
<Route path="/" element={<Login />} />
span_1{/* Routes sécuriséesspan_1 */}
<Route element={<ProtectedRoute />}>
<Route path="/quiz" element={<QuizEngine />} />
<Route path="/resultats" element={<Resultats />} />
</Route>
</Routes>
</BrowserRouter>
);
}