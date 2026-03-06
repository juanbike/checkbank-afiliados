const API_URL = 'https://tecnofix.consulbank.com.ve/api';

export const initAffiliate = async (data: any) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al iniciar la afiliación');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in initAffiliate:', error);
        throw error;
    }
};

export const activateAffiliate = async (data: any) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/activate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al activar la afiliación');
        return await response.json();
    } catch (error) {
        console.error('Error in activateAffiliate:', error);
        throw error;
    }
};

export const saveAffiliate = async (data: any) => {
    // Mantener por compatibilidad si es necesario, pero redirigir a init
    return initAffiliate(data);
};

export const fetchAffiliates = async () => {
    try {
        const response = await fetch(`${API_URL}/affiliates`);
        if (!response.ok) throw new Error('Error al obtener afiliados');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchAffiliates:', error);
        throw error;
    }
};

export const loginUser = async (credentials: { username: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la autenticación');
            } else {
                const errorText = await response.text();
                throw new Error(`Error del servidor (${response.status}): ${errorText.substring(0, 100)}`);
            }
        }

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            throw new Error("El servidor no devolvió una respuesta JSON válida");
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
};
