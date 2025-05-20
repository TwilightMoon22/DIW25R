# Progreso del Proyecto - Parte 2

## Configuración Inicial
- Se ha completado la primera parte del proyecto (ver progreso1.md)
- Se ha configurado el sistema básico de compilación SASS con Gulp
- Se ha verificado el funcionamiento del sistema de compilación automática

## Creación de la Estructura de Archivos
Hemos empezado a organizar nuestro código SASS de forma modular. Para ello:
- Creamos una carpeta header dentro de scss donde guardaremos los estilos del encabezado
- Creamos el archivo _header.scss (el guion bajo indica que es un archivo parcial)
- Modificamos app.scss para incluir el header usando @use
- Actualizamos el watch en gulpfile.js para que detecte cambios en cualquier archivo .scss, incluso en subcarpetas

Ahora podemos crear tantos archivos parciales como necesitemos y el sistema los compilará automáticamente.

##
## 