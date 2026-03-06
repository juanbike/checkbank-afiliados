# Directiva: Datos de Prueba para Afiliados

## Objetivo
Proporcionar conjuntos de datos realistas para probar los flujos de afiliación de los 5 tipos de clientes soportados por la plataforma.

---

## 1. Persona Natural
*Para individuos que desean usar la plataforma a título personal.*

| Paso | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Bienvenida** | Nombre de Usuario | `juan_natural` |
| | Contraseña | `Pass1234!` |
| | Tipo de Documento | `V` |
| | Número de Documento | `12345678` |
| | Nombres | `Juan Carlos` |
| | Apellidos | `Pérez Rojas` |
| | Teléfono | `+58 414 1112233` |
| | Correo Electrónico | `juan.perez@test.com` |
| **Datos Cliente** | Fecha Nacimiento | `1990-05-15` |
| | Género | `Masculino` |
| | Profesión | `Ingeniero de Sistemas` |
| | Dirección | `Calle Bolívar, Edif. Central, Apto 4B` |
| | Ubicación | `Distrito Capital / Caracas / Libertador / El Valle` |
| | Cód. Postal | `1010` |

---

## 2. Persona Jurídica
*Para empresas registradas (C.A., S.A., etc).*

| Paso | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Bienvenida** | Nombre de Usuario | `empresa_abc` |
| | Contraseña | `Corp7788!` |
| | Tipo de Documento | `J` |
| | Número de Documento | `123456789` |
| | Razón Social | `Inversiones ABC C.A.` |
| | Teléfono | `+58 424 5556677` |
| | Correo Electrónico | `info@empresaec.com` |
| **Datos Cliente** | Domicilio Fiscal | `Zona Industrial de Valencia, Galpón 4A` |
| | Representante | `María López` |
| | Cédula Rep. | `V-87654321` |
| | Ubicación | `Carabobo / Valencia / Valencia / San José` |
| | Cód. Postal | `2001` |

---

## 3. Firma Personal
*Para profesionales independientes registrados como firma personal.*

| Paso | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Bienvenida** | Nombre de Usuario | `pedro_mecanico` |
| | Contraseña | `Mecanico123#` |
| | Tipo de Documento | `V` |
| | Número de Documento | `99887766` |
| | Nombre de la Firma | `Pedro Mecánica F.P.` |
| | Nombre del Titular | `Pedro José Méndez` |
| | Teléfono | `+58 412 8889900` |
| | Correo Electrónico | `pedromecanica@correo.ve` |
| **Datos Cliente** | Actividad Comercial | `Reparación de Motores Diesel` |
| | Ubicación | `Miranda / Los Teques / Guaicaipuro / San Pedro` |
| | Cód. Postal | `1201` |

---

## 4. Emprendedor
*Para proyectos o startups en etapa inicial.*

| Paso | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Bienvenida** | Nombre de Usuario | `laura_startup` |
| | Contraseña | `Startup2026!` |
| | Tipo de Documento | `V` |
| | Número de Documento | `22334455` |
| | Nombres | `Laura Sofía` |
| | Apellidos | `Méndez Durán` |
| | Teléfono | `+58 416 4443322` |
| | Correo Electrónico | `laura.startup@digital.com` |
| **Datos Cliente** | Proyecto | `App de Comida Saludable (YummyFit)` |
| | Descripción | `Plataforma para conectar productores orgánicos con consumidores.` |
| | Ubicación | `Lara / Barquisimeto / Iribarren / Santa Rosa` |
| | Cód. Postal | `3001` |

---

## 5. Ente Gubernamental
*Para instituciones públicas y ministerios.*

| Paso | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Bienvenida** | Nombre de Usuario | `gob_miranda` |
| | Contraseña | `GobMiranda2026$` |
| | Tipo de Documento | `G` |
| | Número de Documento | `334455667` |
| | Institución | `Gobernación del Estado Miranda` |
| | Teléfono | `+58 426 2221100` |
| | Correo Electrónico | `sistemas@miranda.gob.ve` |
| **Datos Cliente** | Dirección Admin. | `Av. Independencia, Palacio de Gobierno` |
| | Contacto | `Roberto Carlos Gil` |
| | Cargo | `Director de TI` |
| | Ref. Contrato | `G-2026-MIR-001` |

---

## 6. Datos de Prueba para el Pago (Paso Final)
*Para completar el formulario de confirmación y procesar la suscripción.*

