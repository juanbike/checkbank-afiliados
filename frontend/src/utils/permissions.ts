// Sistema de permisos por rol

export type UserRole =
  | 'MASTER / Propietario'
  | 'ADMINISTRADOR Funcional'
  | 'USUARIO Operacional (Cajero)'
  | 'affiliate';

// IDs de secciones del Módulo Administrativo
export const MODULO_ADMIN_SECTIONS = {
  // Posición consolidada
  POSICION_CONSOLIDADA: 'posicion-consolidada',
  DETALLE_RECAUDACION: 'detalle-recaudacion',

  // Contactos
  CONTACTO: 'contacto',

  // Facturación
  FACTURAS_VENTAS: 'facturas-ventas',
  FACTURAS_COMPRAS: 'facturas-compras',
  ESCANER: 'escaner',
  PRODUCTOS: 'productos',

  // Canales de recaudación
  BOTON_PAGO: 'boton-pago',
  ENLACE_PAGO: 'enlace-pago',
  VPOS: 'vpos',

  // Credicheck BNPL - Créditos
  PRE_APROBACION: 'pre-aprobacion',
  EDO_CUENTA: 'edo-cuenta',
  PAGOS_CUOTAS: 'pagos-cuotas',
  ABONOS_CUOTAS: 'abonos-cuotas',
  CANCELACION: 'cancelacion',

  // Credicheck BNPL - Cobranza
  COBRANZA_EDO_CUENTA: 'cobranza-edo-cuenta',
  GESTION_COBRANZA: 'gestion-cobranza',
  RELACION_CREDITOS: 'relacion-creditos',

  // Configuración
  DATOS_COMERCIO: 'datos-comercio',
  CONFIG_LOGO: 'config-logo',
  GENERACION_QR: 'generacion-qr',

  // Soporte
  SOPORTE_TECNICO: 'soporte-tecnico',
  BOT_IA: 'bot-ia',

  // Afiliados
  NUEVO_AFILIADO: 'nuevo-afiliado',
  LISTA_AFILIADOS: 'lista-afiliados'
} as const;

// IDs de secciones del Panel Administrativo
export const PANEL_ADMIN_SECTIONS = {
  // Credenciales
  PERFILES_ROLES: 'perfiles-roles',
  USUARIOS_LISTA: 'usuarios-lista',
  SESIONES_ACTIVAS: 'sesiones-activas',

  // Parametría
  SUCURSALES: 'sucursales',
  GESTION_CONTACTOS: 'gestion-contactos',

  // Integraciones
  INTEGRACION_BOTON: 'integracion-boton',

  // Consultas
  CONSULTAS_GENERAL: 'consultas-general',

  // Fidelización
  PLANES_GENERICOS: 'planes-genericos',
  PLANES_PERSONALIZADOS: 'planes-personalizados',
  PROMOCIONES: 'promociones',

  // BNPL - Créditos
  FINANCIAMIENTO_PRODUCTOS: 'financiamiento-productos',

  // Detección fraude
  TRANSACCIONES_DUDOSAS: 'transacciones-dudosas'
} as const;

