# Evaluación Técnica – Mobile Engineer (React Native / Expo) - Adrián de los Reyes

# ENTREGA:

## ⚠️ Problemas de performance detectados

Durante el desarrollo se identificaron dos problemas de performance relevantes introducidos de forma intencional en la base del proyecto.

1. Re-renders innecesarios por referencia inestable en Context

Problema
El MessageProvider recreaba el objeto del contexto en cada render. Aunque el id no cambiara, la referencia en memoria sí lo hacía, provocando que todos los componentes consumidores detectaran cambios.

Impacto

Re-renders innecesarios en componentes de mensajes

React.memo() no era efectivo

Impacto significativo en listas grandes de mensajes

Solución
Se corrigió utilizando useMemo para memorizar el valor del contexto y evitar re-renders mientras el id no cambie.

---

2. Memory leak en listeners de Socket.IO

Problema
Los listeners de Socket.IO no se eliminaban correctamente al desmontar componentes.

Causa

El callback registrado en el socket no mantenía la misma referencia al momento de intentar removerlo

El cleanup se ejecutaba sin una referencia válida del listener

Impacto

Memory leak progresivo

Múltiples ejecuciones del mismo handler por evento

Degradación del rendimiento con el uso prolongado de la aplicación

Solución
Se ajustó la gestión de listeners para garantizar referencias estables y permitir su correcta eliminación durante el cleanup del socket.

---

## 🧠 Decisiones técnicas

Durante la implementación se tomaron las siguientes decisiones con foco en performance, experiencia de usuario y mantenibilidad del código.

### Gestión del ciclo de vida del Socket

Se decidió conectar el socket únicamente cuando el usuario está autenticado y desconectarlo explícitamente al cerrar sesión.

**Motivación**

- Evitar conexiones abiertas innecesarias
- Prevenir listeners activos sin un usuario logueado
- Reducir consumo de recursos y efectos secundarios

---

### Manejo del teclado (Keyboard Handling)

Se incorporó `KeyboardAvoidingView` para evitar que el teclado oculte el input de mensajes mientras el usuario escribe.

**Motivación**

- Mejorar la experiencia de escritura en dispositivos móviles
- Evitar interacciones frustrantes en el chat
- Comportamiento consistente entre plataformas

---

### Mejora de UX en visualización de imágenes

Se implementó la visualización de imágenes en pantalla completa con soporte de zoom dentro del chat.

**Motivación**

- Mejor experiencia de usuario al enviar y recibir imágenes
- Comportamiento alineado con aplicaciones de mensajería reales

---

### Integración de NativeWind

Se integró NativeWind para el estilado de componentes.

**Motivación**

- Código más limpio y declarativo
- Reducción de estilos inline y `StyleSheet`
- Mayor consistencia visual
- Mejor mantenibilidad a largo plazo

---

### Uso de soluciones nativas y librerías oficiales

Siempre que fue posible, se priorizó el uso de APIs nativas de Expo / React Native y librerías oficiales o ampliamente adoptadas.

**Motivación**

- Menor complejidad innecesaria
- Mejor compatibilidad y estabilidad
- Código más predecible y fácil de escalar

---

## 🚀 Posibles mejoras con más tiempo disponible

Con mayor disponibilidad de tiempo, se podrían haber implementado las siguientes mejoras para ampliar funcionalidad, escalabilidad y calidad general de la aplicación:

- Extender el uso de **NativeWind a todos los componentes**, logrando un estilado completamente unificado y una mayor limpieza del código visual.
- Implementar las **funcionalidades actualmente deshabilitadas** (fototeca, archivos y audio) mencionadas en el README original del desafío.
- Incorporar **soporte para múltiples chats y conversaciones**, en caso de que la modificación de la API formara parte del alcance de la prueba.
- Persistir las imágenes enviadas en un **servicio de almacenamiento en la nube**, en lugar de manejar únicamente recursos locales.
- Mejorar el performance general mediante **estrategias de cache**, tanto en el consumo de la API (React Query) como en el manejo de mensajes y recursos multimedia.

Estas mejoras apuntan a una aplicación más completa, escalable y cercana a un entorno productivo real.