### Opción A: Pago Móvil (Bancos Nacionales)
| Campo | Valor de Prueba |
| :--- | :--- |
| **Código de Móvil** | `414` |
| **Número de Teléfono** | `1112233` |
| **Tipo de Documento** | `V` |
| **Número de Documento** | `12345678` |
| **Nombre Titular** | `Juan Carlos Pérez Rojas` |
| **Fecha de Pago** | *Seleccionar fecha de hoy* |
| **Monto Pagado** | *Debe coincidir con el monto en Bs mostrado* |
| **Referencia** | `987654321` |
| **Banco Pagador** | `Banco de Venezuela (0102)` |

### Opción B: Zelle (Medios Digitales)
| Campo | Valor de Prueba |
| :--- | :--- |
| **Nombre Titular** | `Juan Pérez` |
| **Email Pagador** | `juan.perez@test.com` |
| **Fecha de Pago** | *Seleccionar fecha de hoy* |
| **Monto Pagado** | *Debe coincidir con el total en USD (incluyendo IGTF)* |
| **Referencia** | `Z-CONF-12345` |

---

---

## 7. Lote 2 (Nuevos datos para evitar duplicados)
*Usa estos datos si ya procesaste los del Lote 1.*

### 2.1 Persona Natural (Batch 2)
- **Usuario:** `ana_natural`
- **Correo:** `ana.gomez@mail.com`
- **Cédula:** `V-22222222`
- **Nombres:** `Ana Isabel` | **Apellidos:** `Gómez Salas`
- **Referencia Pago:** `REF777001`

### 2.2 Persona Jurídica (Batch 2)
- **Usuario:** `tecnologia_xyz`
- **Correo:** `ventas@tecnoxyz.ve`
- **RIF:** `J-999888777`
- **Razón Social:** `Tecnología XYZ C.A.`
- **Referencia Pago:** `REF777002`

### 2.3 Firma Personal (Batch 2)
- **Usuario:** `luis_diseño`
- **Correo:** `luis.arts@creative.com`
- **RIF:** `V-55544433`
- **Nombre Firma:** `Luis Diseño Creativo F.P.`
- **Referencia Pago:** `REF777003`

### 2.4 Emprendedor (Batch 2)
- **Usuario:** `eco_market`
- **Correo:** `contacto@ecomarket.ve`
- **Cédula:** `V-33322211`
- **Proyecto:** `Eco Market Digital`
- **Referencia Pago:** `REF777004`

### 2.5 Ente Gubernamental (Batch 2)
- **Usuario:** `ministerio_salud`
- **Correo:** `informatica@mppps.gob.ve`
- **RIF:** `G-444555666`
- **Institución:** `M.P.P. para la Salud`
- **Referencia Pago:** `REF777005`

### 2.6 Datos del Pagador para Lote 2
| Medio | Campo | Valor de Prueba |
| :--- | :--- | :--- |
| **Pago Móvil** | Código Celular | `424` |
| | Teléfono | `2223344` |
| | Documento | `V-22222222` |
| | Titular | `Ana Isabel Gómez Salas` |
| | Banco | `Banco Mercantil (0105)` |
| **Zelle** | Titular | `Ana Gómez` |
| | Correo | `ana.gomez@mail.com` |

---

## 8. Datos del Comercio (Lote 2)
*Para el paso de "Info Comercio" en el wizard de activación.*

| Campo | Valor de Prueba |
| :--- | :--- |
| **Dirección Calle** | `Av. Las Américas, Sector El Campito` |
| **Número/Local** | `Edif. Plaza, Nivel PB, Local 3` |
| **Ubicación (Estado/Ciudad)** | `Mérida / Mérida` |
| **Municipio / Parroquia** | `Libertador / Sagrario` |
| **Código Postal** | `5101` |
| **Teléfono Comercio** | `0274-2521122` |
| **Email Administrativo** | `admin.merida@test.com` |
| **Sitio Web** | `https://www.meridatech.com.ve` |
| **Descripción Negocio** | `Distribución de equipos tecnológicos y servicios de soporte.` |
| **Canales de Venta** | `Tienda Física`, `E-commerce` (Marcar ambos) |
| **Actividad Económica** | `Tecnología e informática` |
| **Fuente de Ingresos** | `Venta de productos y servicios profesionales` |
| **Volumen Ventas** | `$5,000 - $10,000 USD` |
| **Países de Venta** | `Venezuela` (Marcar en la lista) |

---

## Notas Adicionales
- Todas las contraseñas cumplen con el requisito de: 8+ caracteres, Mayúscula, Minúscula y Número (Ej: `Prueba2026!`).
- Los teléfonos usan el código de país `+58` y operadoras reales de Venezuela (`414`, `424`, `412`, `416`, `426`).
- Las ubicaciones coinciden con el árbol de datos definido en `client-data-form.tsx`.
- **Importante:** En el paso final de pago, el sistema valida que el monto ingresado sea exacto al monto esperado. Revisa el recuadro verde de "Total a pagar" antes de llenar el formulario.
