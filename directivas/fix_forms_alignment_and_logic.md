# Directiva: Corrección de Formularios y Lógica de Afiliación

## Objetivo
Corregir los errores de diseño y funcionalidad detectados en el módulo de afiliación del frontend.

## Problemas Detectados
1. **Barra de Progreso Vertical:** Los pasos se muestran apilados verticalmente en lugar de horizontalmente.
2. **Alineación de Campos:** Los campos y etiquetas en el formulario de bienvenida están desalineados (jagged alignment).
3. **Tamaño de Inputs:** Los inputs son demasiado estrechos y no escalan.
4. **Selector de Código de País:** El selector es excesivamente alto.
5. **Botón "Continuar" Bloqueado:** El botón no avanza al siguiente paso a pesar de llenar los campos.
6. **Falta de Feedback:** No hay mensajes de error cuando falla la validación o el envío.

## Pasos de Ejecución (scripts/fix_forms.py)
1. **Corregir Layout de Barra de Progreso:**
   - Ubicar el componente de barra de progreso en `AffiliationWizard.tsx`.
   - Asegurar que el contenedor use `flex-row` y los items tengan un ancho balanceado.
2. **Ajustar Estilos de Formularios:**
   - Modificar `WelcomeStep.tsx` (u otros componentes relacionados).
   - Usar un grid system o flexbox con etiquetas de ancho fijo para asegurar alineación vertical.
   - Asegurar que los inputs tengan `w-full` o un ancho apropiado.
   - Ajustar el padding/height del selector de país.
3. **Revisar Lógica de Validación:**
   - Inspeccionar el manejador del botón "Continuar".
   - Asegurar que el estado se actualice correctamente.
   - Agregar logs para diagnosticar por qué no avanza.
4. **Agregar Feedback visual:**
   - Implementar mensajes de error simples o marcar campos inválidos en rojo.

## Restricciones y Casos Borde
- El modo oscuro (Dark Mode) debe mantenerse funcional.
- El diseño debe ser responsivo.
- No romper la navegación hacia atrás (botón "Volver").

## Lecciones Aprendidas (Protocolo de Auto-Corrección)
1. **Configuración de Tailwind 4:** En proyectos Vite con Tailwind 4, se debe usar el plugin `@tailwindcss/vite` en `vite.config.ts` y el import `@import "tailwindcss";` en `index.css`. Sin esto, las clases de utilidad no se procesan, causando que el layout se colapse (ej. la barra de progreso aparecía vertical).
2. **Sincronización de Estado en Formularios:** Algunos campos complejos (selectores de país, inputs con máscara) pueden requerir que el navegador dispare eventos manuales de `input` o `change` para que React actualice el estado antes de permitir el envío.
3. **Diseño Premium:** El uso de bordes suaves (`rounded-2xl`), sombras sutiles (`hover:shadow-2xl`) y micro-interacciones (`hover:-translate-y-1`) mejora significativamente la percepción del usuario.
4. **Validación Visual:** Siempre incluir indicadores de éxito o fallo (ej. "Las contraseñas coinciden") para guiar al usuario.
