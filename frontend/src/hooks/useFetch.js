// frontend/src/hooks/useFetch.js
import { useState, useEffect } from 'react';
export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
// Configuration dynamique des headers pour inclure le Token JWT
                const options = {
                    headers: {}
                };      
                const token = localStorage.getItem('token');
                if (token) {
                    options.headers['Authorization'] = `Bearer ${token}`; // Injection automatique
                }
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error("Erreur réseau ou accès refusé");
                }
                const result = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {setError(err.message);}
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
             }
        };
        fetchData();
        return () => {
            isMounted = false; // Nettoyage de sécuritécontre le démontage
        };
    } , [url]);
    return { data, loading, error };
}