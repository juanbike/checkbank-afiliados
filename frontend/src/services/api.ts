import { logFrontendError } from '../utils/logger';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal
    ? 'http://localhost:3001/api'
    : 'https://tecnofix.consulbank.com.ve/api';

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
        logFrontendError(error, 'api:initAffiliate');
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
        logFrontendError(error, 'api:activateAffiliate');
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
        logFrontendError(error, 'api:fetchAffiliates');
        throw error;
    }
};

export const updateAffiliatePlan = async (data: { plan: string, period: string }, token: string) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/update-plan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al actualizar el plan');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:updateAffiliatePlan');
        throw error;
    }
};

export const getAffiliateProfile = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Error al obtener perfil');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:getAffiliateProfile');
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
        logFrontendError(error, 'api:loginUser');
        throw error;
    }
};

export const updateAffiliateGeneral = async (id: string, data: any) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al actualizar el afiliado');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:updateAffiliateGeneral');
        throw error;
    }
};

export const deleteAffiliate = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar el afiliado');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:deleteAffiliate');
        throw error;
    }
};

export const getAffiliateById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/affiliates/${id}`);
        if (!response.ok) throw new Error('Error al obtener el afiliado');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:getAffiliateById');
        throw error;
    }
};

export const fetchErrorLogs = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/logs/errors`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al obtener logs de errores');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:fetchErrorLogs');
        throw error;
    }
};

export const clearErrorLogs = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/logs/errors`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al vaciar logs de errores');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:clearErrorLogs');
        throw error;
    }
};

export const fetchActivityLogs = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/logs`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al obtener el historial de actividad');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:fetchActivityLogs');
        throw error;
    }
};
export const fetchPaymentStats = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/payments/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al obtener estadísticas de pagos');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:fetchPaymentStats');
        throw error;
    }
};

export const fetchAllPayments = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/payments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al obtener historial de pagos');
        return await response.json();
    } catch (error) {
        logFrontendError(error, 'api:fetchAllPayments');
        throw error;
    }
};
