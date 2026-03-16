const LOG_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api/logs'
    : 'https://tecnofix.consulbank.com.ve/api/logs';

export const logFrontendError = async (error: any, context: string = 'Frontend UI') => {
    const errorData = {
        error: error instanceof Error ? error.message : String(error),
        context: context,
        metadata: {
            stack: error instanceof Error ? error.stack : null,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        }
    };

    try {
        // Enviar al backend de forma asíncrona sin bloquear la UI
        fetch(LOG_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errorData),
        }).catch(err => console.error('Silent failure while logging to server:', err));

        // También mostrarlo en consola para desarrollo
        console.error(`[LOGGED ERROR] ${context}:`, error);
    } catch (e) {
        // Falla silenciosa si no se puede enviar el log
    }
};
