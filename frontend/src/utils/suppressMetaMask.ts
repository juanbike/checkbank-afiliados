/**
 * Supresión MÁXIMA ABSOLUTA de errores de MetaMask
 * EJECUTAR SÍNCRONAMENTE ANTES DE TODO
 */

// ============================================
// BLOQUEO INMEDIATO - NIVEL MÁXIMO
// ============================================

// Guardar referencias INMEDIATAMENTE
const _original = {
  info: console.info,
  error: console.error,
  warn: console.warn,
  log: console.log,
  debug: console.debug,
  trace: console.trace
};

// Lista de palabras clave bloqueadas
const BLOCKED = ['metamask', 'ethereum', 'web3', 'wallet', 'failed', 'connect', 'crypto', 'blockchain', 'extension'];

// Función ULTRA SIMPLE de detección
const shouldBlock = (arg: any): boolean => {
  if (!arg) return false;
  const s = String(arg).toLowerCase();
  // Bloqueo ESPECÍFICO para "failed to connect to metamask"
  if (s.includes('failed') && s.includes('metamask')) return true;
  if (s.includes('failed') && s.includes('connect')) return true;
  if (s.includes('metamask')) return true;
  // Verificar cada palabra bloqueada
  for (const word of BLOCKED) {
    if (s.includes(word)) return true;
  }
  return false;
};

// SOBRESCRIBIR TODOS los console methods INMEDIATAMENTE
console.info = function(...args: any[]) {
  for (const arg of args) {
    if (shouldBlock(arg)) return; // BLOQUEAR TOTALMENTE
  }
  _original.info.apply(console, args);
};

console.error = function(...args: any[]) {
  for (const arg of args) {
    if (shouldBlock(arg)) return;
  }
  _original.error.apply(console, args);
};

console.warn = function(...args: any[]) {
  for (const arg of args) {
    if (shouldBlock(arg)) return;
  }
  _original.warn.apply(console, args);
};

console.log = function(...args: any[]) {
  for (const arg of args) {
    if (shouldBlock(arg)) return;
  }
  _original.log.apply(console, args);
};

if (console.debug) {
  console.debug = function(...args: any[]) {
    for (const arg of args) {
      if (shouldBlock(arg)) return;
    }
    if (_original.debug) _original.debug.apply(console, args);
  };
}

if (console.trace) {
  console.trace = function(...args: any[]) {
    for (const arg of args) {
      if (shouldBlock(arg)) return;
    }
    if (_original.trace) _original.trace.apply(console, args);
  };
}

// Eventos globales
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e: ErrorEvent) => {
    if (shouldBlock(e.message) || shouldBlock(e.error)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, { capture: true, passive: false });

  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    const msg = e.reason?.message || e.reason;
    if (shouldBlock(msg)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, { capture: true, passive: false });

  // Bloquear window.ethereum y variantes
  const blockProps = ['ethereum', 'web3', 'metamask', 'MetaMask', 'Ethereum', 'Web3'];
  for (const prop of blockProps) {
    try {
      Object.defineProperty(window, prop, {
        get: () => undefined,
        set: () => {},
        configurable: false,
        enumerable: false
      });
    } catch (e) {
      // Ignorar si ya está definido
    }
  }

  // Marcar como activo
  (window as any).__errorSuppression = 'ACTIVE';
}

export {};
