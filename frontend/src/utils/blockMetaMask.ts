// ============================================
// BLOQUEO TOTAL DE METAMASK - EJECUCIÓN INMEDIATA
// ============================================

// Guardar originales PRIMERO
const __console = {
  i: console.info,
  e: console.error,
  w: console.warn,
  l: console.log
};

// Palabras bloqueadas
const B = ['metamask', 'ethereum', 'web3', 'wallet', 'failed', 'connect'];

// Verificar si debe bloquearse (ULTRA SIMPLE Y RÁPIDO)
const blocked = (x: any) => {
  if (!x) return false;
  const s = String(x).toLowerCase();
  return B.some(w => s.includes(w));
};

// SOBRESCRIBIR console INMEDIATAMENTE
console.info = (...a: any[]) => { if (!a.some(blocked)) __console.i(...a); };
console.error = (...a: any[]) => { if (!a.some(blocked)) __console.e(...a); };
console.warn = (...a: any[]) => { if (!a.some(blocked)) __console.w(...a); };
console.log = (...a: any[]) => { if (!a.some(blocked)) __console.l(...a); };

// Exportar para forzar ejecución
export const METAMASK_BLOCKED = true;