// Permisos para cada rol en Módulo Administrativo
export const MODULO_ADMIN_PERMISSIONS: Record<UserRole, string[]> = {
  'MASTER / Propietario': [
    // Acceso total a todas las secciones
    MODULO_ADMIN_SECTIONS.POSICION_CONSOLIDADA,
    MODULO_ADMIN_SECTIONS.DETALLE_RECAUDACION,
    MODULO_ADMIN_SECTIONS.CONTACTO,
    MODULO_ADMIN_SECTIONS.FACTURAS_VENTAS,
    MODULO_ADMIN_SECTIONS.FACTURAS_COMPRAS,
    MODULO_ADMIN_SECTIONS.ESCANER,
    MODULO_ADMIN_SECTIONS.PRODUCTOS,
    MODULO_ADMIN_SECTIONS.BOTON_PAGO,
    MODULO_ADMIN_SECTIONS.ENLACE_PAGO,
    MODULO_ADMIN_SECTIONS.VPOS,
    MODULO_ADMIN_SECTIONS.PRE_APROBACION,
    MODULO_ADMIN_SECTIONS.EDO_CUENTA,
    MODULO_ADMIN_SECTIONS.PAGOS_CUOTAS,
    MODULO_ADMIN_SECTIONS.ABONOS_CUOTAS,
    MODULO_ADMIN_SECTIONS.CANCELACION,
    MODULO_ADMIN_SECTIONS.COBRANZA_EDO_CUENTA,
    MODULO_ADMIN_SECTIONS.GESTION_COBRANZA,
    MODULO_ADMIN_SECTIONS.RELACION_CREDITOS,
    MODULO_ADMIN_SECTIONS.DATOS_COMERCIO,
    MODULO_ADMIN_SECTIONS.CONFIG_LOGO,
    MODULO_ADMIN_SECTIONS.GENERACION_QR,
    MODULO_ADMIN_SECTIONS.SOPORTE_TECNICO,
    MODULO_ADMIN_SECTIONS.BOT_IA,
    MODULO_ADMIN_SECTIONS.NUEVO_AFILIADO,
    MODULO_ADMIN_SECTIONS.LISTA_AFILIADOS
  ],

  'ADMINISTRADOR Funcional': [
    // Acceso a operaciones administrativas, sin configuración del comercio
    MODULO_ADMIN_SECTIONS.POSICION_CONSOLIDADA,
    MODULO_ADMIN_SECTIONS.DETALLE_RECAUDACION,
    MODULO_ADMIN_SECTIONS.CONTACTO,
    MODULO_ADMIN_SECTIONS.FACTURAS_VENTAS,
    MODULO_ADMIN_SECTIONS.FACTURAS_COMPRAS,
    MODULO_ADMIN_SECTIONS.ESCANER,
    MODULO_ADMIN_SECTIONS.PRODUCTOS,
    MODULO_ADMIN_SECTIONS.BOTON_PAGO,
    MODULO_ADMIN_SECTIONS.ENLACE_PAGO,
    MODULO_ADMIN_SECTIONS.VPOS,
    MODULO_ADMIN_SECTIONS.PRE_APROBACION,
    MODULO_ADMIN_SECTIONS.EDO_CUENTA,
    MODULO_ADMIN_SECTIONS.PAGOS_CUOTAS,
    MODULO_ADMIN_SECTIONS.ABONOS_CUOTAS,
    MODULO_ADMIN_SECTIONS.CANCELACION,
    MODULO_ADMIN_SECTIONS.COBRANZA_EDO_CUENTA,
    MODULO_ADMIN_SECTIONS.GESTION_COBRANZA,
    MODULO_ADMIN_SECTIONS.RELACION_CREDITOS,
    MODULO_ADMIN_SECTIONS.GENERACION_QR,
    MODULO_ADMIN_SECTIONS.SOPORTE_TECNICO,
    MODULO_ADMIN_SECTIONS.BOT_IA,
    MODULO_ADMIN_SECTIONS.NUEVO_AFILIADO,
    MODULO_ADMIN_SECTIONS.LISTA_AFILIADOS
  ],

  'USUARIO Operacional (Cajero)': [
    // Acceso limitado solo a operaciones básicas
    MODULO_ADMIN_SECTIONS.POSICION_CONSOLIDADA,
    MODULO_ADMIN_SECTIONS.DETALLE_RECAUDACION,
    MODULO_ADMIN_SECTIONS.FACTURAS_VENTAS,
    MODULO_ADMIN_SECTIONS.ESCANER,
    MODULO_ADMIN_SECTIONS.BOTON_PAGO,
    MODULO_ADMIN_SECTIONS.ENLACE_PAGO,
    MODULO_ADMIN_SECTIONS.VPOS,
    MODULO_ADMIN_SECTIONS.PAGOS_CUOTAS,
    MODULO_ADMIN_SECTIONS.SOPORTE_TECNICO,
    MODULO_ADMIN_SECTIONS.BOT_IA
  ],
  'affiliate': [
    MODULO_ADMIN_SECTIONS.POSICION_CONSOLIDADA,
    MODULO_ADMIN_SECTIONS.DATOS_COMERCIO,
    MODULO_ADMIN_SECTIONS.SOPORTE_TECNICO,
    MODULO_ADMIN_SECTIONS.BOT_IA
  ]
};

