// Script de supresión global para errores de MetaMask
// Este archivo debe ejecutarse ANTES que cualquier otro código

// Guardar referencias originales
const _originalError = console.error.bind(console);
const _originalWarn = console.warn.bind(console);
const _originalInfo = console.info.bind(console);
const _originalLog = console.log.bind(console);

// Función de filtro mejorada
const _shouldSuppressMessage = (message: any): boolean => {
  if (!message) return false;
  
  const msgStr = String(message).toLowerCase();
  
  // Lista de palabras clave a suprimir
  const suppressKeywords = [
    'metamask',
    'ethereum',
    'failed to connect',
    'wallet',
    'web3',
    'injected provider',
    'connect to metamask',
    'failed to connect to metamask',
    'connection',
    'provider',
    'eth_',
    'chain'
  ];
  
  return suppressKeywords.some(keyword => msgStr.includes(keyword));
};

// Función para filtrar argumentos - verifica todos los argumentos
const _filterArgs = (...args: any[]): boolean => {
  // Revisar cada argumento
  for (const arg of args) {
    if (_shouldSuppressMessage(arg)) {
      return true;
    }
    // Si el argumento es un objeto, revisar sus propiedades
    if (typeof arg === 'object' && arg !== null) {
      try {
        const objStr = JSON.stringify(arg);
        if (_shouldSuppressMessage(objStr)) {
          return true;
        }
      } catch (e) {
        // Ignorar errores de stringify
      }
    }
  }
  return false;
};

// Sobrescribir todos los métodos de console
console.error = function(...args: any[]) {
  if (!_filterArgs(...args)) {
    _originalError(...args);
  }
};

console.warn = function(...args: any[]) {
  if (!_filterArgs(...args)) {
    _originalWarn(...args);
  }
};

console.info = function(...args: any[]) {
  if (!_filterArgs(...args)) {
    _originalInfo(...args);
  }
};

console.log = function(...args: any[]) {
  if (!_filterArgs(...args)) {
    _originalLog(...args);
  }
};

// Manejar errores globales
if (typeof window !== 'undefined') {
  // Capturar errores del window
  const _originalWindowError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (_shouldSuppressMessage(message) || _shouldSuppressMessage(error)) {
      return true; // Prevenir propagación
    }
    if (_originalWindowError) {
      return _originalWindowError.call(window, message, source, lineno, colno, error);
    }
    return false;
  };

  // Capturar eventos de error
  window.addEventListener('error', (event: ErrorEvent) => {
    if (_shouldSuppressMessage(event.message) || _shouldSuppressMessage(event.error)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);

  // Capturar promesas rechazadas
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (_shouldSuppressMessage(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);
}

// Exportar para que TypeScript no se queje
export {};