// Permisos para cada rol en Panel Administrativo
export const PANEL_ADMIN_PERMISSIONS: Record<UserRole, string[]> = {
  'MASTER / Propietario': [
    // Acceso total al panel administrativo
    PANEL_ADMIN_SECTIONS.PERFILES_ROLES,
    PANEL_ADMIN_SECTIONS.USUARIOS_LISTA,
    PANEL_ADMIN_SECTIONS.SESIONES_ACTIVAS,
    PANEL_ADMIN_SECTIONS.SUCURSALES,
    PANEL_ADMIN_SECTIONS.GESTION_CONTACTOS,
    PANEL_ADMIN_SECTIONS.INTEGRACION_BOTON,
    PANEL_ADMIN_SECTIONS.CONSULTAS_GENERAL,
    PANEL_ADMIN_SECTIONS.PLANES_GENERICOS,
    PANEL_ADMIN_SECTIONS.PLANES_PERSONALIZADOS,
    PANEL_ADMIN_SECTIONS.PROMOCIONES,
    PANEL_ADMIN_SECTIONS.FINANCIAMIENTO_PRODUCTOS,
    PANEL_ADMIN_SECTIONS.TRANSACCIONES_DUDOSAS
  ],

  'ADMINISTRADOR Funcional': [
    // Acceso limitado al panel, sin gestión de usuarios ni roles
    PANEL_ADMIN_SECTIONS.SESIONES_ACTIVAS,
    PANEL_ADMIN_SECTIONS.SUCURSALES,
    PANEL_ADMIN_SECTIONS.GESTION_CONTACTOS,
    PANEL_ADMIN_SECTIONS.INTEGRACION_BOTON,
    PANEL_ADMIN_SECTIONS.CONSULTAS_GENERAL,
    PANEL_ADMIN_SECTIONS.PLANES_GENERICOS,
    PANEL_ADMIN_SECTIONS.PLANES_PERSONALIZADOS,
    PANEL_ADMIN_SECTIONS.PROMOCIONES,
    PANEL_ADMIN_SECTIONS.FINANCIAMIENTO_PRODUCTOS,
    PANEL_ADMIN_SECTIONS.TRANSACCIONES_DUDOSAS
  ],

  'USUARIO Operacional (Cajero)': [
    // Sin acceso al panel administrativo
  ],
  'affiliate': []
};

/**
 * Verifica si un usuario tiene permiso para acceder a una sección
 */
export function hasPermission(rol: string | null, sectionId: string, isPanel: boolean = false): boolean {
  if (!rol) {
    console.log('❌ No hay rol definido');
    return false;
  }

  const permissions = isPanel ? PANEL_ADMIN_PERMISSIONS : MODULO_ADMIN_PERMISSIONS;
  const userPermissions = permissions[rol as UserRole];

  const hasAccess = userPermissions?.includes(sectionId) || false;

  // Debug log
  console.log(`🔍 Verificando permiso: rol="${rol}", sección="${sectionId}", isPanel=${isPanel}, acceso=${hasAccess}`);

  return hasAccess;
}

/**
 * Filtra las secciones del menú según los permisos del usuario
 */
export function filterMenuSections<T extends { id: string; items: Array<{ id: string; subItems?: Array<{ id: string }> }> }>(
  sections: T[],
  rol: string | null,
  isPanel: boolean = false
): T[] {
  if (!rol) {
    console.log('❌ filterMenuSections: No hay rol definido');
    return [];
  }

  console.log(`🔐 Filtrando menú para rol: "${rol}", isPanel: ${isPanel}`);

  return sections
    .map(section => {
      // Filtrar items de la sección
      const filteredItems = section.items
        .map(item => {
          // Si tiene subItems, filtrarlos
          if (item.subItems) {
            const filteredSubItems = item.subItems.filter(subItem =>
              hasPermission(rol, subItem.id, isPanel)
            );

            // Solo incluir el item si tiene al menos un subItem permitido
            if (filteredSubItems.length > 0) {
              return { ...item, subItems: filteredSubItems };
            }
            return null;
          }

          // Item sin subItems, verificar permiso directo
          if (hasPermission(rol, item.id, isPanel)) {
            return item;
          }
          return null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      // Solo incluir la sección si tiene items permitidos
      if (filteredItems.length > 0) {
        return { ...section, items: filteredItems };
      }
      return null;
    })
    .filter((section): section is T => section !== null);
}